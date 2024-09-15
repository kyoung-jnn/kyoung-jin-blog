import { getPosts } from '@/repository/notion';
import Menu from './components/Menu';
import Profile from './components/Profile';
import ArticleList from './components/ArticleList';
import SITE_METADATA from '@/database/siteMetadata';
import { Metadata } from 'next';
import { defaultMetadata, defaultOpenGraph } from '@/database/metadata';

const POSTS_HOME = 5;

export const metadata: Metadata = {
  ...defaultMetadata,
  title: `홈 | ${SITE_METADATA.title}`,
  openGraph: defaultOpenGraph,
};

export default async function HomePage() {
  const posts = await getPosts();
  const latestPosts = posts.slice(0, POSTS_HOME);

  return (
    <>
      <Profile />
      <Menu />
      <ArticleList latestPosts={latestPosts} />
    </>
  );
}
