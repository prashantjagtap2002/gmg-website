"use client";

import { missionVision } from "@/content/about";
import { loopItems, useLoopCarousel } from "@/lib/useLoopCarousel";
import GlowCard from "@/components/ui/GlowCard";
import carousel from "@/components/ui/carousel.module.css";

export default function MissionVision() {
  const { active, goTo, trackStyle, viewportProps } = useLoopCarousel({
    count: missionVision.length,
    clones: 1,
    autoplay: 5000,
  });

  return (
    <div className="flex w-full flex-col py-4">
      <div className="relative w-full overflow-hidden md:overflow-visible" {...viewportProps}>
        <div className={`${carousel.track} ${carousel.desktopGrid} items-stretch [--cols:2] [--grid-gap:1rem]`} style={trackStyle}>
          {loopItems(missionVision, 1).map(({ item, key, clone }) => (
            <div key={key} className={`${carousel.slide} flex px-2 md:px-0 ${clone ? "md:hidden" : ""}`} aria-hidden={clone || undefined}>
              <GlowCard variant={item.variant} kind="mission" className="min-h-[180px] px-8 py-6" barClassName="mb-5">
                <div className="relative z-10 flex w-full flex-1 flex-col gap-2">
                  <h3 className="text-[24px] leading-[1.2] font-bold tracking-tight text-white">{item.title}</h3>
                  <p className="text-[15px] leading-relaxed font-light text-white/80 md:text-[16px]">{item.text}</p>
                </div>
              </GlowCard>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-4 mb-2 inline-flex items-center gap-2 rounded-full bg-[#1c1c1e] px-[18px] py-[10px] md:hidden">
        {missionVision.map((item, i) => (
          <button
            key={item.title}
            type="button"
            aria-label={`Show ${item.title}`}
            onClick={() => goTo(i)}
            className={`h-[7px] rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(.25,1,.5,1)] ${
              i === active ? "w-[28px] bg-white" : "w-[7px] bg-[#555]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
