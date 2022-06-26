import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import highlight from 'rehype-highlight';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    publish: { type: 'boolean', required: true },
  },
}));

export default makeSource({
  contentDirPath: 'database/posts',
  documentTypes: [Post],
  mdx: { rehypePlugins: [highlight] },
});
