import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: "http",  hostname: "dimgrey-mule-669807.hostingersite.com" },
      { protocol: "https", hostname: "dimgrey-mule-669807.hostingersite.com" },
      { protocol: "http",  hostname: "hustlehub.ca" },
      { protocol: "https", hostname: "hustlehub.ca" },
    ],
  },
};

export default nextConfig;
