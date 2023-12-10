import { ExtendedRecordMap } from 'notion-types';

export type Status = 'publish' | 'unpublish';

export interface PostProperty {
  [key: string]: string | undefined | ExtendedRecordMap;
  id: string;
  date: string;
  slug: string;
  status: Status;
  summary: string;
  thumbnail?: string;
  title: string;
}

export interface Post extends PostProperty {
  body: ExtendedRecordMap;
}
