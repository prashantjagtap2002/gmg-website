"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

export default function ShareRoleButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  function share() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title, url }).catch(() => {});
      return;
    }
    navigator.clipboard
      ?.writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  }

  return (
    <button
      type="button"
      onClick={share}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
    >
      {copied ? <Check className="size-4 text-gold" /> : <Share2 className="size-4" />}
      {copied ? "Link copied" : "Share this role"}
    </button>
  );
}
