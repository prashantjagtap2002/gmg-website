"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import type { AwardShowcase } from "@/content/gallery";
import { loopItems, useLoopCarousel } from "@/lib/useLoopCarousel";
import carousel from "@/components/ui/carousel.module.css";
import styles from "./AwardsShowcase.module.css";

const CLONES = 3;

type TrophyProps = {
  gradient: string;
  className: string;
  viewBox: string;
  detailed?: boolean;
  style?: CSSProperties;
};

function Trophy({ gradient, className, viewBox, detailed, style }: TrophyProps) {
  const gold = `url(#${gradient}-gold)`;
  const dark = `url(#${gradient}-dark)`;
  return (
    <svg className={className} viewBox={viewBox} style={style} aria-hidden>
      <path d="M 30 110 L 70 110 L 80 120 L 20 120 Z" fill={dark} />
      <rect x="35" y="95" width="30" height="15" fill={gold} />
      <path d="M 40 85 L 60 85 L 65 95 L 35 95 Z" fill={dark} />
      <rect x="45" y="60" width="10" height="25" fill={gold} />
      <path d="M 25 20 Q 50 80 75 20 Z" fill={gold} />
      <ellipse cx="50" cy="20" rx="25" ry="8" fill="#FFDF73" />
      {detailed && <ellipse cx="50" cy="21" rx="20" ry="5" fill="#C99622" />}
      <path d="M 25 30 Q 10 30 15 50 Q 20 60 35 55" fill="none" stroke={gold} strokeWidth="4" strokeLinecap={detailed ? "round" : undefined} />
      <path d="M 75 30 Q 90 30 85 50 Q 80 60 65 55" fill="none" stroke={gold} strokeWidth="4" strokeLinecap={detailed ? "round" : undefined} />
    </svg>
  );
}

export default function AwardsShowcase({ showcase }: { showcase: AwardShowcase }) {
  const { awards, decorated } = showcase;
  const gradient = `trophy${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { active, next, prev, trackStyle, viewportProps } = useLoopCarousel({
    count: awards.length,
    clones: CLONES,
    autoplay: 4000,
    pauseOnHover: true,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const sectionClass = [
    styles.section,
    visible ? styles.visible : "",
    showcase.frameSide === "right" ? styles.frameRight : "",
    decorated ? "" : styles.compact,
    showcase.brand === "MG" ? styles.plainArrows : "",
  ].join(" ");

  return (
    <section ref={ref} className={sectionClass} aria-label={`${showcase.brand} awards`}>
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <linearGradient id={`${gradient}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFDF73" />
            <stop offset="50%" stopColor="#E5B03C" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
          <linearGradient id={`${gradient}-dark`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8860B" />
            <stop offset="100%" stopColor="#8B6508" />
          </linearGradient>
        </defs>
      </svg>

      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.line} />
          <div className={`${styles.frame} ${styles.reveal}`}>
            <div className={`${styles.logo} ${styles.reveal} ${styles.d1}`}>
              <Image src={showcase.logo} alt={`${showcase.brand} logo`} sizes="220px" />
            </div>
            <div key={awards[active].year} className={`${styles.year} ${styles.reveal} ${styles.d1} ${visible ? styles.update : ""}`}>
              {awards[active].year}
            </div>
            {decorated && (
              <>
                <div className={`${styles.ticks} ${styles.ticksTop} ${styles.reveal} ${styles.d2}`} aria-hidden>
                  <span />
                  <span />
                </div>
                <div className={`${styles.ticks} ${styles.ticksBottom} ${styles.reveal} ${styles.d2}`} aria-hidden>
                  <span />
                  <span />
                </div>
              </>
            )}
            <div className={styles.titleYears}>Year Of</div>
            <div className={styles.titleVictory}>Victory</div>
            <p className={`${styles.description} ${styles.reveal} ${styles.d2}`}>
              We&apos;ve secured multiple prestigious national awards over the years, cementing our legacy as a premier automotive partner.
            </p>
          </div>
          <Trophy gradient={gradient} viewBox="0 0 100 120" detailed={decorated} className={`${styles.mainTrophy} ${styles.reveal} ${styles.d3}`} />
        </div>

        <div className={styles.carouselColumn}>
          <button type="button" aria-label="Previous" onClick={prev} className={`${styles.arrow} ${styles.prev} ${styles.reveal} ${styles.d4}`}>
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className={styles.viewport} {...viewportProps}>
            <div className={`${carousel.track} ${styles.track}`} style={trackStyle}>
              {loopItems(awards, CLONES).map(({ item, key, clone }, slot) => (
                <div key={key} className={carousel.slide} aria-hidden={clone || undefined}>
                  <div className={`${styles.card} ${styles.reveal}`}>
                    <Trophy
                      gradient={gradient}
                      viewBox="0 0 100 125"
                      className={styles.cardTrophy}
                      // Audi/MG stagger the float (nth-child even: 0.5s, 3n: 1s) so trophies don't bob in sync.
                      style={decorated ? { animationDelay: (slot + 1) % 3 === 0 ? "1s" : (slot + 1) % 2 === 0 ? "0.5s" : undefined } : undefined}
                    />
                    <div className={styles.cardYear}>{item.year}</div>
                    <div className={styles.cardTitle}>{item.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button type="button" aria-label="Next" onClick={next} className={`${styles.arrow} ${styles.next} ${styles.reveal} ${styles.d4}`}>
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className={`${styles.counter} ${styles.reveal} ${styles.d4}`}>
            <span>{pad(active + 1)}</span>
            <span className={styles.counterDivider}>/</span>
            <span className={styles.counterTotal}>{pad(awards.length)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
