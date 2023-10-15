import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import PostLayout from '@/components/layout/PostLayout';
import { PostSEO } from '@/components/SEO';
import siteMetadata from '@/database/siteMetadata';
import { getPost, getPosts } from '@/api/notion';
import SITE_CONFIG from '@/database/siteConfig';
import { Post } from 'types/notion';
import { useRouter } from 'next/router';
import NotionRenderer from '@/components/NotionRender';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  const slugs = posts.map(({ slug }) => {
    return { params: { slug } };
  });

  return {
    paths: slugs,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Post> = async ({ params }) => {
  const currentSlug = params?.slug as string;
  const posts = await getPosts();
  const post = posts?.find(({ slug }) => slug === currentSlug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const recordMap = await getPost(post.id);

  return {
    props: {
      ...post,
      body: recordMap,
    },
    revalidate: SITE_CONFIG.revalidateTime,
  };
};

function PostPage({
  date,
  slug,
  summary,
  thumbnail,
  title,
  body: recordMap,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PostSEO
        url={`${siteMetadata.siteUrl}/posts/${slug}`}
        title={title}
        summary={summary}
        date={date}
      />
      <PostLayout title={title} date={date} thumbnail={thumbnail}>
        <NotionRenderer recordMap={recordMap} />
      </PostLayout>
    </>
  );
}

export default PostPage;
