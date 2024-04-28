'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from 'next/head';
import SITE_METADATA from '@/database/siteMetadata';
import { useRouter } from 'next/router';

const CommonSEO = ({
  title,
  description,
  ogType,
  ogImage,
  canonicalUrl,
}: any) => {
  const router = useRouter();

  return (
    <Head>
      {/* Default SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={SITE_METADATA.keywords} />
      <meta name="author" content={SITE_METADATA.author} />
      <meta name="reply-to" content={SITE_METADATA.email} />
      {/* 로봇 방문 허용 */}
      <meta name="robots" content="index, follow" />
      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_METADATA.siteName} />
      <meta property="og:title" content={SITE_METADATA.title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={SITE_METADATA.siteUrl} />
      <meta property="og:locale" content={SITE_METADATA.locale} />
      <meta property="og:type" content={ogType} />
      {/* 트위터 */}
      <meta name="twitter:title" content={SITE_METADATA.title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:card" content={ogImage} />
      {/* 중복 되는 URL 방지 */}
      <link
        rel="canonical"
        href={
          canonicalUrl
            ? canonicalUrl
            : `${SITE_METADATA.siteUrl}${router.asPath}`
        }
      />
    </Head>
  );
};

// Page
export const PageSEO = ({
  title,
  description,
  canonicalUrl,
}: {
  title: string;
  description: string;
  canonicalUrl?: string;
}) => {
  const ogImageUrl = SITE_METADATA.siteBanner;
  return (
    <CommonSEO
      title={title}
      description={description}
      ogType="website"
      ogImage={ogImageUrl}
      canonicalUrl={canonicalUrl}
    />
  );
};
