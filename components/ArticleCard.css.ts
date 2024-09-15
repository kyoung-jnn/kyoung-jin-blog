import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center',
  padding: '12px',
  transition: 'all 0.4s',
  borderRadius: 12,
  cursor: 'pointer',
  ':hover': {
    opacity: 0.7,
    backgroundColor: 'var(--gray-5)',
  },
});

export const h2 = style({
  fontSize: 15,
  fontWeight: 400,
  margin: 0,
});

export const time = style({
  fontSize: 13,
  fontWeight: 300,
});
