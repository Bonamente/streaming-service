/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.ytimg.com'],
  },
  optimizeFonts: false,
};

module.exports = nextConfig;
