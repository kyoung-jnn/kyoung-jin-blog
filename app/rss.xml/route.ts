import SITE_CONFIG from '@/database/siteConfig';
import SITE_METADATA from '@/database/siteMetadata';
import { getPosts } from '@/repository/notion';

import RSS from 'rss';

export const dynamic = 'force-dynamic';

export async function GET() {
  const posts = await getPosts();

  const feed = new RSS({
    title: SITE_CONFIG.title,
    description: SITE_METADATA.description,
    feed_url: `${SITE_METADATA.siteUrl}/rss.xml`,
    site_url: SITE_METADATA.siteUrl,
    image_url: `${SITE_METADATA.siteBanner}`,
    language: SITE_METADATA.locale,
    categories: ['Technologies'],
    copyright: 'All rights reserved 2023, KyoungJin Roh',
    generator: 'kyoung-jin-blog-rss-generate',
    pubDate: new Date(),
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.summary,
      url: `${SITE_METADATA.siteUrl}/posts/${post.slug}`,
      author: SITE_CONFIG.author.koName,
      date: new Date(post.date),
    });
  });

  const rss = feed.xml({ indent: true });

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8;',
    },
  });
}
