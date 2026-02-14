import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.force.com",
      },
      {
        protocol: "https",
        hostname: "**.salesforce.com",
      },
      {
        protocol: "https",
        hostname: "**.salesforce-sites.com",
      },
    ],
  },
};

export default nextConfig;
