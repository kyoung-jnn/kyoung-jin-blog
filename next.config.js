const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['ko'],
    defaultLocale: 'ko',
  },
};

module.exports = withContentlayer(nextConfig);
