import styled from '@emotion/styled';
import Link from 'next/link';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'div'> {
  totalPage: number;
  currentPage: number;
  link: string;
}

function Pagination({ link, totalPage, currentPage, ...attributes }: Props) {
  return (
    <PaginationContainer {...attributes}>
      <PaginationNav>
        <div className="prev" aria-label="prev page button">
          {currentPage !== 1 && (
            <Link href={`${link}/${currentPage - 1}`}>&larr;</Link>
          )}
        </div>
        <div className="center" aria-label="current page">
          {currentPage} of {totalPage}
        </div>
        <div className="next" aria-label="next page button">
          {currentPage !== totalPage && (
            <Link href={`${link}/${currentPage + 1}`}>&rarr;</Link>
          )}
        </div>
      </PaginationNav>
    </PaginationContainer>
  );
}

export default Pagination;

const PaginationContainer = styled.div`
  padding: 6px 0;
`;

const PaginationNav = styled.nav`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  color: var(--gray-13);
  font-size: 16px;

  .center {
    text-align: center;
  }

  .next {
    text-align: right;
  }
`;
