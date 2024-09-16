import ArticleCard from '@/components/ArticleCard';
import * as styles from './ArticleList.css';
import Link from 'next/link';
import { PostProperty } from '@/types/notion';

function ArticleList({ latestPosts }: { latestPosts: PostProperty[] }) {
  return (
    <section className={styles.wrapper}>
      <ul className={styles.list}>
        {!latestPosts.length && '포스팅이 존재하지 않습니다. 🥹'}
        {latestPosts.map(({ title, date, slug }) => {
          return (
            <li key={slug}>
              <Link href={`/posts/${slug}`}>
                <ArticleCard title={title} date={date} />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ArticleList;
