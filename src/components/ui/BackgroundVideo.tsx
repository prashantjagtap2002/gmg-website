"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoAsset } from "@/content/media";

type Props = {
  video: VideoAsset;
  className?: string;
  /** Set false to pause (e.g. an off-screen slide). */
  playing?: boolean;
  /** Set false to show only the poster and fetch nothing (e.g. a slide that isn't up next). */
  load?: boolean;
  /** Only fetch while the video is near the viewport, and drop it again once scrolled away. */
  lazy?: boolean;
};

/** Muted, looping, cover-fit background video that shows its first frame until the clip plays. */
export default function BackgroundVideo({ video, className = "", playing = true, load = true, lazy = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(!lazy);

  useEffect(() => {
    if (!lazy || !ref.current) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "200px 0px" });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [lazy]);

  const src = load && inView ? video.src : undefined;
  const shouldPlay = Boolean(src) && playing;

  // A <video> keeps downloading after it unmounts or loses its src until it's reset.
  // Without this, clips from pages the visitor already left held every connection
  // and stalled the next page for a minute on a 10 Mbps link.
  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;
    // Re-attach if a previous cleanup reset it while the props stayed the same (Strict Mode remount).
    if (el.getAttribute("src") !== src) el.src = src;
    return () => {
      const current = el.getAttribute("src");
      if (current && current !== src) return; // React already swapped in another clip
      el.pause();
      el.removeAttribute("src");
      el.load();
    };
  }, [src]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;
    // React doesn't reliably render the `muted` attribute, and browsers only autoplay muted media.
    el.muted = true;
    if (shouldPlay) el.play().catch(() => {});
    else el.pause();
  }, [src, shouldPlay]);

  return (
    <video
      ref={ref}
      src={src}
      poster={video.poster}
      muted
      loop
      playsInline
      preload={shouldPlay ? "auto" : "metadata"}
      aria-hidden
      className={`pointer-events-none absolute inset-0 size-full object-cover ${className}`}
    />
  );
}
