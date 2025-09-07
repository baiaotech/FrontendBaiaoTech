// next.config.mjs
import { networkInterfaces } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  allowedDevOrigins: (() => {
    const origins = [
      'localhost',
      '127.0.0.1',
      '0.0.0.0'
    ];

    try {
      const nets = networkInterfaces();
      for (const name of Object.keys(nets)) {
        const net = nets[name];
        if (net) {
          for (const netInfo of net) {
            if (netInfo.family === 'IPv4' && !netInfo.internal) {
              origins.push(netInfo.address);
            }
          }
        }
      }
    } catch (error) {
      origins.push(
        '192.168.18.77',
        '192.168.1.1',
        '192.168.0.1',
        '10.0.0.1',
        '172.16.0.1'
      );
    }

    return [...new Set(origins)];
  })(),
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
