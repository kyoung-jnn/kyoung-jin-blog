import { style } from '@vanilla-extract/css';

export const header = style({
  position: 'sticky',
  top: 0,
  height: 44,
  zIndex: 100,
  backdropFilter: 'saturate(150%) blur(3px)',
});

export const nav = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: 664,
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '10px 12px',
});

export const leftNav = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: 400,
  fontSize: 14,
});

export const rightNav = style({
  display: 'flex',
  alignItems: 'center',
  fontSize: 16,
  fontWeight: 600,
  gap: 6,
});
