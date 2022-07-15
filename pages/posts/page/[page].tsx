import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { allPosts, Post } from 'contentlayer/generated';
import ListLayout from '@/components/layout/ListLayout';
import { PageSEO } from '@/components/SEO';
import siteConfig from '@/database/siteConfig';
import siteMetadata from '@/database/siteMetadata';

const POSTS_PER_PAGE = 6;

// 동적 라우팅을 위한 매소드
export const getStaticPaths: GetStaticPaths = async () => {
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, index) => ({
    params: {
      page: (index + 1).toString(),
    },
  }));

  return {
    paths,
    fallback: 'blocking', // true 와 비슷하지만 fallback 화면을 보여주지 않음 -> SSG 전용!
  };
};

interface PageParamsType {
  [key: string]: string;
  page: string;
}

// getStaticPaths 에서 동적 라우팅으로 지정된 params 받아옴
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { page } = params as PageParamsType;
  const totalPage = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const currentPage = parseInt(page);

  if (isNaN(currentPage) || currentPage <= 0 || currentPage > totalPage) {
    return {
      notFound: true, // 404
    };
  }

  const pagePosts = allPosts
    .sort(
      (a: Post, b: Post) => Number(new Date(b.date)) - Number(new Date(a.date)),
    )
    .slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage);

  return {
    props: {
      pagePosts,
      totalPage,
      currentPage,
    },
  };
};

export default function PostList({
  pagePosts,
  totalPage,
  currentPage,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={`Posts - ${siteConfig.author.name}`}
        description={siteMetadata.description}
      />
      <ListLayout
        allPosts={allPosts}
        pagePosts={pagePosts}
        totalPage={totalPage}
        currentPage={currentPage}
        title={`📝 Page, ${currentPage}`}
        paginationLink="/posts/page"
      />
    </>
  );
}
