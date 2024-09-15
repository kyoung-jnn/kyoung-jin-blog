import { style } from '@vanilla-extract/css';

export const title = style({ paddingLeft: 12, margin: 0 });

export const Wrapper = style({
  gridColumn: '2/3',
});

export const List = style({ display: 'grid', gap: 8 });
