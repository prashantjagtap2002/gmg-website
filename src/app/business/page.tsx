import type { Metadata } from "next";
import BackgroundVideo from "@/components/ui/BackgroundVideo";
import SectionHeading from "@/components/ui/SectionHeading";
import LogoWall from "@/components/shared/LogoWall";
import OfficeGroup from "@/components/business/OfficeGroup";
import { businessHeroVideo, officeGroups } from "@/content/business";

export const metadata: Metadata = {
  title: "Business Page",
  description: "Our brands and the Gautam Modi Group showrooms, service centres and offices across Mumbai.",
};

export default function BusinessPage() {
  return (
    <>
      {/* flex keeps the hero's negative margin from collapsing */}
      <div className="flex flex-col">
        <section className="relative -mt-[6%] flex min-h-[70vh] items-center justify-center overflow-hidden">
          <BackgroundVideo video={businessHeroVideo} />
          <div className="absolute inset-0 bg-black/55" aria-hidden />
          <h1 className="relative text-center text-[45px] leading-none font-bold text-white md:text-[90px]">Business</h1>
        </section>
      </div>

      <section className="pt-[40px] pb-[50px]">
        <SectionHeading>Our Brands</SectionHeading>
        <div className="mt-[55px]">
          <LogoWall />
        </div>
      </section>

      <div className="mx-auto flex min-h-[50vh] w-full flex-col gap-5 px-[10px] pt-[10px] pb-[20px] md:w-[80%]">
        <h2 className="text-center text-[40px] leading-none font-semibold text-white md:text-[55px]">Our Offices</h2>
        {officeGroups.map((group) => (
          <OfficeGroup key={group.title} {...group} />
        ))}
      </div>
    </>
  );
}
