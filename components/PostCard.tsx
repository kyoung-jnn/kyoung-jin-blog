import styled from '@emotion/styled';
import Link from 'next/link';

interface PostCardProps {
  title: string;
  date: string;
  slug: string;
}

const PostCard = ({ title, date, slug }: PostCardProps) => {
  return (
    <Link href={`/posts/${slug}`}>
      <StyledPostCard key={slug}>
        <ContentContainer>
          <h2 className="title">{title}</h2>
        </ContentContainer>
        <DateContainer>
          <time dateTime={date}>{date}</time>
        </DateContainer>
      </StyledPostCard>
    </Link>
  );
};

const StyledPostCard = styled.li`
  padding: 18px 0;
  cursor: pointer;

  transition: color 0.3s;
  &:hover {
  }
`;

const ContentContainer = styled.div`
  .title {
    font-size: 16px;
    font-weight: 500;
    margin-top: 0;
  }
`;

const DateContainer = styled.div`
  font-size: 14px;
  font-weight: 200;
  margin-top: 5px;
`;

export default PostCard;
