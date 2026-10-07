import Image from "next/image";
import type { CSSProperties } from "react";
import type { Office } from "@/content/business";
import type { ImageAsset } from "@/content/media";

type Props = {
  title: string;
  logo: ImageAsset;
  logoWidth: [string, string];
  offices: Office[];
};

function OfficeCard({ office }: { office: Office }) {
  return (
    <article className="flex h-full flex-col gap-[18px] rounded-[25px] border border-white/10 bg-black p-[5%] transition-[transform,border-color] duration-300 hover:scale-[1.03] hover:border-white/20">
      <Image
        src={office.image}
        alt={office.name}
        sizes="(max-width: 767px) 85vw, 314px"
        className="h-auto w-full rounded-[18px]"
      />
      <h4 className="text-center text-[20px] leading-none font-bold text-white">{office.name}</h4>
      <p className="text-center text-[15px] leading-5 font-medium text-white">{office.address}</p>
      <div className="mt-auto flex justify-center pt-[2%]">
        <a
          href={office.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-maps inline-flex items-center gap-1.5 rounded-[7px] px-6 py-3 text-[15px] leading-none font-medium text-white"
        >
          <svg viewBox="0 0 384 512" className="size-[15px] fill-current" aria-hidden>
            <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
          </svg>
          Google Maps
        </a>
      </div>
    </article>
  );
}

export default function OfficeGroup({ title, logo, logoWidth, offices }: Props) {
  return (
    <section className="flex flex-col gap-5 p-[10px]">
      <div className="flex justify-center">
        <Image
          src={logo}
          alt=""
          sizes="(max-width: 767px) 50vw, 260px"
          style={{ "--w": logoWidth[0], "--w-m": logoWidth[1] } as CSSProperties}
          className="h-auto w-[var(--w-m)] md:w-[var(--w)]"
        />
      </div>
      <h3 className="text-center text-[24px] leading-none font-bold text-white md:text-[30px]">{title}</h3>
      <div className="grid auto-rows-fr grid-cols-1 gap-5 p-[10px] md:grid-cols-3">
        {offices.map((office) => (
          <OfficeCard key={`${office.name}-${office.address}`} office={office} />
        ))}
      </div>
    </section>
  );
}
