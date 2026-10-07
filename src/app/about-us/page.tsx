import type { Metadata } from "next";
import Image from "next/image";
import StatsPanel from "@/components/about/StatsPanel";
import BrandCarousel from "@/components/about/BrandCarousel";
import Journey from "@/components/about/Journey";
import HistoryTimeline from "@/components/about/HistoryTimeline";
import MissionVision from "@/components/about/MissionVision";
import Leaders from "@/components/about/Leaders";
import SectionHeading from "@/components/ui/SectionHeading";
import { aboutHeroImage } from "@/content/about";

export const metadata: Metadata = {
  title: "About Us",
  description: "Decades of Legacy",
};

export default function AboutPage() {
  return (
    <>
      <div className="flex justify-center pt-[40px]">
        <Image
          src={aboutHeroImage}
          alt="The Gautam Modi Group team"
          priority
          sizes="90vw"
          className="h-auto w-[90%] rounded-[30px]"
        />
      </div>

      {/* Elementor's "80% boxed" width is measured inside the container's 10px padding. */}
      <div className="p-[10px]">
        {/* The stats panel overlaps the bottom of the team photo. */}
        <div className="mx-auto flex w-full flex-col md:w-[80%]">
          <div className="-mt-[17%]">
            <StatsPanel />
          </div>
        </div>
      </div>

      <div className="px-[10px]">
        <div className="mx-auto flex w-full flex-col md:w-[80%] md:flex-row">
          <div className="flex flex-col justify-center p-[10px] md:w-1/2">
            <BrandCarousel />
          </div>
          <div className="flex flex-col justify-center p-[10px] md:w-1/2">
            <Journey />
          </div>
        </div>
      </div>

      <section className="pt-[60px]">
        <SectionHeading className="max-md:text-[38px]">Our History</SectionHeading>
        <div className="mt-[50px]">
          <HistoryTimeline />
        </div>
      </section>

      <section className="mx-auto w-full px-[10px] pt-[70px] pb-[10px] md:w-[80%]">
        <SectionHeading className="max-md:text-[38px]">Our Mission and Vision</SectionHeading>
        <div className="mt-[50px]">
          <MissionVision />
        </div>
      </section>

      <section className="mx-auto w-full px-[10px] pt-[45px] pb-[140px] md:w-[80%] md:pt-[80px]">
        <div className="flex justify-center">
          <span className="rounded-[25px] border border-[#f89915] px-6 py-3 text-[12px] leading-none font-medium text-[#f89915] md:text-[15px]">
            Our Teams
          </span>
        </div>
        <h2 className="mt-[30px] px-[1%] text-center text-[38px] leading-[1.1] font-bold text-white md:px-0 md:text-[40px] md:leading-[1.5]">
          We work for you since 1932
        </h2>
        <div className="mt-5">
          <Leaders />
        </div>
      </section>
    </>
  );
}
