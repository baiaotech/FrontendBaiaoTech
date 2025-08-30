// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // qualquer uma das duas abordagens funciona:

    // 1) simples
    // domains: ["i.ibb.co", "baiaotech.org", "api.baiaotech.org"],

    // 2) mais restritiva (recomendada)
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "baiaotech.org" },
      { protocol: "https", hostname: "api.baiaotech.org" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
