import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import styled from '@emotion/styled';
import Icon from '@/components/icons';
import Link from 'next/link';
import PostCard from '@/components/PostCard';
import { PageSEO } from '@/components/SEO';
import SITE_CONFIG from '@/database/siteConfig';
import siteMetadata from '@/database/siteMetadata';
import { fadeLeft, fadeUp } from '@/utils/animation';

import { getPosts } from '@/api/notion';
import { PostProperty } from '@/types/notion';
import { css } from '@emotion/react';
import media from '@/styles/media';
import menu from '@/constants/menu';

// latest post count
const POSTS_HOME = 5;

export const getStaticProps: GetStaticProps<{
  latestPosts: PostProperty[];
}> = async () => {
  const posts = await getPosts();

  const latestPosts = posts.slice(0, POSTS_HOME);

  return {
    props: {
      latestPosts,
    },
  };
};

function Home({ latestPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <Wrapper>
        <ProfileSection>
          <Image
            src="https://avatars.githubusercontent.com/u/55469709?s=400&u=9d32f97f83bf19b48b488ce2c007f4a82b432c99&v=4"
            alt="프로필 이미지"
            aria-label="프로필 이미지"
            width={90}
            height={90}
            css={css`
              border-radius: 50%;
            `}
          />
          <h3
            css={css`
              margin-top: 10px;
            `}
          >
            {SITE_CONFIG.author.koName} • {SITE_CONFIG.author.enName}
          </h3>
          <p
            css={css`
              margin-top: 8px;
            `}
          >
            Frontend Engineer
          </p>
          <p
            css={css`
              margin-top: 4px;
            `}
          >
            In Seoul, South Korea
          </p>
        </ProfileSection>
        <ContactSection>
          <Icon
            kind="mail"
            href={`mailto:${SITE_CONFIG.author.contacts.email}`}
            size={18}
          />
          <Icon
            kind="github"
            href={SITE_CONFIG.author.contacts.github}
            size={18}
          />
          <Icon
            kind="linkedin"
            href={SITE_CONFIG.author.contacts.linkedin}
            size={18}
          />
        </ContactSection>
        <MenuSection>
          {menu.map(({ href, name, description }) => (
            <Link href={href} key={name}>
              {name}
              <p
                css={css`
                  font-size: 14px;
                  margin-top: 4px;
                `}
              >
                {description}
              </p>
            </Link>
          ))}
        </MenuSection>
        <LatestSection>
          <ul>
            {!latestPosts.length && '포스팅이 존재하지 않습니다. 🥹'}
            {latestPosts.map(({ title, date, slug }) => {
              return (
                <PostCard key={slug} title={title} date={date} slug={slug} />
              );
            })}
          </ul>
          <Link
            href="/posts/page/1"
            aria-label="모든 포스팅 보기 버튼"
            css={css`
              font-size: 14px;
            `}
          >
            모든 개발관련 포스팅보기
          </Link>
        </LatestSection>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  position: relative;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 60px;

  ${media.tablet} {
    padding: 0;
  }
`;

const ProfileSection = styled.section`
  animation: ${fadeUp} 1s forwards;
`;

const ContactSection = styled.section`
  display: flex;
  margin-top: 20px;
  gap: 10px;

  animation: ${fadeUp} 1s forwards;
`;

const MenuSection = styled.nav`
  display: grid;
  margin: 36px 0;
  grid-template-columns: repeat(3, 1fr);
  opacity: 0;
  animation: ${fadeLeft} 1s 0.2s forwards;
`;

const LatestSection = styled.section`
  opacity: 0;
  animation: ${fadeLeft} 1s 0.4s forwards;
`;

export default Home;
