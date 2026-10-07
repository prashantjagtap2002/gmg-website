import type { NextConfig } from "next";

// When media is served from R2 (see src/content/media.ts), next/image must be allowed to fetch it.
const mediaBase = process.env.NEXT_PUBLIC_MEDIA_BASE?.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: mediaBase ? [new URL(`${mediaBase}/**`)] : [],
  },
};

export default nextConfig;
