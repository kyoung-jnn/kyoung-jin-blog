import { getPosts } from '@/repository/notion';
import Menu from './components/Menu';
import Profile from './components/Profile';
import ArticleList from './components/ArticleList';
import SITE_CONFIG from '@/database/config';
import { Metadata } from 'next';
import { METADATA, OPEN_GRAPH } from '@/database/metadata';

const POSTS_HOME = 7;

export const metadata: Metadata = {
  ...METADATA,
  title: `Home • ${SITE_CONFIG.title}`,
  openGraph: OPEN_GRAPH,
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
