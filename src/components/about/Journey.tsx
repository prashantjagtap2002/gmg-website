"use client";

import { useState } from "react";
import { journey } from "@/content/about";

export default function Journey() {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = expanded ? [...journey.visible, ...journey.more] : journey.visible;

  return (
    <section className="mx-auto max-w-[800px] text-[16px] leading-[1.7] text-white">
      {paragraphs.map((text) => (
        <p key={text.slice(0, 24)} className="mb-4">
          {text}
        </p>
      ))}
      <button type="button" onClick={() => setExpanded((e) => !e)} className="mt-[10px] font-medium underline">
        {expanded ? "Read less" : "Read more"}
      </button>
    </section>
  );
}
