import { getPosts } from '@/repository/notion';
import HomeClientPage from './components/HomeClientPage';
import Profile from './components/Profile';
import Articles from './components/Articles';
import SITE_METADATA from '@/database/siteMetadata';
import { Metadata } from 'next';
import { defaultMetadata, defaultOpenGraph } from '@/constants/metadata';

const POSTS_HOME = 5;

export const metadata: Metadata = {
  ...defaultMetadata,
  title: `Home | ${SITE_METADATA.title}`,
  openGraph: defaultOpenGraph,
};

export default async function HomePage() {
  const posts = await getPosts();
  const latestPosts = posts.slice(0, POSTS_HOME);

  return (
    <>
      <Profile />
      <HomeClientPage />
      <Articles latestPosts={latestPosts} />
    </>
  );
}
