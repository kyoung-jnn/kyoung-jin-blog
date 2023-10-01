import {
  APIErrorCode,
  Client,
  ClientErrorCode,
  isNotionClientError,
} from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { PageObjectResponse } from '../types/notion';

const notion = new Client({
  auth: process.env.NOTION_API_TOKEN,
});

export const getPosts = async () => {
  try {
    const databaseId = process.env.NOTION_DATEBASE_ID as string;
    const { results } = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'status',
        status: {
          equals: 'publish',
        },
      },
    });

    return results as unknown as PageObjectResponse[];
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          break;
        case APIErrorCode.ObjectNotFound:
          break;
        case APIErrorCode.Unauthorized:
          break;
        default:
      }
    }
    return [];
  }
};

export const getMarkdown = async (pageId: string) => {
  const n2m = new NotionToMarkdown({
    notionClient: notion,
    config: {
      parseChildPages: false,
    },
  });

  try {
    const mdblocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdblocks);
    return mdString;
  } catch (err) {
    console.error(err);
  }
};
