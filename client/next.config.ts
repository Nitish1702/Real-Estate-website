import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8800/api/:path*", // Adjust the port as needed
      },
    ];
  },
};

export default nextConfig;
