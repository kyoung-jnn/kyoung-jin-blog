import { PropsWithChildren, useRef } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import Comment from '@/components/Comment';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import { fadeUp } from '@/utils/animation';
import Image from 'next/image';
import { dateToFormat } from '@/utils/time';
import media from '@/styles/media';
import TOC from '../TOC';
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
      <Wrapper>
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
        {/* 사이드바 */}
        <PostSideBar>
          <TOC />
        </PostSideBar>
        <PostFooter>
          {/* 댓글 영역 */}
          <section ref={commentContainerRef}>
            <Comment />
          </section>
          <section
            css={css`
              margin-top: 30px;
            `}
          >
            <Link href="/posts/page/1">🤚 그만보기</Link>
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
  padding: 60px 10px;

  ${media.desktop} {
    display: grid;
    justify-content: center;
    align-items: start;
    gap: 10px;
    padding: 60px;
    grid-template-columns: minmax(auto, 320px) minmax(auto, 768px) 320px;
  }
`;

const PostWrapper = styled.article`
  animation: ${fadeUp} 0.5s forwards;
  grid-column: 2/3;
`;

const PostHeader = styled.header`
  padding-bottom: 30px;
  margin-bottom: 20px;
  text-align: left;
  border-bottom: 1px solid #e5e5e5;

  .post-title {
    font-size: 36px;
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
    display: block;
    position: sticky;
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
