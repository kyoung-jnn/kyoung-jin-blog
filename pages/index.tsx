import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import styled from 'styled-components';
import { allPosts, Post } from 'contentlayer/generated';
import Link from '@/components/CustomLink';
import PostCard from '@/components/PostCard';
// import SocialIcon from "@/components/icons";
import siteConfig from '@/database/siteConfig';
import siteMetadata from '@/database/siteMetadata';
import waving_hand from '@/public/waving-hand.webp';
import { fadeLeft, fadeUp, waving } from '@/utils/animation';

// 최신 글 개수
const MAX_DISPLAY = 3;

export const getStaticProps: GetStaticProps = async () => {
  const posts = allPosts
    .sort(
      (a: Post, b: Post) => Number(new Date(b.date)) - Number(new Date(a.date)),
    )
    .slice(0, MAX_DISPLAY);

  return { props: { latestPost: posts } };
};

export default function Home({
  latestPost,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      {/*  <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      /> */}
      <IntroSection>
        <div className="title">
          Hello, There
          <AnimatedHand>
            <Image src={waving_hand} alt="waving-hand" objectFit="cover" />
          </AnimatedHand>
        </div>
        <div className="subtitle">Slow and Steady.</div>
        <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
          {siteConfig.author.name}
        </h3>
        <div className="text-gray-500 dark:text-gray-400">
          Frontend Engineer
        </div>
        <div className="text-gray-500 dark:text-gray-400">
          KwangWoon Univ. Software Engineering
        </div>
        <div className="text-gray-500 dark:text-gray-400">Seoul, Korea</div>
        <div className="flex pt-6 space-x-3">
          {/* <SocialIcon kind="github" href={siteConfig.author.contacts.github} />
          <SocialIcon
            kind="mail"
            href={`mailto:${siteConfig.author.contacts.email}`}
          /> */}
        </div>
      </IntroSection>
      <LatestSection>
        <LatestTitle>🔥 최신 글 | Latest</LatestTitle>
        <ul>
          {!latestPost.length && '포스팅이 없어요! 😅'}
          {latestPost.map(({ title, date, summary, _raw }: any) => {
            const slug = _raw.flattenedPath.split('/')[2];

            return (
              <PostCard
                title={title}
                date={date}
                summary={summary}
                slug={slug}
              />
            );
          })}
        </ul>
        {/* {posts.length > MAX_DISPLAY && (
          <div className="flex justify-end text-base font-medium leading-6">
            <Link
              href="/posts/page/1"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="all posts"
            >
              모든 포스팅보기
            </Link>
          </div>
        )} */}
      </LatestSection>
    </>
  );
}

const IntroSection = styled.section`
  margin: 80px 0;

  .title {
    font-size: 2.6rem;
    font-weight: 700;
  }

  .subtitle {
    font-size: 2.2rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    margin-top: 10px;
  }

  animation: ${fadeUp} 1s forwards;
`;

const AnimatedHand = styled.div`
  display: inline-block;
  width: 45px;
  height: 45px;
  margin-left: 10px;

  animation: ${waving} 2s;
`;

const LatestSection = styled.section`
  opacity: 0;
  animation: ${fadeLeft} 1s 0.5s forwards;
`;

const LatestTitle = styled.h1`
  font-weight: 700;
`;
