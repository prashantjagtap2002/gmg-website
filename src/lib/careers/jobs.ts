import { supabaseConfig, supabaseHeaders } from "./supabase";
import type { Job } from "./format";

/** Cache tag for the job list; jobs refresh at most this many seconds after an admin edits them in the CRM. */
export const JOBS_TAG = "careers-jobs";
const JOBS_REVALIDATE_SECONDS = 60;

type JobRow = {
  id: string;
  title: string;
  description: string | null;
  department: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  job_type: string | null;
  experience: string | null;
  date_opened: string | null;
  created_at: string | null;
};

export type JobsResult = { jobs: Job[]; error: false } | { jobs: []; error: true };

/** All open roles (the CRM's custom_jobs table), newest first. */
export async function getJobs(): Promise<JobsResult> {
  const config = supabaseConfig();
  if (!config) {
    console.error("[careers] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set");
    return { jobs: [], error: true };
  }

  try {
    const res = await fetch(`${config.url}/rest/v1/custom_jobs?select=*&order=created_at.desc`, {
      headers: supabaseHeaders(config.key),
      next: { revalidate: JOBS_REVALIDATE_SECONDS, tags: [JOBS_TAG] },
    });
    if (!res.ok) throw new Error(`custom_jobs responded ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const rows = (await res.json()) as JobRow[];
    return {
      error: false,
      jobs: rows.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description ?? "",
        department: r.department ?? "",
        city: r.city ?? "",
        state: r.state ?? "",
        country: r.country ?? "",
        jobType: r.job_type ?? "",
        experience: r.experience ?? "",
        dateOpened: r.date_opened ?? "",
      })),
    };
  } catch (err) {
    console.error("[careers] Failed to load jobs:", err);
    return { jobs: [], error: true };
  }
}
