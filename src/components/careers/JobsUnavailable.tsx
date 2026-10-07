import { AlertCircle } from "lucide-react";
import { siteConfig } from "@/content/site";

/** Shown when the job list can't be loaded from the careers database. */
export default function JobsUnavailable() {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center">
      <AlertCircle className="mx-auto size-8 text-gold" />
      <p className="mt-4 text-lg font-semibold text-white">We couldn&apos;t load open roles right now</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/55">
        Please refresh the page in a moment. You can also send your resume to{" "}
        <a href={`mailto:${siteConfig.email}`} className="text-gold underline">
          {siteConfig.email}
        </a>
        .
      </p>
    </div>
  );
}
