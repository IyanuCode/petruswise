import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    domains: ['res.cloudinary.com'],
  },
  /* config options here */

  // 🚫 Temporary: disable ESLint checks during Vercel build
  // This prevents Vercel from blocking deployment due to ESLint errors or warnings.
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;
