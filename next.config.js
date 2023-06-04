const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true, // Terser가 아닌 SWC
  reactStrictMode: true,
  i18n: {
    locales: ['ko'],
    defaultLocale: 'ko',
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
    imageSizes: [32, 96, 128],
    deviceSizes: [768, 1280, 1920],
  },
};

module.exports = withContentlayer(nextConfig);
