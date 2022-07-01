import React from 'react';
import Link from '@/components/CustomLink';
import styled from 'styled-components';

interface PostCardProps {
  title: string;
  date: string;
  summary: string;
  slug: string;
}

const PostCard = ({ title, date, summary, slug }: PostCardProps) => {
  return (
    <>
      <StyledPostCard key={slug}>
        <ContentContainer>
          <div>
            <h2 className="title">
              <Link
                href={`/posts/${slug}`}
                className="text-gray-900 dark:text-gray-100"
              >
                {title}
              </Link>
            </h2>
          </div>
          <div className="summary">{summary}</div>
        </ContentContainer>
        <DateContainer>
          <time dateTime={date}>Published on {date}</time>
        </DateContainer>
      </StyledPostCard>
    </>
  );
};

const StyledPostCard = styled.li`
  padding: 5px 10px;
  margin-bottom: 5px;
  border: 2px solid transparent;
  border-radius: 10px;
  cursor: pointer;

  transition: all 0.3s;
  :hover {
    border: 2px solid #111;
  }
`;

const ContentContainer = styled.div`
  .title {
    font-size: 20px;
  }

  .summary {
    font-weight: 500;
  }
`;

const DateContainer = styled.div`
  font-size: 15px;
  color: var(--fontColor);
  font-weight: 300;
  margin: 10px 0;
`;

export default PostCard;
