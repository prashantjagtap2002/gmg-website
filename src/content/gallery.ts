import { img, video, type VideoAsset } from "./media";

/**
 * Each mosaic row is 80vh tall: a wide clip over a (clip + #GMG tile) pair,
 * beside one tall clip. Rows alternate which side the tall clip sits on.
 */
export const mosaicRows: { wide: VideoAsset; small: VideoAsset; tall: VideoAsset; tallSide: "left" | "right" }[] = [
  {
    wide: video("2026/02/WhatsApp-Video-2024-11-23-at-4.30.57-PM.mp4"),
    small: video("2026/06/AQOsaGrhv25Eb8RSEv6HDkWLJtGdfROKSGg0L-UOiW7jh6mXD5o9HiH-Poh6N-n-YXKNzAyV3lxCn68MT_5rjvQM0DB1PMnXpA4irmk.mp4"),
    tall: video("2026/04/AQPp2YnZVqGqwhkgDFJ0lQx8_hgyThF-n02Fzr41JCeVMvYpHhu5hjOQ5M5_VaqFyujofb-lIYQexbM2n5MEWVYn.mp4"),
    tallSide: "right",
  },
  {
    wide: video("2026/02/AWED-2.mp4"),
    small: video("2026/06/AQMVejbpm3izkxXhuvAR-GpJ0KpELgAzBDQe_RbNXKCX7K-5ZaS1L1CiGcoDYCCJVByjVORvGgwJVDlO6SeMghn0u1lRl7reReNHVuQ.mp4"),
    tall: video("2026/04/WhatsApp-Video-2026-04-13-at-11.28.57-AM.mp4"),
    tallSide: "left",
  },
  {
    wide: video("2026/06/AQNzNEk3YWPNRNQLv7hLrOMjokw78qdSPCEUxYncfXcgR2N3WFxm5sstbRFkVapLGZfWsiw9RfZcp4IPL2We4y6xghta4R-kv8yOL-0.mp4"),
    small: video("2026/04/WhatsApp-Video-2026-04-15-at-12.49.31-PM.mp4"),
    tall: video("2026/02/WhatsApp-Video-2024-11-21-at-17.48.57.mp4"),
    tallSide: "right",
  },
  {
    wide: video("2026/02/AWED-11.mp4"),
    small: video("2026/04/AQMNhRgkmsJWlUPSjLGYgy6-zlud4MaDtDO4hrH0dUh1rtqpLFPw-Wt8tpDqG9o1hOeMbRKU7lz43RFHCiDY4noEHy-5vBMFMvkDrd4.mp4"),
    tall: video("2026/02/WhatsApp-Video-2024-11-21-at-18.29.29.mp4"),
    tallSide: "left",
  },
  {
    wide: video("2026/04/AQMlWZpune1cO0ObiIwHFCedbElCCtO1fExNIWG-dgHec1zxMaZLSXZ4lFqS1KEHAoKktfQjF5uMwweUGlVU7t47.mp4"),
    small: video("2026/02/WhatsApp-Video-2024-11-23-at-3.56.57-PM.mp4"),
    tall: video("2026/04/AQM70D7895_wkFIgobs6ZK1LbNc5LGx9mfzuEj2s6OTTgVLGUqjrhOrcIRShhJLYV9cEhvpze2mKOTxLZpzrZJWq.mp4"),
    tallSide: "right",
  },
];

export type AwardShowcase = {
  brand: string;
  logo: ReturnType<typeof img>;
  /** Which side the gold "Year of Victory" frame sits on at desktop widths. */
  frameSide: "left" | "right";
  /** The Audi and MG frames carry the diagonal accent ticks; Hyundai's doesn't. */
  decorated: boolean;
  awards: { year: string; title: string }[];
};

const y = (year: string, ...titles: string[]) => titles.map((title) => ({ year, title }));

export const awardShowcases: AwardShowcase[] = [
  {
    brand: "Hyundai",
    logo: img("2026/03/Untitled-design-24-1.png"),
    frameSide: "left",
    decorated: false,
    awards: [
      ...y(
        "2025",
        "Best Performer – West Zone",
        "AS Centre Award – Accessories – All India Performer",
        "Best Adherence Dealer",
        "Best Certified Staff Dealer",
        "Best Dealer in Pick & Drop",
        "Best RO Growth Dealer",
        "Best Service Retention Dealer",
      ),
      ...y("2024", "Shopper Visit Winner", "Smart Implementation", "H-Smart App Utilization", "Digital Docket Implementation"),
      ...y(
        "2022–2023",
        "Best Signature Outlet",
        "Global CX Championship – Top Score in Mystery Shopping",
        "Top Score for Process Audit; Top Performer in Manpower Certification",
        "Best Regional Performance Awards – Accessory Best Performer; Finance (Bank of Baroda, SBI, Axis, AU)",
        "Finalist – Hyundai National Sales Skill Contest",
      ),
      ...y("2018–2019", "National Best Seller – Target Achievement"),
      ...y("2016–2017", "National Best Seller – Target Achievement"),
      ...y("2015–2016", "National Best Seller – Target Achievement"),
      ...y(
        "2014–2015",
        "National Best Seller – Volume",
        "Regional Best Seller – Top Order Volume",
        "National Dealers Conference Macau – Best-Selling Partner",
        "Platinum Club Member",
        "10 Glorious Years in India",
      ),
      ...y("2013–2014", "Regional Best Seller – Top Order Volume", "Best Performance – Parts and Accessories", "Elite Club Member"),
      ...y("2012–2013", "Regional Best Seller – Top Order Volume"),
    ],
  },
  {
    brand: "Audi",
    logo: img("2026/03/Audi.png"),
    frameSide: "right",
    decorated: true,
    awards: [
      ...y("2026", "Audi Genuine Parts Off-take Performance, Category A"),
      ...y("2025", "Best Marketing Partner, Gold"),
      ...y(
        "2024",
        "Best Audi Partner, Category A – Gold",
        "Sales Partner, Category A – Gold",
        "Aftersales Partner, Category A – Bronze",
        "Marketing Partner, Silver",
        "Best AAP Partner, Category A",
        "Best Rennen Partner, Category A",
        "Rennen – Dealer Award, Category A",
        "Award of Excellence – Highest Service Plan Sales",
        "Award of Excellence – Highest Accessory Sales",
        "Highest Performance in Extended Warranty Sale, Category A",
      ),
      ...y(
        "2023",
        "Best Marketing Partner, Gold",
        "Best Aftersales Partner, Category A – Silver",
        "Excellence Award – Zero Escalation",
        "Highest Warranty Retail Sales Award",
      ),
      ...y("2022", "Best Audi Partner, Category A – Gold", "Best Marketing Partner, Silver", "Best Aftersales Partner, Category A – Silver"),
      ...y("2021", "Best Marketing Partner, Bronze", "Best Audi Partner, Category A – Silver", "Best Aftersales Partner, Category B – Bronze"),
      ...y("2019", "Luxury Car Dealer in Mumbai"),
    ],
  },
  {
    brand: "MG",
    logo: img("2026/03/MG-e1773753942960.png"),
    frameSide: "left",
    decorated: true,
    awards: [
      ...y("2023", "Most Profitable Partner"),
      ...y("2022", "Best in Retail Target Achievement", "SEWA Recognition Award", "Most Profitable Partner (Runner Up)"),
    ],
  },
];
