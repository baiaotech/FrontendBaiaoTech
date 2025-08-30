import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "baiaotech.org" },
      { protocol: "https", hostname: "api.baiaotech.org" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
