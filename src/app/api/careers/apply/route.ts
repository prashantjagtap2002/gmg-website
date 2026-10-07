import { NextResponse } from "next/server";
import { supabaseConfig, supabaseHeaders } from "@/lib/careers/supabase";
import { APPLICATION_SOURCES } from "@/lib/careers/format";

// Ported from careers-app/netlify/functions/apply.ts — writes the same rows to
// the same Supabase tables, so applications show up in the GMG Careers CRM.

const MAX_APPS_PER_HOUR = 10;
// Matches the VARCHAR(255) columns in careers-app/scripts/setup.sql.
const MAX_FIELD_LENGTH = 255;
const MAX_MESSAGE_LENGTH = 5000;
const VALID_SOURCES = new Set(APPLICATION_SOURCES);
// Client-generated (crypto.randomUUID) so the resume can be uploaded under the
// same key; restricted to characters the resume Worker accepts.
const APP_ID_PATTERN = /^app-[A-Za-z0-9-]{8,80}$/;

function truncate(val: unknown, max = MAX_FIELD_LENGTH): string {
  return String(val ?? "").trim().slice(0, max);
}

function error(status: number, message: string) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return error(400, "Invalid request body.");
  }

  const firstName = truncate(data.firstName);
  const lastName = truncate(data.lastName);
  if (!data.email || !firstName || !lastName || !data.jobId) {
    return error(400, "Please fill in your first name, last name and email.");
  }
  if (typeof data.id !== "string" || !APP_ID_PATTERN.test(data.id)) {
    return error(400, "Invalid application id.");
  }
  const id = data.id;

  const email = String(data.email).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return error(400, "Please enter a valid email address.");
  }

  const config = supabaseConfig();
  if (!config) {
    console.error("[careers-apply] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set");
    return error(503, "Applications are temporarily unavailable. Please try again later.");
  }
  const rest = `${config.url}/rest/v1`;

  try {
    // Take the job title from the database, not the request, so an application
    // can't be filed against a role that doesn't exist (or under a fake title).
    const jobRes = await fetch(`${rest}/custom_jobs?select=id,title&id=eq.${encodeURIComponent(String(data.jobId))}`, {
      headers: supabaseHeaders(config.key),
      cache: "no-store",
    });
    if (!jobRes.ok) throw new Error(`custom_jobs lookup responded ${jobRes.status}`);
    const [job] = (await jobRes.json()) as { id: string; title: string }[];
    if (!job) return error(404, "This role is no longer accepting applications.");

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const countRes = await fetch(
      `${rest}/applications?select=id&email=eq.${encodeURIComponent(email)}&submitted_at=gte.${encodeURIComponent(oneHourAgo)}`,
      { method: "HEAD", headers: supabaseHeaders(config.key, { Prefer: "count=exact" }), cache: "no-store" },
    );
    if (!countRes.ok) throw new Error(`applications count responded ${countRes.status}`);
    // Content-Range looks like "0-4/5" or "*/0".
    const count = Number(countRes.headers.get("content-range")?.split("/")[1] ?? 0);
    if (count >= MAX_APPS_PER_HOUR) return error(429, "Too many applications. Please try again later.");

    const source = VALID_SOURCES.has(String(data.source)) ? String(data.source) : "Other";
    const resumeLink =
      typeof data.resumeLink === "string" &&
      data.resumeLink.startsWith("https://") &&
      data.resumeLink.endsWith(`/resumes/${id}`)
        ? truncate(data.resumeLink)
        : "";
    // Pipeline state is server-owned: a public form must not be able to file
    // itself straight into "Hired" or backdate its submission.
    const submittedAt = new Date().toISOString();

    const insertRes = await fetch(`${rest}/applications`, {
      method: "POST",
      headers: supabaseHeaders(config.key, { Prefer: "return=minimal" }),
      body: JSON.stringify({
        id,
        job_id: job.id,
        job_title: job.title,
        first_name: firstName,
        last_name: lastName,
        email,
        company: truncate(data.company),
        current_title: truncate(data.currentTitle),
        country: truncate(data.country),
        website: truncate(data.website),
        source,
        message: truncate(data.message, MAX_MESSAGE_LENGTH),
        resume_name: truncate(data.resumeName),
        resume_link: resumeLink,
        submitted_at: submittedAt,
        stage: "new",
        stage_history: [{ stage: "new", at: submittedAt }],
      }),
    });
    if (!insertRes.ok) throw new Error(`applications insert responded ${insertRes.status}: ${await insertRes.text()}`);

    // Best-effort, like the CRM's logActivity: never fail the application over it.
    await fetch(`${rest}/activity_log`, {
      method: "POST",
      headers: supabaseHeaders(config.key, { Prefer: "return=minimal" }),
      body: JSON.stringify({
        id: `log-${crypto.randomUUID()}`,
        actor_email: email,
        actor_name: `${firstName} ${lastName}`,
        action: "application.create",
        entity_type: "application",
        entity_id: id,
        summary: `New application for "${job.title}"`,
      }),
    })
      .then(async (res) => {
        if (!res.ok) console.error("[careers-apply] Failed to log activity:", res.status, await res.text());
      })
      .catch((err) => console.error("[careers-apply] Failed to log activity:", err));

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    // Details go to the server log only — this endpoint is public.
    console.error("[careers-apply] Error inserting application:", err);
    return error(500, "We couldn't submit your application. Please try again.");
  }
}
