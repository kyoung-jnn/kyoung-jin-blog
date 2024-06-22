'use client';

import { PropsWithChildren, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import smoothscroll from 'smoothscroll-polyfill'; // Safari 에서 smooth 효과 적용

import Comment from '@/components/Comment';
import { fadeLeft, fadeUp } from '@/utils/animation';
import Image from 'next/image';
import { dateToFormat } from '@/utils/time';
import TOC from '../../../../components/TOC';
import Sidebar from '../../../../components/Sidebar';
import GridLayout from '../../../../components/layout/GridLayout';
import { css } from '@emotion/react';
import ArrowUpIcon from '../../../../components/icons/ArrowUpIcon';
import MessageIcon from '../../../../components/icons/MessageIcon';

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

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToComment = () => {
    if (commentContainerRef.current)
      commentContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
  };

  return (
    <GridLayout>
      {/* 사이드바 */}
      <Sidebar>
        <TOC />
        <div
          css={css`
            display: flex;
            gap: 6px;
            opacity: 0;
            animation: ${fadeLeft} 500ms 500ms forwards;
          `}
        >
          <ArrowUpIcon width={20} height={20} onClick={handleScrollToTop} />
          <MessageIcon width={20} height={20} onClick={handleScrollToComment} />
        </div>
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
  );
}

const PostWrapper = styled.main`
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
