import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { allPosts, Post } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import MDXComponents from '@/components/MDXComponents';
import PostLayout from '@/components/layout/PostLayout';

interface SlugInterface {
  [key: string]: string | string[] | undefined;
  slug: string[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allPosts.map((post: Post) => ({
    params: { slug: [post._raw.flattenedPath.split('/')[2]] },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as SlugInterface;
  // 현재 포스팅 찾기
  const post = allPosts.find((post) =>
    post._raw.flattenedPath.includes(slug[0]),
  );

  if (post) {
    return {
      props: {
        post,
      },
    };
  }
  return {
    notFound: true,
  };
};

function PostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const MDXPost = useMDXComponent(post.body.code);
  const { _id, title, date } = post;

  return (
    <PostLayout title={title} date={date}>
      <MDXPost components={MDXComponents} />
    </PostLayout>
  );
}

export default PostPage;
