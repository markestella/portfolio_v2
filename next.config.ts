import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for Vercel optimization
  output: 'standalone',
  
  // Image optimization
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },

  // Strict mode for development
  reactStrictMode: true,
};

export default nextConfig;
