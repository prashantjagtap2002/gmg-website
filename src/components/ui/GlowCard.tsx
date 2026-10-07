import type { CardVariant } from "@/content/home";
import styles from "./GlowCard.module.css";

type Props = {
  variant: CardVariant;
  /** "values" (Core Values), "strength" (Our Strength) or "mission" (Mission & Vision). */
  kind: "values" | "strength" | "mission";
  className?: string;
  barClassName?: string;
  children: React.ReactNode;
};

export default function GlowCard({ variant, kind, className = "", barClassName = "", children }: Props) {
  const kindClass = kind === "values" ? "" : styles[kind];
  return (
    <div className={styles.perspective}>
      <article className={`${styles.card} ${styles[variant]} ${kindClass} ${className}`}>
        <div className={`${styles.bar} ${barClassName}`} />
        {children}
        <div className={styles.glow} aria-hidden>
          <span />
          <span />
        </div>
      </article>
    </div>
  );
}
