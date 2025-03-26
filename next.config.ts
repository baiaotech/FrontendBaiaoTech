import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL,
    FORM_LINK: process.env.FORM_LINK,
    COMMUNITY_API_URL: process.env.COMMUNITY_API_URL
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'frontendday.descompliqueapps.com.br',
      },
    ],
  },
};

export default nextConfig;
