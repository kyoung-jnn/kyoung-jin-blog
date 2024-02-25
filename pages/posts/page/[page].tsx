import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import ListLayout from '@/components/layout/ListLayout';
import { PageSEO } from '@/components/SEO';
import SITE_METADATA from '@/database/siteMetadata';
import { getPosts } from 'api/notion';
import SITE_CONFIG from '@/database/siteConfig';
import { useRouter } from 'next/router';
import { PostProperty } from '@/types/notion';

export const POSTS_PER_PAGE = 6;

// 동적 라우팅을 위한 매소드
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();

  if (!posts.length) {
    return {
      paths: [],
      fallback: true,
    };
  }

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, index) => ({
    params: {
      page: (index + 1).toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<{
  allPosts: PostProperty[];
  pagePosts: PostProperty[];
  totalPage: number;
  currentPage: number;
}> = async ({ params }) => {
  const page = params?.page as string;

  const posts = await getPosts();

  const totalPage = Math.ceil(posts.length / POSTS_PER_PAGE);
  const currentPage = parseInt(page);

  if (isNaN(currentPage) || currentPage <= 0 || currentPage > totalPage) {
    return {
      notFound: true,
    };
  }

  const pagePosts = posts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage,
  );

  return {
    props: {
      allPosts: posts,
      pagePosts,
      totalPage,
      currentPage,
    },
    revalidate: SITE_CONFIG.revalidateTime,
  };
};

export default function PostList({
  allPosts,
  pagePosts,
  totalPage,
  currentPage,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageSEO
        title={`작성한 글, 포스팅 목록 | Kyoung Jin, Roh`}
        description={SITE_METADATA.description}
      />
      <ListLayout
        allPosts={allPosts}
        pagePosts={pagePosts}
        totalPage={totalPage}
        currentPage={currentPage}
        paginationLink="/posts/page"
      />
    </>
  );
}
