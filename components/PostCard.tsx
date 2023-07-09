import styled from '@emotion/styled';
import Link from 'next/link';

interface PostCardProps {
  title: string;
  date: string;
  summary: string;
  slug: string;
}

const PostCard = ({ title, date, summary, slug }: PostCardProps) => {
  return (
    <Link href={`/posts/${slug}`}>
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
  &:hover {
    color: var(--focus-text);
    background-color: var(--focus-bg);
    filter: drop-shadow(0px 0px 10px var(--focus-bg));
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
  font-weight: 300;
  margin-top: 10px;
  color: var(--fontColor);
`;

export default PostCard;
