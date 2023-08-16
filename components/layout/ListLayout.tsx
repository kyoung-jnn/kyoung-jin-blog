import { useState } from 'react';
import styled from '@emotion/styled';
import { Post } from 'contentlayer/generated';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import SearchIcon from '@/components/icons/search';
import useDebounce from '@/hooks/useDebounce';
import BREAK_POINTS from '@/constants/breakpoints';
import media from '@/styles/media';

interface Props {
  allPosts: Array<Post>;
  pagePosts: Array<Post>;
  totalPage: number;
  currentPage: number;
  title: string;
  paginationLink: string;
}

export default function ListLayout({
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
      <PostListTitleSection>
        <PostListTitle>{title}</PostListTitle>
        <SearchInputWrapper>
          <SearchInput
            aria-label="Search Post"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="포스팅 검색"
          />
          <SearchIcon className="icon" />
        </SearchInputWrapper>
      </PostListTitleSection>
      {!filteredBlogPosts.length && (
        <div className="not-post">포스팅이 없습니다...😖</div>
      )}
      <ul>
        {displayPosts.map(({ title, date, summary, _raw }) => {
          const slug = _raw.flattenedPath.split('/')[2];

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

const PostListTitleSection = styled.section`
  margin-top: 40px;
`;

const PostListTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
`;

const SearchInputWrapper = styled.div`
  position: relative;

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
