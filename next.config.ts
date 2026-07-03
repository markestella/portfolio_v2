import type { NextConfig } from "next";

import withPWA from "next-pwa";

const withPWAConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
  },

  reactStrictMode: true,

  turbopack: {},
};

export default withPWAConfig(nextConfig);
