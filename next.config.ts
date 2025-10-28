import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'videotilehost.com',
        pathname: '/common/course-icons/**',
      },
    ],
  },
};

export default nextConfig;
