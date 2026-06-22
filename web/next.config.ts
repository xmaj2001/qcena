import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow all images for now
  typescript: {
    ignoreBuildErrors: true,
  },
  reactCompiler: true,
  images: {
    unoptimized: true,
    domains: ["*"],
  },
};

export default nextConfig;
