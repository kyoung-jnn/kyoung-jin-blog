import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';

interface Props {
  title: string;
  date: string;
  slug: string;
}

function PostCard({ title, date, slug }: Props) {
  return (
    <Wrapper>
      <Link href={`/posts/${slug}`}>
        <h2
          css={css`
            font-size: 16px;
            font-weight: 500;
            margin-top: 0;
          `}
        >
          {title}
        </h2>
        <time
          dateTime={date}
          css={css`
            font-size: 14px;
            font-weight: 200;
            margin-top: 5px;
          `}
        >
          {date}
        </time>
      </Link>
    </Wrapper>
  );
}

export default PostCard;

const Wrapper = styled.li`
  display: block;
  padding: 16px 0;
  transition: opacity 0.2s;
  :hover {
    opacity: 0.7;
  }
`;
