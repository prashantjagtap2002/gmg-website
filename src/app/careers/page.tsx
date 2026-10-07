import type { Metadata } from "next";
import CareersHero from "@/components/careers/CareersHero";
import CareersPortal from "@/components/careers/CareersPortal";
import { getJobs } from "@/lib/careers/jobs";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build your career with Gautam Modi Group, one of India's leading automotive groups. Explore open roles across Audi, Mahindra, Hyundai, Kia and MG.",
};

export default async function CareersPage() {
  const { jobs, error } = await getJobs();
  return (
    <div className="bg-black">
      <CareersHero />
      <CareersPortal jobs={jobs} loadError={error} />
    </div>
  );
}
