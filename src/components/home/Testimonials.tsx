"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { testimonials } from "@/content/home";
import { loopItems, useLoopCarousel } from "@/lib/useLoopCarousel";
import { ChevronLeft, ChevronRight } from "@/components/ui/Chevrons";
import carousel from "@/components/ui/carousel.module.css";

const CLONES = 2;
const STAR =
  "M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z";

const arrowClass =
  "absolute top-[calc(50%+10px)] z-10 flex -translate-y-1/2 items-center justify-center rounded-[20px] bg-white p-[1%] text-black md:rounded-[50px] md:p-1";

export default function Testimonials() {
  const { next, prev, trackStyle, viewportProps } = useLoopCarousel({
    count: testimonials.length,
    clones: CLONES,
    autoplay: 5000,
    pauseOnHover: true,
    stopOnInteraction: true,
  });

  return (
    <div className="mx-auto w-[90%] p-[10px] md:w-[80%]">
      <div className="relative" aria-roledescription="carousel" aria-label="Testimonials" {...viewportProps}>
        <div className="overflow-hidden">
          <div className={`${carousel.track} [--gap:10px] [--pv:1] md:[--pv:2]`} style={trackStyle}>
            {loopItems(testimonials, CLONES).map(({ item, key, clone }) => (
              <div key={key} className={carousel.slide} aria-hidden={clone || undefined}>
                <figure className="flex h-full flex-col justify-between gap-[10px] rounded-[30px] border border-white/20 p-[10px]">
                  <div className="flex items-center justify-between gap-5 p-[10px] md:justify-start">
                    <div
                      className="w-[var(--lw-m)] shrink-0 md:w-[var(--lw)]"
                      style={{ "--lw": item.logoWidth[0], "--lw-m": item.logoWidth[1] } as CSSProperties}
                    >
                      <Image src={item.logo} alt="" className="h-auto w-full" sizes="200px" />
                    </div>
                    <div className="flex justify-end md:flex-1" role="img" aria-label="Rated 5 out of 5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <svg key={i} viewBox="0 0 576 512" className="size-4 fill-[#f0ad4e]" aria-hidden>
                          <path d={STAR} />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <blockquote className="p-[10px]">
                    <p className="text-[14px] leading-6 text-white md:px-[10px] md:pb-[6px] md:text-[16px]">{item.text}</p>
                  </blockquote>
                  <figcaption className="p-[10px]">
                    <h3 className="text-gold text-[16px] leading-none font-semibold md:px-[10px] md:pb-[6px] md:text-[22px]">{item.name}</h3>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>

        <button type="button" aria-label="Previous" onClick={prev} className={`${arrowClass} -left-[28px] md:-left-[45px]`}>
          <ChevronLeft className="size-[17px] md:size-[23px]" />
        </button>
        <button type="button" aria-label="Next" onClick={next} className={`${arrowClass} -right-[28px] md:-right-[45px]`}>
          <ChevronRight className="size-[17px] md:size-[23px]" />
        </button>
      </div>
    </div>
  );
}
