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
    <Link href={`/posts/${slug}`} className="text-gray-900 dark:text-gray-100">
      <StyledPostCard key={slug}>
        <ContentContainer>
          <h2 className="title">{title}</h2>
          <div className="summary">{summary}</div>
        </ContentContainer>
        <DateContainer>
          <time dateTime={date}>Published on {date}</time>
        </DateContainer>
      </StyledPostCard>
    </Link>
  );
};

const StyledPostCard = styled.li`
  padding: 15px 10px;
  margin-bottom: 10px;
  border: 2px solid transparent;
  border-radius: 10px;
  color: var(--text);
  cursor: pointer;

  transition: all 0.3s;
  :hover {
    color: var(--focus-text);
    background: var(--focus-bg);
    filter: drop-shadow(0px 0px 15px #f0f0f0);
  }
`;

const ContentContainer = styled.div`
  color: var(--fontColor);

  .title {
    font-size: 20px;
    margin-top: 0;
  }

  .summary {
    font-weight: 500;
  }
`;

const DateContainer = styled.div`
  font-size: 15px;
  color: var(--fontColor);
  font-weight: 300;
  margin-top: 10px;
`;

export default PostCard;
