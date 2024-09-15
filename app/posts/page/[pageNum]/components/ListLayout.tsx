'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import ArticleCard from '@/components/ArticleCard';
import Pagination from '@/components/Pagination';
import useDebounce from '@/hooks/useDebounce';
import { PostProperty } from '@/types/notion';
import GridLayout from '../../../../../components/layout/GridLayout';
import { css } from '@emotion/react';
import Sidebar from '../../../../../components/Sidebar';
import IconButton from '@/components/IconButton';

interface Props {
  allPosts: PostProperty[];
  pagePosts: PostProperty[];
  totalPage: number;
  currentPage: number;
  paginationLink: string;
}

function ListLayout({
  allPosts,
  pagePosts,
  totalPage,
  currentPage,
  paginationLink,
}: Props) {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);

  const filteredBlogPosts = allPosts.filter(({ title, summary }) => {
    const searchContent = title + summary;

    return searchContent
      .toLowerCase()
      .includes(debouncedSearchValue.toLowerCase());
  });

  const displayPosts = searchValue ? filteredBlogPosts : pagePosts;

  return (
    <GridLayout>
      <Sidebar />
      <Wrapper>
        <HeroWrapper>
          <InputWrapper>
            <SearchInput
              aria-label="포스팅 검색 인풋"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="포스팅 검색"
            />
            <IconButton name="Search" />
          </InputWrapper>
        </HeroWrapper>
        {!filteredBlogPosts.length && (
          <NotFound>포스팅이 존재하지 않습니다...😖</NotFound>
        )}
        <ul>
          {displayPosts.map(({ title, date, slug }) => (
            <ArticleCard key={slug} title={title} date={date} slug={slug} />
          ))}
        </ul>
      </Wrapper>
      {displayPosts.length > 0 && (
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          link={paginationLink}
          css={css`
            grid-column: 2/3;
          `}
        />
      )}
    </GridLayout>
  );
}

export default ListLayout;

const Wrapper = styled.section`
  grid-column: 2/3;
`;

const HeroWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputWrapper = styled.div`
  position: relative;
  > .icon {
    position: absolute;
    top: 25%;
    right: 5px;
    width: 16px;
  }
`;

const SearchInput = styled.input`
  width: 200px;
  height: 30px;
  padding: 10px;
  outline: none;
  border: 1px solid var(--gray-8);
  border-radius: 3px;
  background-color: transparent;
  font-size: 14px;
  transition: border 0.5s;
  :focus {
    border: 1px solid var(--gray-12);
  }
  ::placeholder {
    font-size: 14px;
  }
`;

const NotFound = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
`;
