import { MetadataRoute } from 'next';

import SITE_CONFIG from '@/database/config';
import { POSTS_PER_PAGE } from '@/database/posts';
import { getPosts } from '@/repository/notion';


const DEFAULT_SLUG = ['', 'gallery'] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const totalPageCount = Math.ceil(posts.length / POSTS_PER_PAGE);

  const defaultSitemap: MetadataRoute.Sitemap = DEFAULT_SLUG.map((slug) => ({
    url: `${SITE_CONFIG.siteUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  }));

  const pageSitemap: MetadataRoute.Sitemap = Array.from(
    { length: totalPageCount },
    (_, index) => ({
      url: `${SITE_CONFIG.siteUrl}/posts/page/${index + 1}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }),
  );

  const postSitemap: MetadataRoute.Sitemap = posts.map(({ slug, date }) => ({
    url: `${SITE_CONFIG.siteUrl}/posts/${slug}`,
    lastModified: new Date(date),
    changeFrequency: 'weekly',
    priority: 1,
  }));

  return [...defaultSitemap, ...pageSitemap, ...postSitemap];
}
