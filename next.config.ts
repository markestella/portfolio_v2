import type { NextConfig } from "next";

import withPWA from 'next-pwa';

const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
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

  // Add empty turbopack config to silence the error
  turbopack: {},
};

module.exports = withPWAConfig(nextConfig);
export default nextConfig;
