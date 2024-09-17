import Link from 'next/link';

import IconButton from './IconButton';
import { wrapper } from './Pagination.css';

interface Props {
  totalPage: number;
  currentPage: number;
}

function Pagination({ totalPage, currentPage }: Props) {
  return (
    <nav className={wrapper}>
      {currentPage !== 1 ? (
        <Link href={`/posts/page/${currentPage - 1}`}>
          <IconButton name="ArrowLeft" aria-label="prev page button" />
        </Link>
      ) : (
        <span />
      )}
      <div className="center" aria-label="current page">
        {currentPage} of {totalPage}
      </div>
      {currentPage !== totalPage ? (
        <Link href={`/posts/page/${currentPage + 1}`}>
          <IconButton name="ArrowRight" aria-label="next page button" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

export default Pagination;
