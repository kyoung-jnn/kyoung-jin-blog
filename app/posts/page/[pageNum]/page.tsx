import { Metadata } from 'next';
import ListLayout from '@/app/posts/page/[pageNum]/components/ListLayout';
import { getPosts } from '@/repository/notion';

import {
  defaultMetadata,
  defaultOpenGraph,
  defaultTwitterMetadata,
} from '@/database/metadata';
import { POSTS_PER_PAGE } from '@/database/posts';
import SITE_METADATA from '@/database/siteMetadata';
import GridLayout from '@/components/layout/GridLayout';

type Params = { pageNum: string };

export async function generateMetadata({
  params: { pageNum },
}: {
  params: Params;
}): Promise<Metadata> {
  return {
    ...defaultMetadata,
    title: `Articles | KyoungJin Roh`,
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
    <GridLayout>
      <ListLayout
        pagePosts={pagePosts}
        totalPage={totalPage}
        currentPage={currentPage}
        paginationLink="/posts/page"
      />
    </GridLayout>
  );
}
