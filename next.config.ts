import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
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

module.exports = withPWA(nextConfig);
export default nextConfig;
