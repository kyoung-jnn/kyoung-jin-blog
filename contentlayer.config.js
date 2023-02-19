import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypePrettyCode from 'rehype-pretty-code';
import { rehypePrettyCodeOptions } from './styles/rehype-styles';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md*`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    thumbnail: {
      type: 'string',
      required: false,
    },
    publish: { type: 'boolean', required: true },
  },
}));

export default makeSource({
  contentDirPath: 'database/posts',
  documentTypes: [Post],
  mdx: { rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]] },
});
