import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gridColumn: '2/3',
  padding: 12,
  fontSize: 14,
});
