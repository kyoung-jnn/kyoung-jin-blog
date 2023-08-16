import { ReactNode, useRef } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import MDXStyle from '@/styles/mdx-styles';
import Comment from '@/components/Comment';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import TOC from '@/components/TOC';
import { fadeUp } from '@/utils/animation';
import Image from '../Image';
import { dateToFormat } from '@/utils/time';
import media from '@/styles/media';

interface Props {
  title: string;
  date: string;
  thumbnail?: string;
  children: ReactNode;
}

function PostLayout({ title, date, thumbnail, children }: Props) {
  const updatedAt = dateToFormat(new Date(date));
  const commentContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Wrapper>
      {/* 본문 영역 */}
      <PostWrapper>
        <PostHeader>
          <h1 className="post-title">{title}</h1>
          <time className="post-date" dateTime={updatedAt}>
            {updatedAt}
          </time>
          {thumbnail && <Image src={thumbnail} alt="썸네일" auto priority />}
        </PostHeader>
        <PostContent>{children}</PostContent>
      </PostWrapper>
      {/* 목차 */}
      <PostSideBar>
        <TOC />
        <ScrollTopAndComment commentContainerRef={commentContainerRef} />
      </PostSideBar>
      {/* 스크롤 */}
      <PostFooter>
        {/* 댓글 영역 */}
        <div ref={commentContainerRef}>
          <Comment />
        </div>
        <Link href="/posts/page/1">&larr; 돌아가기</Link>
      </PostFooter>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(auto, 768px) minmax(auto, 240px);
  justify-content: center;
  align-items: start;
  gap: 10px;
  margin: 0 auto;
  padding: 10px;
  animation: ${fadeUp} 0.5s forwards;

  ${media.desktop} {
    padding: 50px 40px 40px;
    grid-template-columns: minmax(auto, 768px) minmax(auto, 320px);
  }
`;

const PostWrapper = styled.article`
  grid-column: 1 / 3;
  ${media.tablet} {
    grid-column: 1;
  }
`;

const PostHeader = styled.header`
  position: relative;
  padding: 20px 0;
  text-align: left;
  border-bottom: 1px solid #e5e5e5;

  .post-title {
    font-size: 34px;
    font-weight: 700;
    letter-spacing: -1.5px;
  }

  .post-date {
    font-size: 16px;
    font-weight: 400;
    color: var(--fontColor);
    margin-top: 00px;
  }
`;

const PostContent = styled.div`
  ${MDXStyle}
`;

const PostSideBar = styled.aside`
  position: relative;
  display: none;
  ${media.tablet} {
    display: block;
    position: sticky;
    top: 90px;
  }
`;

const PostFooter = styled.footer`
  grid-column: 1 / 3;
  margin-top: 30px;
  font-size: 16px;
  border-top: 1px solid #e5e5e5;
`;

export default PostLayout;
