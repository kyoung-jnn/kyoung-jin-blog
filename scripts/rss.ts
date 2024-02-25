import { getPosts } from '@/repository/notion';
import SITE_CONFIG from '../database/siteConfig';
import SITE_METADATA from '../database/siteMetadata';
import { Feed } from 'feed';

const generateRSS = async () => {
  const posts = await getPosts();

  const author = {
    name: SITE_CONFIG.author.enName,
    email: SITE_CONFIG.author.contacts.email,
    link: SITE_CONFIG.author.contacts.linkedin,
  };

  const feed = new Feed({
    title: SITE_CONFIG.title,
    description: SITE_METADATA.description,
    id: SITE_METADATA.siteUrl,
    link: SITE_METADATA.siteUrl,
    language: SITE_METADATA.locale,
    image: `${SITE_METADATA.siteBanner}`,
    favicon: `${SITE_METADATA.siteUrl}/favicon.ico`,
    copyright: 'All rights reserved 2023, Kyoung Jin, Roh',
    generator: 'generate-rss',
    feedLinks: {
      json: `${SITE_METADATA.siteUrl}/json`,
      atom: `${SITE_METADATA.siteUrl}/atom`,
    },
    author: author,
  });

  posts.forEach((post) => {
    feed.addItem({
      id: `${SITE_METADATA.siteUrl}/posts/${post.slug}`,
      link: `${SITE_METADATA.siteUrl}/posts/${post.slug}`,
      title: post.title,
      description: post.summary,
      image: post.thumbnail,
      content: post.summary,
      author: [author],
      contributor: [author],
      published: new Date(post.date),
      date: new Date(post.date),
      copyright: 'All rights reserved 2023, Kyoung Jin, Roh',
    });
  });

  feed.addCategory('Technologies');

  return feed;
};

export default generateRSS;
