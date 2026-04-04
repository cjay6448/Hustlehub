import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "http",  hostname: "dimgrey-mule-669807.hostingersite.com" },
      { protocol: "https", hostname: "dimgrey-mule-669807.hostingersite.com" },
      { protocol: "http",  hostname: "wp.dimgrey-mule-669807.hostingersite.com" },
      { protocol: "https", hostname: "wp.dimgrey-mule-669807.hostingersite.com" },
    ],
  },
};

export default nextConfig;
