import { useState } from 'react';
import styled from '@emotion/styled';
import PostCard from 'app/components/PostCard';
import Pagination from '@/components/Pagination';
import SearchIcon from '@/components/icons/Search';
import useDebounce from '@/hooks/useDebounce';
import { PostProperty } from '@/types/notion';
import GridLayout from './GridLayout';
import { css } from '@emotion/react';
import Sidebar from '../Sidebar';

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
          <h3>글 • article</h3>
          <InputWrapper>
            <SearchInput
              aria-label="포스팅 검색 인풋"
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
          {displayPosts.map(({ title, date, slug }) => (
            <PostCard key={slug} title={title} date={date} slug={slug} />
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
  border: 0.5px solid var(--text);
  background-color: transparent;
  transition: border 0.5s;
  font-size: 14px;
  :focus {
    border: 1px solid var(--focus-text);
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
