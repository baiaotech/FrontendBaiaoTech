import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL,
    FORM_LINK: process.env.FORM_LINK
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
