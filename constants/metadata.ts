import SITE_METADATA from '@/database/siteMetadata';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { Twitter } from 'next/dist/lib/metadata/types/twitter-types';

export const defaultMetadata: Metadata = {
  robots: { index: true, follow: true },
  title: SITE_METADATA.title,
  applicationName: SITE_METADATA.title,
  keywords: SITE_METADATA.keywords,
  publisher: SITE_METADATA.author,
  creator: SITE_METADATA.author,
  authors: [{ name: SITE_METADATA.author, url: SITE_METADATA.siteUrl }],
  category: 'technology',
};

export const defaultOpenGraph: OpenGraph = {
  siteName: SITE_METADATA.siteName,
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  images: SITE_METADATA.siteBanner,
  url: SITE_METADATA.siteUrl,
  locale: SITE_METADATA.locale,
  type: 'website',
};

export const defaultTwitterMetadata: Twitter = {
  card: 'summary_large_image',
  site: SITE_METADATA.siteName,
  creator: SITE_METADATA.author,
};
