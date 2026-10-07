import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Sparkles } from "lucide-react";
import { img } from "@/content/media";

export default function CareersHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10">
      <Image
        src={img("2026/careers-team.webp")}
        alt="The Gautam Modi Group team"
        fill
        priority
        className="-z-20 object-cover object-top"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/85 via-black/75 to-black" />
      <div className="mx-auto max-w-4xl px-5 pt-20 pb-24 text-center md:px-8 md:pt-28 md:pb-32">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-semibold tracking-[.18em] text-gold uppercase">
          <Sparkles className="size-3.5" /> Gautam Modi Group · Careers
        </p>
        <h1 className="mt-7 text-4xl leading-tight font-black tracking-tight text-white md:text-7xl">
          Careers at <span className="text-gold">Gautam Modi Group</span>
        </h1>
        <p className="mt-5 text-lg font-semibold text-white/90 md:text-2xl">
          Build your career with one of India&apos;s leading automotive groups
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
          Gautam Modi Group represents leading brands including Audi, Mahindra, Hyundai, Kia and MG. Join a high-growth
          organisation offering careers across sales, service, operations, finance, HR, marketing and leadership, backed by
          hands-on learning and accelerated career growth.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href="#open-roles"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-black transition hover:bg-[#ffc233]"
          >
            Explore open roles <ArrowDown className="size-4" />
          </a>
          <Link
            href="/about-us"
            className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            About the Group
          </Link>
        </div>
      </div>
    </section>
  );
}
