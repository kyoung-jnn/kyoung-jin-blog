import { GetStaticProps } from "next";
import Image from "next/image";
import styled from "styled-components";
import Link from "@/components/Link";
// import SocialIcon from "@/components/icons";
import siteConfig from "@/database/siteConfig";
import siteMetadata from "@/database/siteMetadata";
import waving_hand from "@/public/waving-hand.webp";
import { fadeLeft, fadeUp, waving } from "@/utils/animation";
// import { getAllPosts } from "@/utils/post";

// import { FrontMatterType, PostType } from "types";

// 최신 글 개수
const MAX_DISPLAY = 3;
/* 
export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();

  return { props: { posts } };
}; */

interface HomeProps {
  posts: any;
}

export default function Home({ posts }: HomeProps) {
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
        <div className="space-y-2 pt-6 md:space-y-5">
          <h1 className="text-4xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            🔥 최신 글 | Latest
          </h1>
        </div>
        {/*  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && "포스팅이 없어요! 😅"}
          {posts.slice(0, MAX_DISPLAY).map(({ frontMatter, slug }) => {
            const { date, title, summary, tags } =
              frontMatter as FrontMatterType;

            return (
              <li key={slug} className="py-10">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{date}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/posts/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag: string) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
        {posts.length > MAX_DISPLAY && (
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
  }

  animation: ${fadeUp} 1s;
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
