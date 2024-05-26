import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'block',
  padding: '16px 0',
  cursor: 'pointer',
  transition: 'opacity 0.2s',
  ':hover': {
    opacity: 0.7,
  },
});

export const h2 = style({
  fontSize: 16,
  fontWeight: 500,
  marginTop: 0,
});

export const time = style({
  fontSize: 14,
  fontWeight: 200,
  marginTop: 5,
});
