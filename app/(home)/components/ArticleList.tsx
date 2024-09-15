import React from 'react';
import ArticleCard from '@/components/ArticleCard';
import { wrapper } from './ArticleList.css';
import Link from 'next/link';
import { PostProperty } from '@/types/notion';

function ArticleList({ latestPosts }: { latestPosts: PostProperty[] }) {
  return (
    <section className={wrapper}>
      <ul>
        {!latestPosts.length && '포스팅이 존재하지 않습니다. 🥹'}
        {latestPosts.map(({ title, date, slug }) => {
          return (
            <li key={slug}>
              <ArticleCard title={title} date={date} slug={slug} />
            </li>
          );
        })}
      </ul>
      <Link href="/posts/page/1" aria-label="모든 포스팅 보기 버튼">
        전체보기
      </Link>
    </section>
  );
}

export default ArticleList;
