import { ReactNode, useRef } from 'react';
import styled from 'styled-components';
import Link from '@/components/CustomLink';
import MDXStyle from '@/styles/mdx-styles';
import BreakPoints from '@/constants/breakpoints';
import Comment from '@/components/Comment';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import TOC from '@/components/TOC';
import { fadeIn } from '@/utils/animation';
import Image from '../Image';
import { dateToFormat } from '@/utils/time';

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
    <>
      <TOC />
      <Wrapper>
        <PostHeader>
          <time className="post-date" dateTime={updatedAt}>
            {updatedAt}
          </time>
          <h1 className="post-title">{title}</h1>
          {thumbnail && <Image src={thumbnail} alt="썸네일" auto priority />}
        </PostHeader>
        <PostWrapper>
          {/* 본문 영역 */}
          <PostBody>{children}</PostBody>
          <PostFooter>
            {/* 댓글 영역 */}
            <div ref={commentContainerRef}>
              <Comment />
            </div>
            <Link href="/posts/page/1">&larr; 돌아가기</Link>
          </PostFooter>
          <ScrollTopAndComment commentContainerRef={commentContainerRef} />
        </PostWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.article`
  animation: ${fadeIn} 0.5s forwards;
`;

const PostHeader = styled.header`
  position: relative;
  padding: 20px 0;
  text-align: center;

  .post-date {
    font-size: 20px;
    font-weight: 400;
    color: var(--fontColor);
    margin-bottom: 10px;
  }

  .post-title {
    font-size: 36px;
    font-weight: 700;
    letter-spacing: -1.5px;
    margin-top: 20px;
  }
`;

const PostWrapper = styled.div`
  position: relative;
  max-width: ${BreakPoints.tablet + 'px'};
  padding-bottom: 20px;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
`;

const PostBody = styled.div`
  ${MDXStyle}
`;

const PostFooter = styled.footer`
  margin-top: 30px;
  font-size: 16px;
  border-top: 1px solid #e5e5e5;
`;

export default PostLayout;
