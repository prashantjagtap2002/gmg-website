"use client";

import Link from "next/link";
import { useState } from "react";
import { faqs } from "@/content/home";

function Chevron({ up }: { up: boolean }) {
  return (
    <svg viewBox="0 0 448 512" className="size-[15px] shrink-0 fill-white" aria-hidden>
      {up ? (
        <path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z" />
      ) : (
        <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
      )}
    </svg>
  );
}

export default function FaqSection() {
  // Like the original accordion: all collapsed, at most one open.
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx-auto flex w-full flex-col p-[10px] md:w-[80%] md:flex-row">
      <div className="flex flex-col justify-center gap-5 px-[10px] pt-[10px] pb-[30px] md:w-1/2 md:p-[10px]">
        <h2 className="text-center text-[30px] leading-[1.2] font-semibold text-white md:text-left md:text-[45px] md:leading-[50px]">
          Frequently Asked Questions
        </h2>
        <p className="text-center leading-6 text-white md:mr-[42px] md:text-left">
          Find answers to common questions about our services and offerings
        </p>
        <div className="flex justify-center md:justify-start">
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-[5px] rounded-[13px] border border-white/[.12] bg-black/[.89] px-[22px] py-[18px] text-[14px] leading-none font-medium text-white transition-colors hover:bg-[#111] md:text-[15px]"
          >
            Ask a Question
            <svg viewBox="0 0 24 24" className="size-[10px]" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-[15px] p-[10px] md:w-1/2">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div key={faq.question}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-[10px] rounded-[15px] border border-[#d5d8dc] px-3 py-4 text-left text-[14px] leading-6 font-semibold text-white md:px-[18px] md:py-5 md:text-[16px]"
              >
                <span>{faq.question}</span>
                <Chevron up={isOpen} />
              </button>
              <div
                id={`faq-${i}`}
                role="region"
                className={`grid transition-[grid-template-rows] duration-500 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <div className="mt-[3px] p-[10px]">
                    <p className="p-[10px] text-[14px] leading-6 font-light text-white md:text-[16px]">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
