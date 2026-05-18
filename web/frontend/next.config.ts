import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow all images for now
  reactCompiler: true,
  images: {
    unoptimized: true,
    domains: ["*"],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${process.env.API_URL}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
