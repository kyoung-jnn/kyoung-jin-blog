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
          <time dateTime={date}>{date}</time>
        </DateContainer>
      </StyledPostCard>
    </Link>
  );
};

const StyledPostCard = styled.li`
  padding: 18px 10px;
  color: #aaaaaa;
  cursor: pointer;

  transition: color 0.4s;
  &:hover {
    color: var(--text);
  }
`;

const ContentContainer = styled.div`
  .title {
    font-size: 20px;
    margin-top: 0;
  }

  .summary {
    font-weight: 400;
  }
`;

const DateContainer = styled.div`
  font-size: 14px;
  font-weight: 200;
  margin-top: 5px;
`;

export default PostCard;
