import SITE_METADATA from '@/database/siteMetadata';
import React from 'react';

type Props = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  date: string;
  updatedAt: string;
};

function JsonLD({
  slug,
  title,
  description,
  image: _image,
  date,
  updatedAt,
}: Props) {
  const url = `${SITE_METADATA.siteUrl}/posts/${slug}`;

  const publishedAt = new Date(date).toISOString();
  const modifiedAt = new Date(updatedAt || date).toISOString();

  const image = _image ?? SITE_METADATA.siteBanner;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    description: description,
    image: image,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: [
      {
        '@type': 'Person',
        name: SITE_METADATA.author,
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: SITE_METADATA.author,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_METADATA.siteLogo}`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}

export default JsonLD;
