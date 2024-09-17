
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

import ArticleCard from '@/components/ArticleCard';
import Pagination from '@/components/Pagination';
import Sidebar from '@/components/Sidebar';

import SITE_CONFIG from '@/database/config';
import { METADATA, OPEN_GRAPH, METADATA_TWITTER } from '@/database/metadata';
import { POSTS_PER_PAGE } from '@/database/posts';
import { getPosts } from '@/repository/notion';

import * as styles from './page.css';

type Params = { pageNum: string };

export async function generateMetadata({
  params: { pageNum },
}: {
  params: Params;
}): Promise<Metadata> {
  return {
    ...METADATA,
    title: `Articles | KyoungJin Roh`,
    openGraph: {
      ...OPEN_GRAPH,
      url: `${SITE_CONFIG.siteUrl}/posts/page/${pageNum}`,
    },
    twitter: {
      ...METADATA_TWITTER,
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
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.content}>
        <h1 className={styles.title}>Articles</h1>
        <ul className={styles.list}>
          {pagePosts.map(({ title, date, slug }) => (
            <li key={slug}>
              <Link href={`/posts/${slug}`}>
                <ArticleCard key={slug} title={title} date={date} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {pagePosts.length > 0 && (
        <Pagination totalPage={totalPage} currentPage={currentPage} />
      )}
    </div>
  );
}
