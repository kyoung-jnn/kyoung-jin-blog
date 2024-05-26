import React from 'react';
import PostCard from '@/components/PostCard';
import { wrapper } from './Articles.css';
import Link from 'next/link';
import { PostProperty } from '@/types/notion';

function Articles({ latestPosts }: { latestPosts: PostProperty[] }) {
  return (
    <section className={wrapper}>
      <ul>
        {!latestPosts.length && '포스팅이 존재하지 않습니다. 🥹'}
        {latestPosts.map(({ title, date, slug }) => {
          return (
            <li key={slug}>
              <PostCard title={title} date={date} slug={slug} />
            </li>
          );
        })}
      </ul>
      <Link href="/posts/page/1" aria-label="모든 포스팅 보기 버튼">
        모두보기
      </Link>
    </section>
  );
}

export default Articles;
