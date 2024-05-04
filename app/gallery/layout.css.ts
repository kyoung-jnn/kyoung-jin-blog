import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  padding: 8,
  columnGap: 6,
  rowGap: 12,
});
