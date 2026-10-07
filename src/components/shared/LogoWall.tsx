"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { brandWall, brandWallStitch } from "@/content/brands";
import styles from "./LogoWall.module.css";

// The centre 2×2 tiles (0-based) share one image across their backs.
const stitchPosition: Record<number, string> = { 1: "0% 0%", 2: "100% 0%", 5: "0% 100%", 6: "100% 100%" };

export default function LogoWall() {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setFlipped((f) => !f), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.grid}>
      {brandWall.map((brand, i) => (
        <div key={brand.name} className={`${styles.cell} ${flipped ? styles.flipped : ""}`}>
          <div className={styles.inner}>
            <div className={`${styles.face} ${styles.front}`} style={{ padding: brand.padding }}>
              <Image
                src={brand.logo}
                alt={brand.name}
                sizes="(max-width: 767px) 25vw, 300px"
                style={{ maxWidth: brand.maxSize[0], maxHeight: brand.maxSize[1] }}
              />
            </div>
            <div
              className={`${styles.face} ${styles.back}`}
              style={
                i in stitchPosition
                  ? { backgroundImage: `url(${brandWallStitch.src})`, backgroundPosition: stitchPosition[i] }
                  : undefined
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}
