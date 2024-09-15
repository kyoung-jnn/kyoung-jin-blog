import ArticleCard from '@/components/ArticleCard';
import Pagination from '@/components/Pagination';
import { PostProperty } from '@/types/notion';
import Sidebar from '../../../../../components/Sidebar';
import { List, Wrapper, title } from './ListLayout.css';
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
    <>
      <Sidebar />
      <div className={Wrapper}>
        <h1 className={title}>Articles</h1>
        <ul className={List}>
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
    </>
  );
}

export default ListLayout;
