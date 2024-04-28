/** @type {import('next').NextConfig} */

const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
  swcMinify: true, // SWC
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'prod-files-secure.s3.us-west-2.amazonaws.com', // notion image
    ],
    imageSizes: [32, 96, 128],
    deviceSizes: [768, 1280, 1920],
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
  compiler: {
    emotion: {
      autoLabel: 'always',
      labelFormat: '[filename]-[local]',
      cssPropOptimization: false,
    },
  },
  async rewrites() {
    return [
      {
        source: '/rss',
        destination: '/api/rss',
      },
      {
        source: '/rss.xml',
        destination: '/api/rss',
      },
      {
        source: '/sitemap',
        destination: '/api/sitemap',
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
};

module.exports = withVanillaExtract(nextConfig);
