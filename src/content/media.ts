/**
 * Every image and video used by the site lives in public/media, mirroring the
 * WordPress uploads paths (wp-content/uploads/<year>/<month>/<file>), and the
 * same tree is uploaded to the "gmg-website" Cloudflare R2 bucket. Set
 * NEXT_PUBLIC_MEDIA_BASE to the bucket's public URL to serve media from R2;
 * left unset, the local copy is used.
 */
export const MEDIA_BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE || "/media").replace(/\/+$/, "");

export type ImageAsset = { src: string; width: number; height: number };

// Intrinsic sizes, so next/image can reserve space and pick the right srcset.
const imageSizes: Record<string, [number, number]> = {
  "2026/01/Audi-removebg-preview.png": [843, 296],
  "2026/01/ChatGPT-Image-Aug-10-2026-03_47_11-PM.png": [1254, 1254],
  "2026/01/Gemini_Generated_Image_7gg8ml7gg8ml7gg8-e1767940396965.png": [1696, 2128],
  "2026/01/Untitled-design-1.png": [800, 400],
  "2026/01/Untitled-design-32.png": [1107, 993],
  "2026/01/WhatsApp-Image-2026-01-16-at-4.52.33-PM_cropped_processed_by_imagy-2.jpg": [683, 854],
  "2026/01/imgfx_20260108_125406_1.png": [928, 1120],
  "2026/02/Audi-Mumbai-West-1-scaled.jpeg": [2560, 1706],
  "2026/02/Brain-Box-Media-BBM-office.png": [1536, 1024],
  "2026/02/Hyundai-Santacruz-scaled.png": [2560, 1654],
  "2026/02/Hyundai-Service-Chunnabhatti-scaled.png": [2560, 1654],
  "2026/02/Hyundai-Service-and-sales-Wada-scaled.png": [2560, 1654],
  "2026/02/Hyundai-Thane-Service-scaled.png": [2560, 1654],
  "2026/02/Hyundai-Thane-Showroom-scaled.png": [2560, 1654],
  "2026/02/Hyundai-Vasai-Service-scaled.png": [2560, 1654],
  "2026/02/Hyundai-Vasai-Showroom-scaled.png": [2560, 1654],
  "2026/02/Hyundai-Virar-Service-scaled.png": [2560, 1654],
  "2026/02/Hyundai-Virar-Showroom-scaled.png": [2560, 1654],
  "2026/02/Hyundai-raghunath-nagar-service-scaled.png": [2560, 1654],
  "2026/02/MG-Sales-Malad.png": [1736, 1122],
  "2026/02/MG-Sales-Prabhadevi.png": [1736, 1122],
  "2026/02/MG-Service-Malad.png": [1736, 1122],
  "2026/02/MG-Vasai-Showroom.png": [1736, 1122],
  "2026/02/MG-sales-service-JVLR.png": [1736, 1122],
  "2026/02/Mahindra-thane-showoom-scaled.jpeg": [2560, 1440],
  "2026/02/btb.png": [1024, 1024],
  "2026/02/kia-shilphata.JPG-scaled.jpeg": [2560, 1703],
  "2026/02/office.png": [1536, 1024],
  "2026/03/Audi.png": [2000, 1000],
  "2026/03/GC-Automobile-1200-x-400-px-1.png": [1000, 300],
  "2026/03/GC-Automobile-1200-x-400-px-6.png": [696, 257],
  "2026/03/GC-Automobile.png": [2000, 1000],
  "2026/03/GMG-01-2.png": [369, 331],
  "2026/03/GMG-01.png": [369, 331],
  "2026/03/Hero_Honda.png": [2000, 1000],
  "2026/03/Krishvi-e1773836422240.png": [2000, 813],
  "2026/03/LML-e1773837072734.png": [1223, 857],
  "2026/03/MG-e1773753942960.png": [1127, 1000],
  "2026/03/MG.png": [2000, 1000],
  "2026/03/MG_SELECT.png": [1909, 383],
  "2026/03/Thinkarz-2-e1773836400492.png": [2000, 723],
  "2026/03/Untitled-design-12.png": [2000, 1000],
  "2026/03/Untitled-design-15.png": [2000, 1000],
  "2026/03/Untitled-design-17.png": [2000, 1000],
  "2026/03/Untitled-design-21.png": [200, 100],
  "2026/03/Untitled-design-22.png": [200, 100],
  "2026/03/Untitled-design-24-1.png": [2000, 1000],
  "2026/03/Untitled-design-24.png": [2000, 1000],
  "2026/03/Untitled-design-3.png": [625, 313],
  "2026/03/Untitled-design-30.png": [2000, 1000],
  "2026/03/Untitled-design-9.png": [2000, 1000],
  "2026/03/bbm_logo_white.png": [706, 218],
  "2026/03/charkop-_1_.png-scaled.jpg": [2560, 1707],
  "2026/03/mahindra-airoli-showroom.jpeg": [1065, 710],
  "2026/03/salomi.png": [1024, 1024],
  "2026/04/ChatGPT-Image-Apr-4-2026-06_05_04-PM.png": [1536, 1024],
  "2026/04/Mahindra-rise.png": [1000, 300],
  "2026/04/Sewri-workshop-image.png": [1536, 1024],
  "2026/04/Thinkarz-2.png": [2000, 1000],
  "2026/04/Untitled-design-31.png": [2000, 1000],
  "2026/04/Untitled-design-32.png": [2000, 1000],
  "2026/04/Untitled-design-33.png": [2000, 1000],
  "2026/04/WhatsApp-Image-2026-04-08-at-12.23.52-PM.jpeg": [680, 453],
  "2026/04/krishiv-office.png": [1536, 1024],
  "2026/05/Audi.png": [2000, 1000],
  "2026/05/GNP01423.JPG-scaled.jpeg": [2560, 1707],
  "2026/05/Hyundai.png": [2000, 1000],
  "2026/05/KIA.png": [2000, 1000],
  "2026/05/MG-select-mumbai.jpeg": [1536, 1024],
  "2026/05/MG3.png": [2000, 1000],
  "2026/05/MGSelect.png": [2000, 1000],
  "2026/05/Mahindra.png": [2000, 1000],
  "2026/05/cotton-green-service-center.jpeg": [1424, 1104],
  "2026/06/ml.JPG-scaled.jpeg": [2560, 1707],
  "2026/08/3f3d09a3-5034-479e-a30c-52cb23fdb51e.jpeg": [1600, 900],
  "2026/08/ChatGPT-Image-Aug-11-2026-03_53_09-PM.png": [1536, 1024],
  "2026/08/TESLA_APCC_Wht_Black-1024x355-1.webp": [1024, 355],
  "2026/08/WhatsApp-Image-2026-08-11-at-5.11.24-PM.jpeg": [1280, 853],
  "2026/08/WhatsApp-Image-2026-08-21-at-10.33.22-AM.jpeg": [1600, 900],
  "2026/careers-team.webp": [1920, 1280],
};

export function img(path: string): ImageAsset {
  const size = imageSizes[path];
  if (!size) throw new Error(`Unknown media image: ${path}`);
  return { src: `${MEDIA_BASE}/${path}`, width: size[0], height: size[1] };
}

/** A muted background clip plus its first frame, shown while the clip loads. */
export type VideoAsset = { src: string; poster: string };

/**
 * Clips are web-optimized MP4s (H.264, faststart, no audio); originals are kept
 * in media-originals/. Each has a first-frame `<name>.poster.webp` beside it.
 */
export function video(path: string): VideoAsset {
  return { src: `${MEDIA_BASE}/${path}`, poster: `${MEDIA_BASE}/${path.replace(/\.mp4$/, ".poster.webp")}` };
}
