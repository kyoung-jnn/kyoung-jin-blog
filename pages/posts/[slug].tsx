import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import PostLayout from '@/components/layout/PostLayout';
import { PostSEO } from '@/components/SEO';
import siteMetadata from '@/database/siteMetadata';
import { getMarkdown, getPosts } from 'api/notion';
import Markdown from '@/components/Markdown';
import { convertDTO } from '@/utils/notion';
import SITE_CONFIG from '@/database/siteConfig';
import { Post } from 'types/notion';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  const slugs = posts.map(({ properties }) => {
    return { params: { slug: properties.slug.rich_text[0].plain_text } };
  });

  return {
    paths: slugs,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Post> = async ({ params }) => {
  const slug = params?.slug as string;
  const posts = await getPosts();
  const post = posts?.find(
    ({ properties }) => properties.slug.rich_text[0].plain_text === slug,
  );

  if (!post) {
    return {
      notFound: true,
    };
  }

  const mdString = await getMarkdown(post.id);
  const parsedPost = convertDTO(post);

  if (!mdString) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      body: mdString,
      ...parsedPost,
    },
    revalidate: SITE_CONFIG.revalidateTime,
  };
};

function PostPage({
  body,
  date,
  slug,
  summary,
  thumbnail,
  title,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PostSEO
        url={`${siteMetadata.siteUrl}/posts/${slug}`}
        title={title}
        summary={summary}
        date={date}
      />
      <PostLayout title={title} date={date} thumbnail={thumbnail}>
        <Markdown mdString={body} />
      </PostLayout>
    </>
  );
}

export default PostPage;
