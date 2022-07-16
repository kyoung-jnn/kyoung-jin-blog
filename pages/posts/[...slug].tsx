import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { allPosts, Post } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import MDXComponents from '@/components/MDXComponents';
import PostLayout from '@/components/layout/PostLayout';
import { PostSEO } from '@/components/SEO';
import siteMetadata from '@/database/siteMetadata';

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
  const { title, date, _raw, body } = post;
  const short_description = body.raw
    .replace(/[#|*|`]/g, '') // 마크다운 문법 제거
    .replace(/[-]/g, '') // - 제거
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      '',
    ) // 이모지 제거
    .replace(/^\s*/g, '') // 앞 공백 제거
    .replace(/\s+/g, ' ') // 줄바꿈 제거
    .substr(0, 160);

  return (
    <>
      <PostSEO
        url={`${siteMetadata.siteUrl}/posts/${
          _raw.flattenedPath.split('/')[2]
        }`}
        title={title}
        summary={short_description}
        date={date}
      />
      <PostLayout title={title} date={date}>
        <MDXPost components={MDXComponents} />
      </PostLayout>
    </>
  );
}

export default PostPage;
