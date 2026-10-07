"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type TouchEvent } from "react";

type Options = {
  count: number;
  /** Slides cloned onto each end so the loop is seamless; must be ≥ the max slides in view. */
  clones: number;
  /** Autoplay delay in ms; omit to disable. */
  autoplay?: number;
  pauseOnHover?: boolean;
  /** Like Swiper's `disableOnInteraction`: manual navigation stops autoplay for good. */
  stopOnInteraction?: boolean;
  /** Slide transition duration in ms. */
  speed?: number;
};

/**
 * Infinite slider state. Render `loopItems(items, clones)` inside a `.track`
 * (see carousel.module.css) and pass `trackStyle` to it.
 */
export function useLoopCarousel({
  count,
  clones,
  autoplay,
  pauseOnHover = false,
  stopOnInteraction = false,
  speed = 500,
}: Options) {
  const [pos, setPos] = useState(clones);
  const [animate, setAnimate] = useState(true);
  const [autoplayOn, setAutoplayOn] = useState(Boolean(autoplay));
  const [timerKey, setTimerKey] = useState(0);
  const moving = useRef(false);
  const hovered = useRef(false);
  const touchX = useRef<number | null>(null);

  const move = useCallback(
    (to: (p: number) => number) => {
      if (moving.current || count < 2) return;
      moving.current = true;
      setAnimate(true);
      setPos(to);
    },
    [count],
  );

  // Once a slide transition finishes, jump from a clone back to its real slide without animating.
  useEffect(() => {
    const timer = setTimeout(() => {
      moving.current = false;
      if (pos >= count + clones) {
        setAnimate(false);
        setPos(pos - count);
      } else if (pos < clones) {
        setAnimate(false);
        setPos(pos + count);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [pos, count, clones, speed]);

  useEffect(() => {
    if (!autoplay || !autoplayOn || count < 2) return;
    const id = setInterval(() => {
      if (!hovered.current && !document.hidden) move((p) => p + 1);
    }, autoplay);
    return () => clearInterval(id);
  }, [autoplay, autoplayOn, count, move, timerKey]);

  const interacted = useCallback(() => {
    if (stopOnInteraction) setAutoplayOn(false);
    else setTimerKey((k) => k + 1);
  }, [stopOnInteraction]);

  const next = useCallback(() => {
    interacted();
    move((p) => p + 1);
  }, [interacted, move]);

  const prev = useCallback(() => {
    interacted();
    move((p) => p - 1);
  }, [interacted, move]);

  const goTo = useCallback(
    (index: number) => {
      if (index + clones === pos) return;
      interacted();
      move(() => index + clones);
    },
    [clones, pos, interacted, move],
  );

  const active = (((pos - clones) % count) + count) % count;

  const trackStyle = {
    "--pos": pos,
    "--speed": `${speed}ms`,
    transition: animate ? undefined : "none",
  } as CSSProperties;

  const viewportProps = {
    onMouseEnter: () => {
      hovered.current = pauseOnHover;
    },
    onMouseLeave: () => {
      hovered.current = false;
    },
    onTouchStart: (e: TouchEvent) => {
      touchX.current = e.touches[0].clientX;
    },
    onTouchEnd: (e: TouchEvent) => {
      if (touchX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchX.current;
      touchX.current = null;
      if (Math.abs(dx) > 50) {
        if (dx < 0) next();
        else prev();
      }
    },
  };

  return { active, next, prev, goTo, trackStyle, viewportProps };
}

/** The slide list with `clones` copies of each end attached, tagged with the real index. */
export function loopItems<T>(items: T[], clones: number) {
  const n = items.length;
  const head = Array.from({ length: clones }, (_, i) => (n - clones + i + n * clones) % n);
  const tail = Array.from({ length: clones }, (_, i) => i % n);
  return [...head, ...items.map((_, i) => i), ...tail].map((index, slot) => ({
    item: items[index],
    index,
    key: `${slot}-${index}`,
    clone: slot < clones || slot >= clones + n,
  }));
}
