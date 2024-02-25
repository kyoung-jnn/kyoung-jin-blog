import { NotionAPI } from 'notion-client';
import { getDateValue, getTextContent } from 'notion-utils';
import {
  BlockMap,
  CollectionPropertySchemaMap,
  ExtendedRecordMap,
  ID,
} from 'notion-types';
import { PostProperty } from '@/types/notion';

const api = new NotionAPI();

export const getPageIds = (response: ExtendedRecordMap) => {
  const results: ID[] = [];

  const collectionQuery = Object.values(response.collection_query)[0];

  Object.values(collectionQuery).forEach((view) => {
    view?.collection_group_results?.blockIds?.forEach((id: ID) =>
      results.push(id),
    );
  });

  return results;
};

export const getPageProperty = (
  id: string,
  blockMap: BlockMap,
  schema: CollectionPropertySchemaMap,
) => {
  const results = {
    id,
  } as PostProperty;

  const {
    value: { properties },
  } = blockMap[id];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.entries(properties).forEach(([key, value]: any) => {
    const type = schema[key].type;
    const name = schema[key].name;

    switch (type) {
      case 'file': {
        break;
      }
      case 'date': {
        const dateProperty = getDateValue(value);
        results[name] = dateProperty?.start_date as PostProperty['date'];
        break;
      }
      default: {
        results[name] = getTextContent(value);
        break;
      }
    }
  });

  return results;
};

export const getPosts = async () => {
  const response = await api.getPage(process.env.NOTION_PAGE as string);

  const blockMap = response.block;
  const collection = Object.values(response.collection)[0]?.value;
  const schema = collection?.schema;

  const pageIds = getPageIds(response);
  const properties = pageIds.map((id) => {
    return getPageProperty(id, blockMap, schema);
  });

  // In Production, Publish 'publish' page's status
  const publishedPosts = properties.filter((page) =>
    process.env.NODE_ENV === 'production' ? page?.status === 'publish' : true,
  );
  return publishedPosts;
};

export const getPost = async (pageId: ID) => {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage(pageId);

  return recordMap;
};
