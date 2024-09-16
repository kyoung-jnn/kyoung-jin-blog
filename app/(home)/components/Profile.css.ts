import { style, keyframes } from '@vanilla-extract/css';

const fadeUp = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(10px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0px)',
  },
});

export const wrapper = style({
  display: 'grid',
  gap: 4,
  opacity: 0,
  animation: `${fadeUp} 1s forwards`,
  padding: '0 12px',
});

export const title = style({
  fontSize: 26,
});

export const desciption = style({
  color: 'var(--gray-9)',
  fontSize: 15,
});
