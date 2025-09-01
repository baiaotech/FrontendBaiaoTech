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
      { protocol: "https", hostname: "s3.sa-east-1.amazonaws.com" },
      { protocol: "https", hostname: "secure.meetupstatic.com" },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "wiki.hackerspaces.org" },
      { protocol: "https", hostname: "cdn1.telesco.pe" },
      { protocol: "https", hostname: "www.teresinahacker.club" },
      { protocol: "https", hostname: "se.python.org.br" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
