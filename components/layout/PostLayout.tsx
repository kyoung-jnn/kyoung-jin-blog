import { ReactNode, useRef } from 'react';
import { format } from 'date-fns';
import Link from '@/components/CustomLink';
import SectionContainer from '@/components/SectionContainer';
import Image from '@/components/Image';
import siteConfig from '@/database/siteConfig';
import Profile from '@/public/profile.webp';
import styled from 'styled-components';
import BreakPoints from '@/constants/breakpoints';
import 'highlight.js/styles/atom-one-dark.css';

interface PostLayoutProps {
  title: string;
  date: string;
  children: ReactNode;
}

function PostLayout({ title, date, children }: PostLayoutProps) {
  const updatedAt = format(new Date(date), 'yyyy-MM-dd');
  const commentContainerRef = useRef<HTMLDivElement>(null);

  return (
    <SectionContainer>
      {/* <ScrollTopAndComment commentContainerRef={commentContainerRef} /> */}
      <article>
        <PostHeader>
          <div className="post-date">
            <time dateTime={updatedAt}>{updatedAt}</time>
          </div>
          <div className="post-title">{title}</div>
        </PostHeader>
        <PostWrapper>
          {/*  <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  <li
                    className="flex items-center space-x-2"
                    key={siteConfig.author.name}
                  >
                    <Image
                      src={Profile}
                      width="60px"
                      height="60px"
                      alt="avatar"
                      className="h-10 w-10 rounded-full"
                    />
                    <dl className="whitespace-nowrap font-medium leading-6 text-lg pl-3 md:text-xl">
                      <dt className="sr-only">Name</dt>
                      <dd className="text-gray-900 dark:text-gray-100">
                        {siteConfig.author.name}
                      </dd>
                    </dl>
                  </li>
                </ul>
              </dd>
            </dl> */}
          {/* 본문 영역 */}
          <div>{children}</div>
          {/* 댓글 영역 */}
          {/*  <div ref={commentContainerRef}>
                <Comment />
              </div> */}
          <PostFooter>
            <Link href="/posts/page/1" className="back-link">
              &larr; 돌아가기
            </Link>
          </PostFooter>
        </PostWrapper>
      </article>
    </SectionContainer>
  );
}

const PostHeader = styled.header`
  padding: 20px 0;
  text-align: center;

  .post-date {
    font-size: 20px;
    color: var(--fontColor);
    margin-bottom: 10px;
  }

  .post-title {
    font-size: 40px;
    font-weight: 900;
    letter-spacing: -1.5px;
  }
`;

const PostFooter = styled.footer`
  padding-top: 10px;
  font-size: 16px;
`;

const PostWrapper = styled.div`
  display: block;
  max-width: ${BreakPoints.tablet + 'px'};
  padding: 20px 0;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
`;

export default PostLayout;
