// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default nextConfig;
