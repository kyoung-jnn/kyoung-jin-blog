import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import styled from 'styled-components';
import { allPosts, Post } from 'contentlayer/generated';
import Icon from '@/components/icons';
import Link from '@/components/CustomLink';
import PostCard from '@/components/PostCard';
import { PageSEO } from '@/components/SEO';
import siteConfig from '@/database/siteConfig';
import siteMetadata from '@/database/siteMetadata';
import waving_hand from '@/public/waving-hand.webp';
import { fadeLeft, fadeUp, waving } from '@/utils/animation';
import media from '@/styles/media';

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
  latestPost: latestPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <IntroSection>
        <div className="title">
          Hello, There
          <AnimatedHand>
            <Image
              src={waving_hand}
              alt="waving-hand-image"
              objectFit="cover"
              width={45}
              height={45}
            />
          </AnimatedHand>
        </div>
        <div className="subtitle">Slow and Steady.</div>
        <h3>{siteConfig.author.name}</h3>
        <div>Frontend Engineer</div>
        <div>In Seoul, Korea</div>
        <IconContainer>
          <Icon
            kind="mail"
            href={`mailto:${siteConfig.author.contacts.email}`}
            size={24}
          />
          <Icon
            kind="github"
            href={siteConfig.author.contacts.github}
            size={24}
          />
          <Icon
            kind="linkedin"
            href={siteConfig.author.contacts.linkedin}
            size={24}
          />
        </IconContainer>
      </IntroSection>
      <LatestSection>
        <LatestTitle>🔥 최신 글 | Latest</LatestTitle>
        <ul>
          {!latestPosts.length && '포스팅이 없어요! 😅'}
          {latestPosts.map(({ title, date, summary, _raw }: any) => {
            const slug = _raw.flattenedPath.split('/')[2];

            return (
              <PostCard
                key={slug}
                title={title}
                date={date}
                summary={summary}
                slug={slug}
              />
            );
          })}
        </ul>
        <div className="more-button-wrapper">
          <Link href="/posts/page/1" aria-label="all posts">
            <button>모든 포스팅보기</button>
          </Link>
        </div>
      </LatestSection>
    </>
  );
}

const IntroSection = styled.section`
  margin: 50px 0;

  .title {
    font-size: 50px;
    font-weight: 900;
  }

  .subtitle {
    font-size: 36px;
    font-weight: 700;
    margin-top: 10px;
  }

  animation: ${fadeUp} 1s forwards;

  ${media.mobile} {
    margin: 80px 0;
  }
`;

const AnimatedHand = styled.div`
  display: inline-block;
  width: 45px;
  height: 45px;
  margin-left: 10px;

  animation: ${waving} 2s;
`;

const LatestTitle = styled.h1`
  font-weight: 700;
`;

const LatestSection = styled.section`
  opacity: 0;
  animation: ${fadeLeft} 1s 0.5s forwards;

  > .more-button-wrapper {
    float: right;
  }
`;

const IconContainer = styled.div`
  margin-top: 20px;
  div {
    margin-right: 15px;
  }
`;
