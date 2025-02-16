import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {

    domains: ['https://enatega-multivendor.up.railway.app/graphql'], // have to production domain here later 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
