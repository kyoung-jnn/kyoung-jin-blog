import { style } from '@vanilla-extract/css';

export const header = style({
  position: 'sticky',
  top: 0,
  height: 70,
  zIndex: 100,
  background: 'linear-gradient(to top, transparent, var(--gray-4))',
});

export const nav = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: 672,
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '10px 16px',
});

export const leftNav = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: 500,
  fontSize: 14,
});

export const rightNav = style({
  display: 'flex',
  alignItems: 'center',
  fontSize: 16,
  fontWeight: 600,
  gap: 6,
});
