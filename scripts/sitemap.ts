import { POSTS_PER_PAGE } from 'pages/posts/page/[page]';
import { getPosts } from '@/repository/notion';
import SITE_METADATA from '../database/siteMetadata';

const DEFAULT_SLUG = ['', 'gallery'] as const;

const generateSitemap = async () => {
  const posts = await getPosts();

  const template = (
    dynamicSitemaps: string,
  ) => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${dynamicSitemaps}
  </urlset>`;

  const defaultSitemaps = DEFAULT_SLUG.map(
    (slug) =>
      `<url><loc>${
        SITE_METADATA.siteUrl
      }/${slug}</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
  );

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pageSitemaps = Array.from(
    { length: totalPages },
    (_, index) =>
      `<url><loc>${SITE_METADATA.siteUrl}/posts/page/${
        index + 1
      }</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
  );

  const postSitemaps = posts.map(
    ({ slug, date }) =>
      `<url><loc>${
        SITE_METADATA.siteUrl
      }/posts/${slug}</loc><lastmod>${new Date(
        date,
      ).toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
  );

  return template(
    [...defaultSitemaps, ...pageSitemaps, ...postSitemaps].join(''),
  );
};

export default generateSitemap;
