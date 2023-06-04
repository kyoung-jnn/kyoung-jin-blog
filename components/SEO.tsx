/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from 'next/head';
import siteMetadata from '@/database/siteMetadata';
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
      <meta name="keywords" content={siteMetadata.keywords} />
      <meta name="author" content={siteMetadata.author} />
      <meta name="reply-to" content={siteMetadata.email} />
      {/* 로봇 방문 허용 */}
      <meta name="robots" content="index, follow" />
      {/* Open Graph */}
      <meta property="og:site_name" content={siteMetadata.siteName} />
      <meta property="og:title" content={siteMetadata.title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={siteMetadata.siteUrl} />
      <meta property="og:locale" content={siteMetadata.locale} />
      <meta property="og:type" content={ogType} />
      {/* 트위터 */}
      <meta name="twitter:title" content={siteMetadata.title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:card" content={ogImage} />
      {/* 중복 되는 URL 방지 */}
      <link
        rel="canonical"
        href={
          canonicalUrl
            ? canonicalUrl
            : `${siteMetadata.siteUrl}${router.asPath}`
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
  const ogImageUrl = siteMetadata.socialBanner;
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

// Post Page
export const PostSEO = ({
  url,
  title,
  summary,
  date,
  updatedAt,
  canonicalUrl,
}: any) => {
  const publishedAt = new Date(date).toISOString();
  const modifiedAt = new Date(updatedAt || date).toISOString();

  const ogImageUrl = siteMetadata.socialBanner;

  const authorList = {
    '@type': 'Person',
    name: siteMetadata.author,
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    image: ogImageUrl,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorList,
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.author,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteLogo}`,
      },
    },
    description: summary,
  };

  return (
    <>
      <CommonSEO
        title={title}
        description={summary}
        ogType="article"
        ogImage={ogImageUrl}
        canonicalUrl={canonicalUrl}
      />
      <Head>
        {date && (
          <>
            <meta property="article:published_time" content={publishedAt} />
            <meta property="article:modified_time" content={modifiedAt} />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      </Head>
    </>
  );
};
