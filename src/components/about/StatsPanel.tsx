"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { stats } from "@/content/about";

const easeOutQuart = (t: number) => 1 - (1 - t) ** 4;

/** Counts from 0 to `value` over 2s the first time it scrolls into view. */
function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start: number | null = null;
        const step = (now: number) => {
          start ??= now;
          const progress = Math.min((now - start) / 2000, 1);
          setCurrent(Math.floor(easeOutQuart(progress) * value));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={ref}>{current.toLocaleString("en-US")}</span>;
}

export default function StatsPanel() {
  return (
    <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[24px] border border-white/10 bg-black px-2 py-3 after:pointer-events-none after:absolute after:-inset-[20%] after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_60%)] md:px-8 md:py-12">
      <div className="grid w-full grid-cols-6 gap-2 md:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{ "--accent": stat.accent } as CSSProperties}
            className={`group relative flex flex-col justify-end overflow-hidden rounded-[20px] border border-white/10 bg-[#0a0a0a] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-[linear-gradient(90deg,transparent,var(--accent),transparent)] before:opacity-30 hover:-translate-y-1 hover:border-[var(--accent)] hover:bg-[#0f0f0f] hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] ${
              stat.large
                ? "col-span-3 min-h-[110px] p-3 md:min-h-[220px] md:p-10"
                : "col-span-2 min-h-[85px] p-2 md:min-h-[160px] md:p-8"
            }`}
          >
            <div className="flex flex-wrap items-baseline">
              <h3
                className={`mb-[0.1rem] leading-[0.9] font-black tracking-[-0.05em] text-white md:mb-1 md:leading-none ${
                  stat.large ? "text-[clamp(1.8rem,8vw,2.5rem)] md:text-[4.5rem]" : "text-[clamp(1.4rem,6vw,2rem)] md:text-[3.5rem]"
                }`}
              >
                <Counter value={stat.value} />
              </h3>
              {stat.suffix && (
                <span className={`text-[12px] font-black text-white ${stat.large ? "ml-1 md:text-4xl" : "ml-0.5 md:text-2xl"}`}>
                  {stat.suffix}
                </span>
              )}
            </div>
            <p className="text-[clamp(0.55rem,2vw,0.65rem)] leading-[1.1] font-bold tracking-[0.08em] text-white uppercase opacity-70 md:text-[0.75rem] md:opacity-60">
              <span className="hidden md:inline">{stat.label}</span>
              <span className="md:hidden">{stat.shortLabel}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
