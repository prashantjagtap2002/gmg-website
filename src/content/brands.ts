import { img } from "./media";

/**
 * Logo wall (Home + Business). `padding` and `maxSize` are the per-logo
 * tweaks from the original widget so each mark looks optically balanced.
 */
export const brandWall = [
  { name: "Hyundai", logo: img("2026/03/Untitled-design-24-1.png"), padding: "10%", maxSize: ["84%", "84%"] },
  { name: "Mahindra", logo: img("2026/04/Mahindra-rise.png"), padding: "13%", maxSize: ["82%", "78%"] },
  { name: "Audi", logo: img("2026/03/Untitled-design-21.png"), padding: "9%", maxSize: ["90%", "86%"] },
  { name: "Tesla", logo: img("2026/08/ChatGPT-Image-Aug-11-2026-03_53_09-PM.png"), padding: "5%", maxSize: ["100%", "96%"] },
  { name: "Kia", logo: img("2026/03/Untitled-design-17.png"), padding: "11%", maxSize: ["87%", "83%"] },
  { name: "MG", logo: img("2026/03/MG_SELECT.png"), padding: "12%", maxSize: ["84%", "80%"] },
  { name: "Krishiv", logo: img("2026/03/Krishvi-e1773836422240.png"), padding: "9%", maxSize: ["90%", "86%"] },
  { name: "Thinkarz", logo: img("2026/03/Thinkarz-2-e1773836400492.png"), padding: "9%", maxSize: ["90%", "86%"] },
] satisfies { name: string; logo: ReturnType<typeof img>; padding: string; maxSize: [string, string] }[];

/** Revealed across the centre 2×2 tiles when the wall flips. */
export const brandWallStitch = img("2026/01/Untitled-design-1.png");
