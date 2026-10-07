import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, Clock, MapPin } from "lucide-react";
import ApplyForm from "@/components/careers/ApplyForm";
import JobsUnavailable from "@/components/careers/JobsUnavailable";
import { formatExperience, jobOptions, locationString } from "@/lib/careers/format";
import { getJobs } from "@/lib/careers/jobs";

/** Prerender every open role's form; roles added later render on first visit. */
export async function generateStaticParams() {
  const { jobs } = await getJobs();
  return jobs.map((job) => ({ id: job.id }));
}

export async function generateMetadata({ params }: PageProps<"/careers/[id]/apply">): Promise<Metadata> {
  const { id } = await params;
  const { jobs } = await getJobs();
  const job = jobs.find((j) => j.id === id);
  return { title: job ? `Apply: ${job.title}` : "Apply", robots: { index: false } };
}

export default async function ApplyPage({ params }: PageProps<"/careers/[id]/apply">) {
  const { id } = await params;
  const { jobs, error } = await getJobs();
  const job = jobs.find((j) => j.id === id);
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
  ].filter(([, value]) => value && value !== "Not specified");

  return (
    <div className="bg-black pb-24 text-white">
      <div className="mx-auto max-w-6xl px-5 pt-10 md:px-8">
        <Link href={`/careers/${job.id}`} className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-gold">
          <ArrowLeft className="size-4" /> Back to job details
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[340px_1fr]">
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div>
              <span className="block h-1 w-12 rounded-full bg-gold" />
              <p className="mt-4 text-[11px] font-bold tracking-[.2em] text-gold uppercase">Job application</p>
              <h1 className="mt-1.5 text-2xl leading-tight font-bold md:text-3xl">{job.title}</h1>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-white/50">
                {job.department && (
                  <span className="inline-flex items-center gap-1.5"><Briefcase className="size-3.5" />{job.department}</span>
                )}
                {locationString(job) && (
                  <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" />{locationString(job)}</span>
                )}
                {job.jobType && (
                  <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5" />{job.jobType}</span>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[.04] p-6">
              <h2 className="text-sm font-semibold text-white/70">Role overview</h2>
              <dl className="mt-4 space-y-3 text-sm">
                {overview.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <dt className="text-white/40">{label}</dt>
                    <dd className="text-right font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="text-xs leading-relaxed text-white/40">
              Fill in the form and our recruitment team will reach out to you soon.
            </p>
          </aside>

          <div className="rounded-[24px] border border-white/10 bg-white/[.03] p-6 backdrop-blur-[12px] sm:p-8">
            <ApplyForm job={{ id: job.id, title: job.title }} jobOptions={jobOptions(jobs)} />
          </div>
        </div>
      </div>
    </div>
  );
}
