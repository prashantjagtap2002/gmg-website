// Client-safe job types and display helpers (no server imports here).

export type Job = {
  id: string;
  title: string;
  description: string;
  department: string;
  city: string;
  state: string;
  country: string;
  jobType: string;
  experience: string;
  dateOpened: string;
};

export function toTitleCase(str: string): string {
  if (!str) return "";
  return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

export function locationString(job: Job): string {
  return [job.city, job.state, job.country].filter(Boolean).map(toTitleCase).join(", ");
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function formatExperience(exp: string): string {
  if (!exp || exp === "Not specified") return exp;
  const trimmed = exp.trim();
  if (/[a-zA-Z]/.test(trimmed)) return trimmed;
  if (trimmed === "1") return "1 year";
  return `${trimmed} years`;
}

/** Labels for the "Job you're applying for" select: same title open in several cities gets its location appended. */
export function jobOptions(jobs: Job[]) {
  const titleCount = new Map<string, number>();
  for (const j of jobs) titleCount.set(j.title, (titleCount.get(j.title) ?? 0) + 1);
  return jobs
    .map((j) => ({
      id: j.id,
      label: (titleCount.get(j.title) ?? 0) > 1 && locationString(j) ? `${j.title} — ${locationString(j)}` : j.title,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

// Keep in sync with VALID_SOURCES in the apply route handler.
export const APPLICATION_SOURCES = [
  "LinkedIn",
  "Job Board (Naukri, Indeed, etc.)",
  "Company Website",
  "Referral",
  "Social Media",
  "Newspaper / Print",
  "Other",
];

export const APPLICATION_COUNTRIES = [
  "India",
  "United Arab Emirates",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Singapore",
  "Saudi Arabia",
  "Qatar",
  "Germany",
  "France",
  "Other",
];
