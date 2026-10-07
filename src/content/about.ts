import { img } from "./media";

export const aboutHeroImage = img("2026/05/GNP01423.JPG-scaled.jpeg");

export const stats = [
  { value: 9, suffix: "", label: "Decades of Legacy", shortLabel: "Decades", accent: "#fbbf24", large: false },
  { value: 3500, suffix: "+", label: "Global Talent", shortLabel: "Talent", accent: "#38bdf8", large: false },
  { value: 35, suffix: "+", label: "Global Presence", shortLabel: "Presence", accent: "#a78bfa", large: false },
  { value: 1, suffix: "Lakhs+", label: "Satisfied Customers", shortLabel: "Customers", accent: "#fb7185", large: true },
  { value: 12, suffix: "K+", label: "Annual Growth", shortLabel: "Growth", accent: "#34d399", large: true },
];

export const brandCarousel = [
  { image: img("2026/05/Hyundai.png"), alt: "Hyundai" },
  { image: img("2026/05/Audi.png"), alt: "Audi" },
  { image: img("2026/05/MG3.png"), alt: "MG" },
  { image: img("2026/05/Mahindra.png"), alt: "Mahindra" },
  { image: img("2026/05/KIA.png"), alt: "Kia" },
  { image: img("2026/05/MGSelect.png"), alt: "MG Select" },
];

export const journey = {
  visible: [
    "As we move into a new phase of growth, we remain grounded in a legacy built on trust, passion, and excellence. With nearly a century of progress behind us, our focus is clear to raise the bar in innovation and customer engagement while creating experiences that go beyond mobility.",
    "Our journey began in Mumbai with Hyundai, laying a strong foundation in India’s rapidly evolving automotive market. This growth led to the establishment of one of the region’s earliest premium luxury destinations, Audi Thane, where elevated design and refined service came together to redefine the customer experience. In 2019, our association with Morris Garages at the beginning of its India journey further strengthened our portfolio, bringing together heritage, innovation, and modern mobility.",
  ],
  more: [
    "In 2023, we introduced a state-of-the-art Mahindra facility that seamlessly integrates Sales and After-Sales operations, reflecting our commitment to future-ready solutions.",
    "The launch of Modi Kia in Kalyan in 2024, followed by the anticipated arrival of MG Select and Tesla in 2025, marks the next stage of our evolution driven by integrity, innovation, and lasting customer relationships.",
  ],
};

/** `imageScale` mirrors the per-logo max-height overrides on the original timeline. */
export const timeline: {
  year: string;
  title: string[];
  text: string;
  image: ReturnType<typeof img>;
  imageScale?: "lml" | "bus" | "kia" | "brainbox" | "thinkarz";
}[] = [
  {
    year: "1932",
    title: ["Modi Auto", "Corporation"],
    text: "The year 1932 stands as a defining moment in the history of Modi Auto Corporation, from which a distinguished automotive legacy emerged.",
    image: img("2026/03/GMG-01.png"),
  },
  {
    year: "1980",
    title: ["Ford", "Trucks"],
    text: "The foray into heavy logistics was strengthened by a strategic partnership with Ford Trucks, redefining road transport with proven power and dependable performance.",
    image: img("2026/03/Untitled-design-3.png"),
  },
  {
    year: "1985",
    title: ["Bus Transport", "Business"],
    text: "With the introduction of bus transport operations under an All India Permit, a new chapter of nationwide connectivity and public service advancement was established.",
    image: img("2026/02/btb.png"),
    imageScale: "bus",
  },
  {
    year: "1987",
    title: ["LML VESPA"],
    text: "The emergence of the scooter era was strengthened by a strategic association with LML, establishing iconic two-wheelers as a defining element of personal mobility for a generation.",
    image: img("2026/03/LML-e1773837072734.png"),
    imageScale: "lml",
  },
  {
    year: "1992",
    title: ["Royal Enfield"],
    text: "A legend takes its place. The partnership with Royal Enfield brought forth the celebrated Bullet, seamlessly combining heritage aesthetics with robust engineering.",
    image: img("2026/03/Untitled-design-9.png"),
  },
  {
    year: "2000",
    title: ["Hyundai"],
    text: "A new millennium ushered in a new era. Our collaboration with Hyundai marked our entry into the modern passenger vehicle segment, defined by advanced technology and innovation.",
    image: img("2026/03/Untitled-design-24-1.png"),
  },
  {
    year: "2006",
    title: ["Hero Honda"],
    text: "Establishing leadership in the two-wheeler market, the partnership with Hero Honda reinforced our commitment to efficiency, reliability, and mass mobility.",
    image: img("2026/03/Hero_Honda.png"),
  },
  {
    year: "2009",
    title: ["Ford and", "Chevrolet"],
    text: "Blending American engineering with market expertise, our dual dealership expansion showcased Ford’s durability alongside Chevrolet’s design-led appeal.",
    image: img("2026/03/Untitled-design-12.png"),
  },
  {
    year: "2015",
    title: ["Audi"],
    text: "Setting new standards of sophistication. Our entry into the luxury segment with Audi introduced German engineering, quattro performance, and refined comfort to a discerning clientele.",
    image: img("2026/03/Untitled-design-22.png"),
  },
  {
    year: "2019",
    title: ["MG Motor"],
    text: "With the introduction of MG, British motoring heritage evolved into a new era of connected mobility, setting progressive benchmarks across the industry.",
    image: img("2026/03/MG.png"),
  },
  {
    year: "2020",
    title: ["Krishiv", "Insurance"],
    text: "Strengthening the foundation for the future. The establishment of Krishiv Insurance marked our diversification into financial services, offering comprehensive protection and lasting peace of mind.",
    image: img("2026/03/Krishvi-e1773836422240.png"),
  },
  {
    year: "2021",
    title: ["Thinkarz"],
    text: "Advancing pre-owned mobility. A renewed approach to the automotive lifecycle, focused on delivering quality and trust within the secondary market.",
    image: img("2026/04/Thinkarz-2.png"),
    imageScale: "thinkarz",
  },
  {
    year: "2022",
    title: ["GC Automobile"],
    text: "A strategic expansion of scale. GC Automobile emerged as a key player, enhancing service standards and extending the Group’s operational reach.",
    image: img("2026/03/GC-Automobile.png"),
  },
  {
    year: "2023",
    title: ["Brain Box Media &", "Mahindra Rise"],
    text: "Where media intelligence aligns with utility-driven mobility. This dual venture marked an expansion into creative media solutions while strengthening the automotive portfolio with Mahindra.",
    image: img("2026/04/Untitled-design-32.png"),
    imageScale: "brainbox",
  },
  {
    year: "2024",
    title: ["Kia and", "Mahindra Electric"],
    text: "Aligning media intelligence with utility-focused mobility, this dual venture expanded creative media capabilities while strengthening the automotive portfolio with Mahindra.",
    image: img("2026/03/Untitled-design-15.png"),
    imageScale: "kia",
  },
  {
    year: "2025",
    title: ["MG Select"],
    text: "The premium tier is embodied by MG SELECT, representing the pinnacle of the brand’s portfolio through a curated offering of high-performance vehicles and exclusive ownership experiences.",
    image: img("2026/03/MG_SELECT.png"),
  },
];

