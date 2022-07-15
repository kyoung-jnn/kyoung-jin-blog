import styled from 'styled-components';
import Link from '@/components/CustomLink';

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  link: string;
}

export default function Pagination({
  link,
  totalPage,
  currentPage,
}: PaginationProps) {
  return (
    <PaginationContainer>
      <PaginationNav>
        <div className="prev" aria-label="prev page button">
          {currentPage !== 1 ? (
            <Link href={`${link}/${currentPage - 1}`}>
              &larr; Page {currentPage - 1}
            </Link>
          ) : (
            <span className="easter">Start 🌱</span>
          )}
        </div>
        <div className="center" aria-label="current page">
          {currentPage} of {totalPage}
        </div>
        <div className="next" aria-label="next page button">
          {currentPage !== totalPage ? (
            <Link href={`${link}/${currentPage + 1}`}>
              Page {currentPage + 1} &rarr;
            </Link>
          ) : (
            <span className="easter">End 🌳</span>
          )}
        </div>
      </PaginationNav>
    </PaginationContainer>
  );
}

const PaginationContainer = styled.div`
  padding: 6px 0;
`;

const PaginationNav = styled.nav`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  color: var(--text);
  font-weight: 700;
  font-size: 18px;

  .center {
    text-align: center;
  }

  .next {
    text-align: right;
  }

  .easter {
    transition: color 0.5s;
    &:hover {
      color: #27ae60;
    }
  }
`;
