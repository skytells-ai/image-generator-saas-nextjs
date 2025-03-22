import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.skytells.ai', 'skytells-ai.s3.us-east-1.amazonaws.com', 'storage.skytells.ai', 'api.skytells.ai', 'skytells.ai', 'localhost'],
  },
  reactStrictMode: true,
};

export default nextConfig;
