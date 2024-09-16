import SITE_CONFIG from '@/database/config';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { Twitter } from 'next/dist/lib/metadata/types/twitter-types';

export const META_DATA: Metadata = {
  robots: { index: true, follow: true },
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.title,
  keywords: SITE_CONFIG.keywords,
  publisher: SITE_CONFIG.author.name,
  creator: SITE_CONFIG.author.name,
  authors: [{ name: SITE_CONFIG.author.name, url: SITE_CONFIG.siteUrl }],
  category: 'technology',
};

export const META_DATA_TWITTER: Twitter = {
  card: 'summary_large_image',
  site: SITE_CONFIG.siteName,
  creator: SITE_CONFIG.author.name,
};

export const OPEN_GRAPH: OpenGraph = {
  siteName: SITE_CONFIG.siteName,
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  images: SITE_CONFIG.siteBanner,
  url: SITE_CONFIG.siteUrl,
  locale: SITE_CONFIG.locale,
  type: 'website',
};
