import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
