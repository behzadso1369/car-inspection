import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '45.139.11.225',
        port: '5533',
        pathname: '/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
