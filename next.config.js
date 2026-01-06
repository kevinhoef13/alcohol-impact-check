/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Capacitor compatibility
  trailingSlash: true,
  // Ensure static generation for PWA
  reactStrictMode: true,
};

module.exports = nextConfig;
