import { type Options } from 'rehype-pretty-code';

export const rehypePrettyCodeOptions: Partial<Options> = {
  theme: 'monokai',
  onVisitHighlightedLine(node) {
    node.properties.className.push('line-highlighted');
  },
};
