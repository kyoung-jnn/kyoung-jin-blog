import SITE_CONFIG from '@/database/config';
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
  const url = `${SITE_CONFIG.siteUrl}/posts/${slug}`;

  const publishedAt = new Date(date).toISOString();
  const modifiedAt = new Date(updatedAt || date).toISOString();

  const image = _image ?? SITE_CONFIG.siteBanner;

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
        name: SITE_CONFIG.author.name,
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.author.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.siteLogo}`,
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
