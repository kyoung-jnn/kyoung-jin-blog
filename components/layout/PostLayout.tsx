import { PropsWithChildren, useRef } from 'react';
import styled from '@emotion/styled';

import Comment from '@/components/Comment';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import { fadeUp } from '@/utils/animation';
import Image from 'next/image';
import { dateToFormat } from '@/utils/time';
import TOC from '../TOC';
import Sidebar from '../SideBar';
import GridLayout from './GridLayout';
import { css } from '@emotion/react';

interface Props {
  title: string;
  date: string;
  thumbnail?: string;
}

function PostLayout({
  title,
  date,
  thumbnail,
  children,
}: PropsWithChildren<Props>) {
  const updatedAt = dateToFormat(new Date(date));
  const commentContainerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <GridLayout>
        {/* 사이드바 */}
        <Sidebar>
          <TOC />
        </Sidebar>
        {/* 본문 영역 */}
        <PostWrapper>
          <PostHeader>
            <h1
              css={css`
                font-size: 25px;
                font-weight: 700;
                letter-spacing: -1px;
              `}
            >
              {title}
            </h1>
            <time
              dateTime={updatedAt}
              css={css`
                display: block;
                font-size: 16px;
                margin-top: 10px;
                color: var(--text-color);
              `}
            >
              {updatedAt}
            </time>
            {thumbnail && (
              <PostThumbnail>
                <Image src={thumbnail} alt="post thumbnail" fill priority />
              </PostThumbnail>
            )}
          </PostHeader>
          {children}
        </PostWrapper>
        <PostFooter>
          {/* 댓글 영역 */}
          <section ref={commentContainerRef}>
            <Comment />
          </section>
        </PostFooter>
      </GridLayout>
      {/* 스크롤 */}
      <ScrollTopAndComment commentContainerRef={commentContainerRef} />
    </>
  );
}

const PostWrapper = styled.article`
  animation: ${fadeUp} 0.5s forwards;
  grid-column: 2/3;
`;

const PostHeader = styled.header`
  margin-bottom: 20px;
  text-align: left;
`;

const PostThumbnail = styled.figure`
  margin: 0;
  margin-top: 10px;

  > img {
    position: relative !important;
  }
`;

const PostFooter = styled.footer`
  grid-column: 2/3;
  padding-top: 30px;
  font-size: 18px;
  border-top: 1px solid #e5e5e5;
`;

export default PostLayout;
