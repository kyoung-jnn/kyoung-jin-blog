import ArticleCard from '@/components/ArticleCard';
import Pagination from '@/components/Pagination';
import { PostProperty } from '@/types/notion';
import Sidebar from '../../../../../components/Sidebar';
import * as styles from './ListLayout.css';
import Link from 'next/link';

interface Props {
  pagePosts: PostProperty[];
  totalPage: number;
  currentPage: number;
  paginationLink: string;
}

function ListLayout({
  pagePosts,
  totalPage,
  currentPage,
  paginationLink,
}: Props) {
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
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          link={paginationLink}
        />
      )}
    </div>
  );
}

export default ListLayout;
