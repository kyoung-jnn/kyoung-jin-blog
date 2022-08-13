import { ReactNode, useRef } from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import Link from '@/components/CustomLink';
import MDXStyle from '@/styles/mdx-styles';
import BreakPoints from '@/constants/breakpoints';
import Comment from '@/components/Comment';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';

interface PostLayoutProps {
  title: string;
  date: string;
  children: ReactNode;
}

function PostLayout({ title, date, children }: PostLayoutProps) {
  const updatedAt = format(new Date(date), 'yyyy-MM-dd');
  const commentContainerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <article>
        <PostHeader>
          <div className="post-date">
            <time dateTime={updatedAt}>{updatedAt}</time>
          </div>
          <div className="post-title">{title}</div>
        </PostHeader>
        <PostWrapper>
          {/* 본문 영역 */}
          <PostBody>{children}</PostBody>
          {/* 댓글 영역 */}
          <div ref={commentContainerRef}>
            <Comment />
          </div>
          <PostFooter>
            <Link href="/posts/page/1">&larr; 돌아가기</Link>
          </PostFooter>
          <ScrollTopAndComment commentContainerRef={commentContainerRef} />
        </PostWrapper>
      </article>
    </>
  );
}

const PostHeader = styled.header`
  padding: 20px 0;
  text-align: center;

  .post-date {
    font-size: 20px;
    font-weight: 300;
    color: var(--fontColor);
    margin-bottom: 10px;
  }

  .post-title {
    font-size: 40px;
    font-weight: 900;
    letter-spacing: -1.5px;
  }
`;

const PostWrapper = styled.div`
  position: relative;
  max-width: ${BreakPoints.tablet + 'px'};
  padding: 20px 0;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
`;

const PostBody = styled.div`
  ${MDXStyle}
`;

const PostFooter = styled.footer`
  padding-top: 30px;
  font-size: 16px;
`;

export default PostLayout;
