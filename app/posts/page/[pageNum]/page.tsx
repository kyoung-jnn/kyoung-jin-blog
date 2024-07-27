import { Metadata } from 'next';
import ListLayout from '@/components/layout/ListLayout';
import { getPosts } from '@/repository/notion';

import {
  defaultMetadata,
  defaultOpenGraph,
  defaultTwitterMetadata,
} from '@/database/metadata';
import { POSTS_PER_PAGE } from '@/database/post';
import SITE_METADATA from '@/database/siteMetadata';

type Params = { pageNum: string };

export async function generateMetadata({
  params: { pageNum },
}: {
  params: Params;
}): Promise<Metadata> {
  return {
    ...defaultMetadata,
    title: `글 목록 | Kyoung Jin, Roh`,
    openGraph: {
      ...defaultOpenGraph,
      url: `${SITE_METADATA.siteUrl}/posts/page/${pageNum}`,
    },
    twitter: {
      ...defaultTwitterMetadata,
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
  const posts = await getPosts();

  const totalPage = Math.ceil(posts.length / POSTS_PER_PAGE);
  const currentPage = parseInt(pageNum);

  if (isNaN(currentPage) || currentPage <= 0 || currentPage > totalPage) {
    return {
      notFound: true,
    };
  }

  const pagePosts = posts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage,
  );

  return (
    <ListLayout
      allPosts={posts}
      pagePosts={pagePosts}
      totalPage={totalPage}
      currentPage={currentPage}
      paginationLink="/posts/page"
    />
  );
}
