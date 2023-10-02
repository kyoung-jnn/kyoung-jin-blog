import { useState } from 'react';
import styled from '@emotion/styled';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import SearchIcon from '@/components/icons/Search';
import useDebounce from '@/hooks/useDebounce';
import BREAK_POINTS from '@/constants/breakpoints';
import media from '@/styles/media';
import { ParsedPageProperties } from '@/types/notion';

interface Props {
  allPosts: ParsedPageProperties[];
  pagePosts: ParsedPageProperties[];
  totalPage: number;
  currentPage: number;
  title: string;
  paginationLink: string;
}

function ListLayout({
  allPosts,
  pagePosts,
  totalPage,
  currentPage,
  title,
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
    <Wrapper>
      <HeroWrapper>
        <Title>{title}</Title>
        <InputWrapper>
          <SearchInput
            aria-label="Search Post"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="포스팅 검색"
          />
          <SearchIcon className="icon" />
        </InputWrapper>
      </HeroWrapper>
      {!filteredBlogPosts.length && (
        <NotFound>포스팅이 존재하지 않습니다...😖</NotFound>
      )}
      <ul>
        {displayPosts.map(({ title, date, summary, slug }) => {
          return (
            <PostCard
              key={slug}
              title={title}
              date={date}
              summary={summary}
              slug={slug}
            />
          );
        })}
      </ul>
      {displayPosts.length > 0 && (
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          link={paginationLink}
        />
      )}
    </Wrapper>
  );
}

export default ListLayout;

const Wrapper = styled.div`
  position: relative;
  max-width: ${BREAK_POINTS.tablet + 'px'};
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;

  ${media.tablet} {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const HeroWrapper = styled.section`
  margin-top: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-top: 20px;

  > .icon {
    position: absolute;
    top: 25%;
    left: 270px;
    width: 20px;
    color: var(--focus-text);
  }
`;

const SearchInput = styled.input`
  width: 300px;
  height: 40px;
  padding: 10px;
  outline: none;
  border-radius: 5px;
  border: 2px solid var(--focus-bg);
  background-color: var(--bg);
  transition: border 0.5s;
  :focus {
    border: 2px solid var(--focus-text);
  }
`;

const NotFound = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
`;
