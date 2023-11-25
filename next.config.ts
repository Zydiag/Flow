import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["files.edgestore.dev"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
};

export default nextConfig;
