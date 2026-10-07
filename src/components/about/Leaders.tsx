import Image from "next/image";
import { Fragment } from "react";
import { leaders, type Leader } from "@/content/about";

function Bio({ leader }: { leader: Leader }) {
  return (
    <div className="text-[14px] leading-6 text-white md:text-[16px]">
      {leader.intro && (
        <p>
          <strong>{leader.intro}</strong>
        </p>
      )}
      {leader.sections.map((section, i) => (
        <p key={section.label}>
          <strong>{section.label}</strong>
          {section.points.map((point) => (
            <Fragment key={point}>
              <br />• {point}
            </Fragment>
          ))}
          {leader.spaced && i < leader.sections.length - 1 && (
            <>
              <br />
              <br />
            </>
          )}
        </p>
      ))}
    </div>
  );
}

function Portrait({ leader }: { leader: Leader }) {
  const right = leader.imageSide === "right";
  return (
    <div className={`flex p-[10px] md:p-[15px] ${right ? "justify-end" : "justify-start"}`}>
      <Image
        src={leader.image}
        alt={leader.intro ?? leader.title}
        sizes="(max-width: 767px) 90vw, 420px"
        style={{ "--w": leader.imageWidth } as React.CSSProperties}
        className={`h-auto w-[95%] rounded-[25px] transition-transform duration-300 hover:scale-[1.03] md:w-[var(--w)] ${
          right ? "shadow-[-15px_15px_0_0_#e3dcc8]" : "shadow-[15px_15px_0_0_#e3dcc8]"
        }`}
      />
    </div>
  );
}

export default function Leaders() {
  return (
    <div className="flex flex-col gap-[60px]">
      {leaders.map((leader) => {
        const text = (
          <div className={`flex flex-col gap-5 p-[10px] ${leader.imageSide === "right" ? "justify-start" : "justify-center"}`}>
            <h3 className="text-[30px] leading-[1.2] font-semibold text-white md:leading-none">{leader.title}</h3>
            <Bio leader={leader} />
          </div>
        );
        const portrait = <Portrait leader={leader} />;
        return (
          <div key={leader.title} className="grid grid-cols-1 gap-5 p-[10px] md:grid-cols-2">
            {leader.imageSide === "right" ? (
              <>
                {text}
                {portrait}
              </>
            ) : (
              <>
                {portrait}
                {text}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
