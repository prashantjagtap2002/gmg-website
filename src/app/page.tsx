import HeroSlider from "@/components/home/HeroSlider";
import CardSlider from "@/components/home/CardSlider";
import Testimonials from "@/components/home/Testimonials";
import FaqSection from "@/components/home/FaqSection";
import LogoWall from "@/components/shared/LogoWall";
import SectionHeading from "@/components/ui/SectionHeading";
import { coreValues, strengths } from "@/content/home";

export default function Home() {
  return (
    <>
      <HeroSlider />

      <section className="mx-auto w-full px-[10px] pt-[40px] pb-[40px] md:w-[80%] md:pt-[70px]">
        <SectionHeading>Our Core Values</SectionHeading>
        <div className="mt-[55px]">
          <CardSlider cards={coreValues} kind="values" autoplay={4000} />
        </div>
      </section>

      <section className="mx-auto w-full px-[10px] pt-[50px] pb-[80px] md:w-[80%]">
        <SectionHeading>Our Strength</SectionHeading>
        <div className="mt-[55px]">
          <CardSlider cards={strengths} kind="strength" autoplay={5000} />
        </div>
      </section>

      <section className="pt-[40px]">
        <SectionHeading>Our Brands</SectionHeading>
        <div className="mt-[55px]">
          <LogoWall />
        </div>
      </section>

      <section className="pt-[50px] pb-[30px]">
        <SectionHeading>Testimonials</SectionHeading>
        <div className="mt-[45px]">
          <Testimonials />
        </div>
      </section>

      <div className="pt-[20px] pb-[70px]">
        <FaqSection />
      </div>
    </>
  );
}
