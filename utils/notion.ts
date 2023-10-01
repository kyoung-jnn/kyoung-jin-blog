import { PageObjectResponse, ParsedPageProperties } from 'types/notion';

export const convertDTO = (pageObject: PageObjectResponse) => {
  const post = {} as ParsedPageProperties;

  Object.entries(pageObject.properties).map(([key, values]) => {
    if (key === 'title') {
      post[key] = values.title[0].plain_text;
    }

    if (key === 'summary' || key === 'slug') {
      post[key] = values.rich_text[0].plain_text;
    }

    if (key === 'date') {
      post[key] = values.date.start;
    }

    if (key === 'thumbnail') {
      post[key] = values.files[0] || '';
    }

    if (key === 'status') {
      post[key] = values.status.name;
    }
  });

  return post;
};
