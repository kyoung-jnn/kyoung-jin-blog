/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import styled from '@emotion/styled';
import { allPosts, Post } from 'contentlayer/generated';
import Icon from '@/components/icons';
import Link from 'next/link';
import PostCard from '@/components/PostCard';
import { PageSEO } from '@/components/SEO';
import siteConfig from '@/database/siteConfig';
import siteMetadata from '@/database/siteMetadata';
import waving_hand from '@/public/waving-hand.webp';
import { fadeLeft, fadeUp, waving } from '@/utils/animation';
import media from '@/styles/media';
import BREAK_POINTS from '@/constants/breakpoints';

// 최신 글 개수
const MAX_DISPLAY = 5;

export const getStaticProps: GetStaticProps = async () => {
  const posts = allPosts
    .filter((post) => post.publish)
    .sort(
      (a: Post, b: Post) => Number(new Date(b.date)) - Number(new Date(a.date)),
    )
    .slice(0, MAX_DISPLAY);

  return { props: { latestPost: posts } };
};

function Home({
  latestPost: latestPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Wrapper>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <IntroSection>
        <h1 className="title">
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
        </h1>
        <h2 className="subtitle">Slow and Steady.</h2>
        <ProfileSection>
          <Image
            src="https://avatars.githubusercontent.com/u/55469709?s=400&u=9d32f97f83bf19b48b488ce2c007f4a82b432c99&v=4"
            alt="profile-image"
            aria-label="프로필 이미지"
            width={110}
            height={110}
            style={{
              borderRadius: '50%',
            }}
          />
          <h3 className="name">{siteConfig.author.name}</h3>
          <div>Frontend Engineer</div>
          <div>In Seoul, Korea</div>
        </ProfileSection>
        <ContactSection>
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
        </ContactSection>
      </IntroSection>
      <LatestSection>
        <ul>
          {!latestPosts.length && '포스팅이 존재하지 않습니다. 🥹'}
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  max-width: ${BREAK_POINTS.tablet + 'px'};
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;

  ${media.tablet} {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const IntroSection = styled.section`
  margin: 50px 0 30px;

  .title {
    font-size: 50px;
    font-weight: 700;
  }

  .subtitle {
    font-size: 36px;
    font-weight: 700;
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

const ProfileSection = styled.section`
  margin-top: 20px;

  .name {
    margin-top: 10px;
  }
`;

const ContactSection = styled.section`
  margin-top: 20px;
  div {
    margin-right: 15px;
  }
`;

const LatestSection = styled.section`
  opacity: 0;
  animation: ${fadeLeft} 1s 0.5s forwards;
  border-top: 1px solid #e5e5e5;

  > .more-button-wrapper {
    float: right;
  }
`;

export default Home;
