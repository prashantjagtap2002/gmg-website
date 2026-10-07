"use client";

import { heroVideos } from "@/content/home";
import { loopItems, useLoopCarousel } from "@/lib/useLoopCarousel";
import BackgroundVideo from "@/components/ui/BackgroundVideo";
import { ChevronLeft, ChevronRight } from "@/components/ui/Chevrons";
import styles from "@/components/ui/carousel.module.css";

const CLONES = 1;

export default function HeroSlider() {
  const { active, next, prev, goTo, trackStyle, viewportProps } = useLoopCarousel({
    count: heroVideos.length,
    clones: CLONES,
    autoplay: 5000,
  });

  // Only the showing slide and the one after it fetch their clip; the rest (and the
  // loop clones, which are only on screen mid-transition) show their poster frame.
  const upNext = (active + 1) % heroVideos.length;

  return (
    // flex keeps the slider's negative margin from collapsing into the section
    <section className="flex min-h-screen flex-col" aria-roledescription="carousel" aria-label="Featured">
      <div className="relative -mt-[6%] h-screen overflow-hidden" {...viewportProps}>
        <div className={`${styles.track} h-full [--gap:10px]`} style={trackStyle}>
          {loopItems(heroVideos, CLONES).map(({ item, index, key, clone }) => (
            <div
              key={key}
              className={`${styles.slide} relative h-full overflow-hidden`}
              aria-hidden={clone || index !== active}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${heroVideos.length}`}
            >
              <BackgroundVideo
                video={item}
                playing={index === active}
                load={!clone && (index === active || index === upNext)}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous"
          onClick={prev}
          className="absolute top-1/2 left-0 z-10 flex size-10 -translate-y-1/2 items-center justify-center text-white"
        >
          <ChevronLeft className="size-[18px] md:size-[25px]" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={next}
          className="absolute top-1/2 right-0 z-10 flex size-10 -translate-y-1/2 items-center justify-center text-white"
        >
          <ChevronRight className="size-[18px] md:size-[25px]" />
        </button>

        <div className="absolute bottom-4 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#1c1c1e] px-4 py-3 md:bottom-[30px] md:gap-3 md:px-7 md:py-5">
          {heroVideos.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className={`h-[7px] rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(.25,1,.5,1)] md:h-[9px] ${
                i === active ? "w-[28px] bg-white md:w-[45px]" : "w-[7px] bg-[#555] md:w-[9px]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
