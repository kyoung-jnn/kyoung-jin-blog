import { PropsWithChildren, useRef } from 'react';
import styled from '@emotion/styled';

import Comment from '@/components/Comment';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import { fadeUp } from '@/utils/animation';
import Image from 'next/image';
import { dateToFormat } from '@/utils/time';
import media from '@/styles/media';
import TOC from '../TOC';
import { useRouter } from 'next/router';
import ArrowBack from '../icons/ArrowBack';
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
  const router = useRouter();
  const updatedAt = dateToFormat(new Date(date));
  const commentContainerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Wrapper>
        {/* 사이드바 */}
        <PostSideBar>
          <ArrowBack
            width={20}
            height={20}
            onClick={() => router.back()}
            css={css`
              cursor: pointer;
            `}
          />
          <TOC />
        </PostSideBar>
        {/* 본문 영역 */}
        <PostWrapper>
          <PostHeader>
            <h1 className="post-title">{title}</h1>
            <time className="post-date" dateTime={updatedAt}>
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
      </Wrapper>
      {/* 스크롤 */}
      <ScrollTopAndComment commentContainerRef={commentContainerRef} />
    </>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin-top: 50px;

  ${media.tablet} {
    display: grid;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    grid-template-columns: 192px minmax(auto, 640px) 192px;
  }

  ${media.desktop} {
    display: grid;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    grid-template-columns: 192px 640px 192px;
  }
`;

const PostWrapper = styled.article`
  animation: ${fadeUp} 0.5s forwards;
  grid-column: 2/3;
`;

const PostHeader = styled.header`
  margin-bottom: 20px;
  text-align: left;

  .post-title {
    font-size: 34px;
    font-weight: 700;
    letter-spacing: -1.5px;
  }

  .post-date {
    display: block;
    font-size: 18px;
    font-weight: 400;
    margin-top: 15px;
    color: var(--text-color);
  }
`;

const PostThumbnail = styled.figure`
  margin: 0;
  margin-top: 10px;

  > img {
    position: relative !important;
  }
`;

const PostSideBar = styled.aside`
  position: relative;
  display: none;
  flex-shrink: 0;
  ${media.desktop} {
    position: sticky;
    display: grid;
    gap: 20px;
    top: 90px;
  }
`;

const PostFooter = styled.footer`
  grid-column: 2/3;
  padding-top: 30px;
  font-size: 18px;
  border-top: 1px solid #e5e5e5;
`;

export default PostLayout;
