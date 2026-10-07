"use client";

import { useState } from "react";
import type { CardVariant } from "@/content/home";
import { loopItems, useLoopCarousel } from "@/lib/useLoopCarousel";
import GlowCard from "@/components/ui/GlowCard";
import carousel from "@/components/ui/carousel.module.css";

type Card = { title: string; text: string; variant: CardVariant };

type Props = {
  cards: Card[];
  /** "values" cards are short; "strength" cards clamp to 4 lines with Read more. */
  kind: "values" | "strength";
  autoplay: number;
};

function ReadMore({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <p className={`text-[14px] leading-relaxed text-[#D1D1D1] ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="mt-1 w-fit text-left text-xs font-bold tracking-widest text-white uppercase transition-all hover:opacity-70"
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </>
  );
}

/** Four cards in a row on desktop; a looping, auto-advancing slider with dots on phones. */
export default function CardSlider({ cards, kind, autoplay }: Props) {
  const { active, goTo, trackStyle, viewportProps } = useLoopCarousel({
    count: cards.length,
    clones: 1,
    autoplay,
    pauseOnHover: true,
  });
  const values = kind === "values";

  return (
    <div className={values ? "" : "py-4"}>
      <div className={`overflow-hidden pb-8 md:overflow-visible md:pb-0 ${values ? "" : "touch-pan-y"}`} {...viewportProps}>
        <div
          className={`${carousel.track} ${carousel.desktopGrid} [--cols:4] [--grid-gap:1.5rem] ${values ? "py-4 md:py-0" : ""}`}
          style={trackStyle}
        >
          {loopItems(cards, 1).map(({ item, key, clone }) => (
            <div key={key} className={`${carousel.slide} px-5 md:px-0 ${clone ? "md:hidden" : ""}`} aria-hidden={clone || undefined}>
              <GlowCard
                variant={item.variant}
                kind={kind}
                className={values ? "px-8 py-10 md:px-10 md:py-12" : "px-8 py-6 md:px-10 md:py-8"}
                barClassName={values ? "mb-8" : "mb-5"}
              >
                <div className={`relative z-20 flex flex-1 flex-col ${values ? "gap-4" : "gap-3"}`}>
                  <h3 className={`text-[22px] leading-[1.2] font-semibold tracking-tight text-white ${values ? "md:text-[25px]" : "md:text-[24px]"}`}>
                    {item.title}
                  </h3>
                  {values ? <p className="text-[14px] leading-relaxed text-[#D1D1D1]">{item.text}</p> : <ReadMore text={item.text} />}
                </div>
              </GlowCard>
            </div>
          ))}
        </div>
      </div>

      <div className={`flex justify-center md:hidden ${values ? "mb-4 gap-2" : "my-2 gap-3"}`}>
        {cards.map((card, i) => (
          <button
            key={card.title}
            type="button"
            aria-label={`Show ${card.title}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full bg-white transition-[width,opacity] duration-400 ease-[cubic-bezier(.25,1,.5,1)] ${
              i === active ? "w-6 opacity-100" : "w-2 opacity-20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
