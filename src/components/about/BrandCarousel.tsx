"use client";

import Image from "next/image";
import { brandCarousel } from "@/content/about";
import { loopItems, useLoopCarousel } from "@/lib/useLoopCarousel";
import { ChevronLeft, ChevronRight } from "@/components/ui/Chevrons";
import carousel from "@/components/ui/carousel.module.css";

export default function BrandCarousel() {
  const { next, prev, trackStyle, viewportProps } = useLoopCarousel({
    count: brandCarousel.length,
    clones: 1,
    autoplay: 5000,
    pauseOnHover: true,
    stopOnInteraction: true,
  });

  return (
    <div className="relative" aria-roledescription="carousel" aria-label="Our brands" {...viewportProps}>
      <div className="overflow-hidden rounded-[25px]">
        <div className={carousel.track} style={trackStyle}>
          {loopItems(brandCarousel, 1).map(({ item, key, clone }) => (
            <div key={key} className={carousel.slide} aria-hidden={clone || undefined}>
              <Image
                src={item.image}
                alt={item.alt}
                className="h-auto w-full rounded-[25px]"
                sizes="(max-width: 767px) 100vw, 548px"
              />
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label="Previous slide"
        onClick={prev}
        className="absolute top-1/2 left-[10px] z-10 -translate-y-1/2 text-white"
      >
        <ChevronLeft className="size-[23px]" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={next}
        className="absolute top-1/2 right-[10px] z-10 -translate-y-1/2 text-white"
      >
        <ChevronRight className="size-[23px]" />
      </button>
    </div>
  );
}
