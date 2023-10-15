import { ExtendedRecordMap } from 'notion-types';

export interface Properties {
  date: string;
  slug: string;
  status: string;
  summary: string;
  thumbnail?: string;
  title: string;
}

export interface Post extends Properties {
  body: ExtendedRecordMap;
}
