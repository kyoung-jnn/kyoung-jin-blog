/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true, // SWC
  reactStrictMode: true,
  i18n: {
    locales: ['ko'],
    defaultLocale: 'ko',
  },
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'prod-files-secure.s3.us-west-2.amazonaws.com', // notion image
    ],
    imageSizes: [32, 96, 128],
    deviceSizes: [768, 1280, 1920],
  },
};

module.exports = nextConfig;
