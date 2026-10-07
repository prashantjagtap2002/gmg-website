import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Award, BriefcaseBusiness, Building2, MapPin } from "lucide-react";
import JobDescription from "@/components/careers/JobDescription";
import JobsUnavailable from "@/components/careers/JobsUnavailable";
import ShareRoleButton from "@/components/careers/ShareRoleButton";
import { formatDate, formatExperience, locationString, toTitleCase, type Job } from "@/lib/careers/format";
import { sanitizeJobHtml, summary } from "@/lib/careers/job-html";
import { getJobs } from "@/lib/careers/jobs";

const EMPLOYMENT_TYPES: Record<string, string> = {
  fulltime: "FULL_TIME",
  parttime: "PART_TIME",
  contract: "CONTRACTOR",
  internship: "INTERN",
  temporary: "TEMPORARY",
};

/** schema.org JobPosting — makes the role eligible for Google's job search experience. */
function jobPostingJsonLd(job: Job) {
  const employmentType = EMPLOYMENT_TYPES[job.jobType.toLowerCase().replace(/[^a-z]/g, "")];
  const datePosted = job.dateOpened && !Number.isNaN(new Date(job.dateOpened).getTime()) ? job.dateOpened.slice(0, 10) : undefined;
  return {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: sanitizeJobHtml(job.description),
    identifier: { "@type": "PropertyValue", name: "Gautam Modi Group", value: job.id },
    ...(datePosted && { datePosted }),
    ...(employmentType && { employmentType }),
    hiringOrganization: { "@type": "Organization", name: "Gautam Modi Group", sameAs: "https://gautammodigroup.com" },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        ...(job.city && { addressLocality: toTitleCase(job.city) }),
        ...(job.state && { addressRegion: toTitleCase(job.state) }),
        addressCountry: job.country || "India",
      },
    },
    directApply: true,
  };
}

/** Prerender every open role so links from the list prefetch it; roles added later render on first visit. */
export async function generateStaticParams() {
  const { jobs } = await getJobs();
  return jobs.map((job) => ({ id: job.id }));
}

async function findJob(id: string) {
  const { jobs, error } = await getJobs();
  return { job: jobs.find((j) => j.id === id), error };
}

export async function generateMetadata({ params }: PageProps<"/careers/[id]">): Promise<Metadata> {
  const { id } = await params;
  const { job } = await findJob(id);
  if (!job) return { title: "Role not found", robots: { index: false } };
  return {
    title: `${job.title}${job.city ? ` in ${toTitleCase(job.city)}` : ""}`,
    description: summary(job.description) || `${job.title} at Gautam Modi Group. Apply online.`,
  };
}

export default async function CareerDetailPage({ params }: PageProps<"/careers/[id]">) {
  const { id } = await params;
  const { job, error } = await findJob(id);
  if (!job) {
    if (error) {
      return (
        <div className="mx-auto max-w-3xl px-5 py-24">
          <JobsUnavailable />
        </div>
      );
    }
    notFound();
  }

  const overview = [
    ["Department", job.department],
    ["Location", locationString(job)],
    ["Type", job.jobType],
    ["Experience", formatExperience(job.experience)],
    ["Posted", formatDate(job.dateOpened)],
  ].filter(([, value]) => value && value !== "Not specified");
  const hasExperience = job.experience && job.experience !== "Not specified";

  return (
    <div className="bg-black pb-24 text-white">
      <script
        type="application/ld+json"
        // Escape "<" so description HTML can't close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd(job)).replace(/</g, "\\u003c") }}
      />
      <section className="border-b border-white/10 bg-gradient-to-br from-[#171717] via-black to-black">
        <div className="mx-auto max-w-6xl px-5 pt-12 pb-16 md:px-8 md:pt-20">
          <Link href="/careers#open-roles" className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-gold">
            <ArrowLeft className="size-4" /> Back to all roles
          </Link>
          <span className="mt-12 block h-1 w-12 rounded-full bg-gold" />
          <p className="mt-5 text-xs font-bold tracking-[.2em] text-gold uppercase">{job.department || "Career opportunity"}</p>
          <h1 className="mt-3 max-w-4xl text-4xl leading-tight font-black md:text-6xl">{job.title}</h1>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/60">
            {locationString(job) && (
              <span className="inline-flex items-center gap-2"><MapPin className="size-4 text-gold" />{locationString(job)}</span>
            )}
            {job.department && (
              <span className="inline-flex items-center gap-2"><Building2 className="size-4 text-gold" />{job.department}</span>
            )}
            {job.jobType && (
              <span className="inline-flex items-center gap-2"><BriefcaseBusiness className="size-4 text-gold" />{job.jobType}</span>
            )}
            {hasExperience && (
              <span className="inline-flex items-center gap-2"><Award className="size-4 text-gold" />{formatExperience(job.experience)}</span>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-12 md:px-8 lg:grid-cols-[1fr_320px]">
        <article className="rounded-2xl border border-white/10 bg-white/[.04] p-6 md:p-10">
          <h2 className="mb-6 text-2xl font-bold">Job description</h2>
          <JobDescription text={job.description} />
        </article>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-white/10 bg-white/[.04] p-6">
            <h2 className="text-sm font-semibold text-white/55">Overview</h2>
            <dl className="mt-4 space-y-3 text-sm">
              {overview.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="text-white/45">{label}</dt>
                  <dd className="text-right font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-2xl border border-gold/30 bg-gold/[.08] p-6">
            <h2 className="text-xl font-bold">Interested in this role?</h2>
            <p className="mt-3 text-sm leading-6 text-white/65">Think this role is a fit? Apply directly here.</p>
            <Link
              href={`/careers/${job.id}/apply`}
              className="mt-6 flex items-center justify-center rounded-xl bg-gold px-5 py-3 text-sm font-bold text-black transition hover:bg-[#ffc233]"
            >
              I&apos;m interested
            </Link>
            <div className="mt-3">
              <ShareRoleButton title={job.title} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
