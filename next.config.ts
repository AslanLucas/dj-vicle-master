import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Next.js response compression active (gzip/brotli) for JS/CSS/assets.
  compress: true,
  images: {
    qualities: [70, 75, 90],
  },
};

export default nextConfig;
