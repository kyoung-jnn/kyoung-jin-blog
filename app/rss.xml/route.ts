import RSS from 'rss';

import SITE_CONFIG from '@/database/config';
import { getPosts } from '@/repository/notion';


export const dynamic = 'force-dynamic';

export async function GET() {
  const posts = await getPosts();

  const feed = new RSS({
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    feed_url: `${SITE_CONFIG.siteUrl}/rss.xml`,
    site_url: SITE_CONFIG.siteUrl,
    image_url: `${SITE_CONFIG.siteBanner}`,
    language: SITE_CONFIG.locale,
    categories: ['Technologies'],
    copyright: 'All rights reserved 2023, KyoungJin Roh',
    generator: 'kyoung-jin-blog-rss-generate',
    pubDate: new Date(),
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.summary,
      url: `${SITE_CONFIG.siteUrl}/posts/${post.slug}`,
      author: SITE_CONFIG.author.name,
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
