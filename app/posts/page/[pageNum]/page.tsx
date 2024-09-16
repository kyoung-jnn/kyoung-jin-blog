import { Metadata } from 'next';
import ListLayout from '@/app/posts/page/[pageNum]/components/ListLayout';
import { getPosts } from '@/repository/notion';

import { META_DATA, OPEN_GRAPH, META_DATA_TWITTER } from '@/database/metadata';
import { POSTS_PER_PAGE } from '@/database/posts';
import SITE_CONFIG from '@/database/config';

type Params = { pageNum: string };

export async function generateMetadata({
  params: { pageNum },
}: {
  params: Params;
}): Promise<Metadata> {
  return {
    ...META_DATA,
    title: `Articles | KyoungJin Roh`,
    openGraph: {
      ...OPEN_GRAPH,
      url: `${SITE_CONFIG.siteUrl}/posts/page/${pageNum}`,
    },
    twitter: {
      ...META_DATA_TWITTER,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, index) => ({
    page: (index + 1).toString(),
  }));

  return paths;
}

export default async function Page({
  params: { pageNum },
}: {
  params: Params;
}) {
  const allPosts = await getPosts();

  const totalPage = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const currentPage = parseInt(pageNum);

  if (isNaN(currentPage) || currentPage <= 0 || currentPage > totalPage) {
    return {
      notFound: true,
    };
  }

  const pagePosts = allPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage,
  );

  return (
    <ListLayout
      pagePosts={pagePosts}
      totalPage={totalPage}
      currentPage={currentPage}
      paginationLink="/posts/page"
    />
  );
}
