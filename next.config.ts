import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {

    domains: ['http://localhost:3000'], // have to production domain here later 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
