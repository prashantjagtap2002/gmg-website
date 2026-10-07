import type { Metadata } from "next";
import GalleryMosaic from "@/components/gallery/GalleryMosaic";
import AwardsShowcase from "@/components/gallery/AwardsShowcase";
import SectionHeading from "@/components/ui/SectionHeading";
import { awardShowcases } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Gallery Page",
  description: "Our People, Our Places, Our Passion — moments from across the Gautam Modi Group.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="flex min-h-[40vh] flex-col items-center justify-center gap-5 px-[10px] text-center">
        <h1 className="text-[45px] leading-none font-bold text-white md:text-[90px]">Gallery</h1>
        <p className="text-[20px] leading-none text-white">Our People, Our Places, Our Passion</p>
      </section>

      <GalleryMosaic />

      <section className="px-[10px] pt-[80px]">
        <SectionHeading className="max-md:text-[38px]">Awards &amp; Recognition</SectionHeading>
        <div className="mt-[50px]">
          {awardShowcases.map((showcase) => (
            <AwardsShowcase key={showcase.brand} showcase={showcase} />
          ))}
        </div>
      </section>
    </>
  );
}
