"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Award, BriefcaseBusiness, Building2, Check, ChevronDown, MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import { formatDate, formatExperience, locationString, toTitleCase, type Job } from "@/lib/careers/format";
import JobsUnavailable from "./JobsUnavailable";

type Option = { value: string; count: number };
type FilterGroup = { title: string; options: Option[]; selected: string[]; onChange: (next: string[]) => void };

/** Distinct non-empty values with how many roles match each. */
function optionsFor(jobs: Job[], getValue: (job: Job) => string): Option[] {
  const counts = new Map<string, number>();
  for (const job of jobs) {
    const value = getValue(job);
    if (value) counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts].map(([value, count]) => ({ value, count })).sort((a, b) => a.value.localeCompare(b.value));
}

function JobCard({ job }: { job: Job }) {
  const hasExperience = job.experience && job.experience !== "Not specified";
  return (
    <Link
      href={`/careers/${job.id}`}
      className="group block rounded-2xl border border-white/10 bg-white/[.045] p-5 transition hover:-translate-y-0.5 hover:border-gold/60 hover:bg-white/[.075] focus-visible:border-gold focus-visible:outline-none"
    >
      <span className="mb-4 block h-1 w-9 rounded-full bg-gold transition-all group-hover:w-14" />
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-gold">{job.title}</h3>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60">
            {locationString(job) && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-gold" />
                {locationString(job)}
              </span>
            )}
            {job.department && (
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="size-4 text-gold" />
                {job.department}
              </span>
            )}
            {job.jobType && (
              <span className="inline-flex items-center gap-1.5">
                <BriefcaseBusiness className="size-4 text-gold" />
                {job.jobType}
              </span>
            )}
            {hasExperience && (
              <span className="inline-flex items-center gap-1.5">
                <Award className="size-4 text-gold" />
                {formatExperience(job.experience)}
              </span>
            )}
          </div>
        </div>
        <span aria-hidden className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gold">
          I&apos;m interested <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
      {job.dateOpened && <div className="mt-4 text-xs text-white/40">Posted {formatDate(job.dateOpened)}</div>}
    </Link>
  );
}

