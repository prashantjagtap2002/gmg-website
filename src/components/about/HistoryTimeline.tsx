"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { timeline } from "@/content/about";
import styles from "./HistoryTimeline.module.css";

const YEAR_WIDTH = 200;

export default function HistoryTimeline() {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const last = timeline.length - 1;

  const move = (dir: number) => setIndex((i) => Math.min(last, Math.max(0, i + dir)));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => Math.min(last, i + 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [last]);

  return (
    <section className={styles.container} aria-roledescription="carousel" aria-label="Our history">
      <div className={styles.stage}>
        <div
          className={styles.mask}
          onTouchStart={(e) => (touchX.current = e.changedTouches[0].screenX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].screenX - touchX.current;
            touchX.current = null;
            if (dx < -50) move(1);
            if (dx > 50) move(-1);
          }}
        >
          <div className={styles.slides} style={{ transform: `translateX(-${index * 100}%)` }}>
            {timeline.map((m, i) => (
              <div key={m.year} className={`${styles.slide} ${i === index ? styles.active : ""}`} aria-hidden={i !== index}>
                <div className={styles.content}>
                  <div className={styles.text}>
                    <div className={styles.badge}>{m.year}</div>
                    <h2>
                      {m.title.map((line, j) => (
                        <Fragment key={line}>
                          {j > 0 && <br />}
                          {line}
                        </Fragment>
                      ))}
                    </h2>
                    <p>{m.text}</p>
                  </div>
                  <div className={styles.image}>
                    <Image
                      src={m.image}
                      alt={m.year}
                      className={m.imageScale ? styles[m.imageScale] : undefined}
                      sizes="(max-width: 1024px) 80vw, 340px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous milestone"
        onClick={() => move(-1)}
        className={`${styles.navButton} ${styles.prev} ${index === 0 ? styles.hidden : ""}`}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next milestone"
        onClick={() => move(1)}
        className={`${styles.navButton} ${styles.next} ${index === last ? styles.hidden : ""}`}
      >
        ›
      </button>

      <div className={styles.ruler}>
        <div className={styles.marker} />
        <div className={styles.years} style={{ transform: `translateX(-${index * YEAR_WIDTH + YEAR_WIDTH / 2}px)` }}>
          <div className={styles.line} />
          {timeline.map((m, i) => (
            <button
              key={m.year}
              type="button"
              onClick={() => setIndex(i)}
              aria-current={i === index}
              className={`${styles.year} ${i === index ? styles.active : ""}`}
            >
              {m.year}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