export const missionVision = [
  {
    title: "Mission",
    text: "To create a timeless legacy where trust forms the foundation, visionary leadership shapes the future and customer-first excellence defines every experience and relationship.",
    variant: "red" as const,
  },
  {
    title: "Vision",
    text: "To emerge as a leading automobile-centric business group by strategically expanding our presence across high-growth cities, guided by deep market insight and a relentless pursuit of excellence.",
    variant: "blue" as const,
  },
];

export type Leader = {
  title: string;
  image: ReturnType<typeof img>;
  /** Image width inside its column and which side the offset shadow falls on. */
  imageWidth: string;
  imageSide: "left" | "right";
  intro?: string;
  /** Blank line between sections (the MD bio is spaced out on the original). */
  spaced?: boolean;
  sections: { label: string; points: string[] }[];
};

export const leaders: Leader[] = [
  {
    title: "Late Mr. Chimanlal Modi",
    image: img("2026/01/imgfx_20260108_125406_1.png"),
    imageWidth: "78%",
    imageSide: "left",
    sections: [
      {
        label: "Foundation:",
        points: [
          "Modi Auto Corporation was founded in 1932 in Gwalior by the visionary Late Mr. Chimanlal Modi, marking the beginning of a legacy built on innovation and ambition.",
        ],
      },
      {
        label: "Early Milestones:",
        points: [
          "In 1980, the company expanded its portfolio with Ford trucks.",
          "By 1985, it entered the bus transport sector with an all-India permit.",
          "In 1987, LML Vespa was added, followed by Royal Enfield in 1992.",
        ],
      },
      {
        label: "Growth Under New Leadership:",
        points: [
          "In 2000, Mr. Gautam Modi carried the legacy forward by introducing Hyundai.",
          "Under his leadership, the group diversified further by adding several renowned automotive brands and expanding operations across new verticals.",
        ],
      },
      {
        label: "Today:",
        points: [
          "The Modi Group stands as a symbol of resilience, growth and a forward-looking vision built on over 90 years of entrepreneurial spirit.",
        ],
      },
    ],
  },
  {
    title: "Managing Director - Gautam Modi Group",
    image: img("2026/01/Gemini_Generated_Image_7gg8ml7gg8ml7gg8-e1767940396965.png"),
    imageWidth: "75%",
    imageSide: "right",
    spaced: true,
    sections: [
      {
        label: "Background:",
        points: [
          "Mr Gautam Chimanlal Modi, a seasoned professional at 64, possesses a distinguished 36-year career in the Automobile Industry, having obtained a Mechanical Engineering degree in 1980 from Gwalior.",
        ],
      },
      {
        label: "Career Journey:",
        points: [
          "Managing Director of the Gautam Modi Group with a two-decade tenure at Modi Hyundai.",
          "Committee member at a prestigious school in Mumbai, contributing to the educational sector.",
        ],
      },
      {
        label: "Experience:",
        points: [
          "Over two decades of leadership experience, with a strong emphasis on efficiency and a robust work ethic.",
        ],
      },
      {
        label: "Business Expansion:",
        points: [
          "Extended business into the Real Estate and Insurance sectors.",
          "Expanded the business by adding brands such as Ford, Hero Honda, Hyundai, Audi, MG, Mahindra and Kia.",
        ],
      },
    ],
  },
  {
    title: "Director - Gautam Modi Group",
    image: img("2026/01/WhatsApp-Image-2026-01-16-at-4.52.33-PM_cropped_processed_by_imagy-2.jpg"),
    imageWidth: "62%",
    imageSide: "left",
    intro: "Mrs. Nidhi Modi Chheda",
    sections: [
      {
        label: "Background:",
        points: ["With over 16 years of experience in the Automobile sector, she is a seasoned entrepreneur."],
      },
      {
        label: "Diverse Portfolio:",
        points: [
          "Representing brands such as Audi, Hyundai, MG, Mahindra and more, she also serves as the EV Director of Maharashtra.",
        ],
      },
      {
        label: "Achievements:",
        points: ["Awarded the “Young Women Achiever” title by Midday in 2018."],
      },
    ],
  },
];