function Filters({
  query,
  onQueryChange,
  groups,
  hasFilters,
  onClear,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  groups: FilterGroup[];
  hasFilters: boolean;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const activeCount = groups.reduce((n, g) => n + g.selected.length, 0);

  return (
    <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold tracking-[.2em] text-white/55 uppercase">Filters</h3>
        {hasFilters && (
          <button type="button" onClick={onClear} className="inline-flex items-center gap-1 text-xs font-medium text-white/55 transition hover:text-gold">
            <X className="size-3.5" /> Clear
          </button>
        )}
      </div>

      <label className="relative block">
        <span className="sr-only">Search open roles</span>
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/40" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search roles or teams"
          className="h-12 w-full rounded-xl border border-white/10 bg-white/[.06] pr-4 pl-11 text-sm text-white outline-none placeholder:text-white/35 focus:border-gold/60"
        />
      </label>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="job-filter-groups"
        className="flex w-full items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-white lg:hidden"
      >
        <span className="inline-flex items-center gap-2">
          <SlidersHorizontal className="size-4" />
          {activeCount > 0 ? `Filters (${activeCount})` : "Filters"}
        </span>
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <div id="job-filter-groups" className={`space-y-6 lg:block ${open ? "block" : "hidden"}`}>
        {groups.map((group) => {
          if (group.options.length === 0) return null;
          const toggle = (value: string) =>
            group.onChange(group.selected.includes(value) ? group.selected.filter((v) => v !== value) : [...group.selected, value]);
          return (
            <div key={group.title} className="border-t border-white/10 pt-5">
              <h4 className="mb-2 text-sm font-semibold text-white">{group.title}</h4>
              <div className="-mx-1 max-h-56 space-y-0.5 overflow-y-auto pr-1">
                {group.options.map((o) => {
                  const checked = group.selected.includes(o.value);
                  return (
                    <label key={o.value} className="flex cursor-pointer items-center gap-2.5 rounded-md px-1 py-1.5 text-sm select-none">
                      <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => toggle(o.value)} />
                      <span
                        className={`flex size-4 shrink-0 items-center justify-center rounded border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-gold ${
                          checked ? "border-gold bg-gold text-black" : "border-white/30 hover:border-white/60"
                        }`}
                      >
                        {checked && <Check className="size-3" />}
                      </span>
                      <span className={`flex-1 truncate ${checked ? "font-medium text-white" : "text-white/70"}`}>{o.value}</span>
                      <span className="text-xs text-white/40">{o.count}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default function CareersPortal({ jobs, loadError }: { jobs: Job[]; loadError: boolean }) {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState<string[]>([]);
  const [loc, setLoc] = useState<string[]>([]);
  const [type, setType] = useState<string[]>([]);
  const [sort, setSort] = useState("newest");

  const deptOptions = useMemo(() => optionsFor(jobs, (j) => j.department), [jobs]);
  const locOptions = useMemo(() => optionsFor(jobs, (j) => toTitleCase(j.city)), [jobs]);
  const typeOptions = useMemo(() => optionsFor(jobs, (j) => j.jobType), [jobs]);
  const groups: FilterGroup[] = [
    { title: "Department", options: deptOptions, selected: dept, onChange: setDept },
    { title: "Location", options: locOptions, selected: loc, onChange: setLoc },
    { title: "Job type", options: typeOptions, selected: type, onChange: setType },
  ];

  const hasFilters = query.trim() !== "" || dept.length > 0 || loc.length > 0 || type.length > 0;
  function clearFilters() {
    setQuery("");
    setDept([]);
    setLoc([]);
    setType([]);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = jobs.filter(
      (j) =>
        (!q || j.title.toLowerCase().includes(q) || j.department.toLowerCase().includes(q)) &&
        (dept.length === 0 || dept.includes(j.department)) &&
        (loc.length === 0 || loc.includes(toTitleCase(j.city))) &&
        (type.length === 0 || type.includes(j.jobType)),
    );
    return [...list].sort((a, b) => {
      const da = new Date(a.dateOpened).getTime() || 0;
      const db = new Date(b.dateOpened).getTime() || 0;
      if (sort === "newest") return db - da;
      if (sort === "oldest") return da - db;
      return a.title.localeCompare(b.title);
    });
  }, [jobs, query, dept, loc, type, sort]);

  return (
    <section id="open-roles" className="mx-auto max-w-6xl scroll-mt-24 px-5 pt-20 pb-24 md:px-8">
      <div className="mb-12 text-center">
        <span className="mx-auto mb-5 block h-1 w-12 rounded-full bg-gold" />
        <h2 className="text-3xl font-bold text-white md:text-5xl">Discover Career Opportunities at GMG</h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/55">Find your next role and apply directly.</p>
      </div>

      {loadError ? (
        <JobsUnavailable />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <Filters query={query} onQueryChange={setQuery} groups={groups} hasFilters={hasFilters} onClear={clearFilters} />

          <div>
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm text-white/45">
                {filtered.length} open {filtered.length === 1 ? "role" : "roles"}
              </p>
              <label className="relative">
                <span className="sr-only">Sort roles</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-10 appearance-none rounded-xl border border-white/10 bg-white/[.06] pr-9 pl-4 text-sm text-white outline-none focus:border-gold/60"
                >
                  <option value="newest" className="bg-[#161616]">Newest first</option>
                  <option value="oldest" className="bg-[#161616]">Oldest first</option>
                  <option value="title" className="bg-[#161616]">Title A to Z</option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-white/45" />
              </label>
            </div>

            {jobs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center">
                <p className="text-lg font-semibold text-white">No open roles right now</p>
                <p className="mt-1 text-sm text-white/55">New positions open regularly. Please check back soon.</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center">
                <p className="text-lg font-semibold text-white">No roles match your search</p>
                <p className="mt-1 text-sm text-white/55">Try a different keyword or clear some filters.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-full border border-white/25 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid gap-3">
                {filtered.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
