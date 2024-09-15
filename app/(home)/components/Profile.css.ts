import { style, keyframes } from '@vanilla-extract/css';

export const fadeUp = keyframes({
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
});

export const title = style({
  fontWeight: 600,
});

export const desciption = style({
  color: 'var(--gray-9)',
  fontSize: 15,
});