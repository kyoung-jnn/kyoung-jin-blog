import { PageObjectResponse as OriginPageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { MdStringObject } from 'notion-to-md/build/types';

type PropertiesValues =
  OriginPageObjectResponse['properties'][keyof OriginPageObjectResponse['properties']];

type Title = Extract<PropertiesValues, { type: 'title' }>;

type RichText = Extract<PropertiesValues, { type: 'rich_text' }>;

type Files = Extract<PropertiesValues, { type: 'files' }>;

type Status = Extract<PropertiesValues, { type: 'status' }>;

type Date = Extract<PropertiesValues, { type: 'date' }>;

export interface PageProperties {
  date: Date;
  slug: RichText;
  status: Status;
  summary: RichText;
  thumbnail: Files;
  title: Title;
}

export interface ParsedPageProperties {
  date: string;
  slug: string;
  status: string;
  summary: string;
  thumbnail: string;
  title: string;
}

export interface Post extends ParsedPageProperties {
  body: MdStringObject;
}

export interface PageObjectResponse
  extends Omit<OriginPageObjectResponse, 'properties'> {
  properties: PageProperties;
}
