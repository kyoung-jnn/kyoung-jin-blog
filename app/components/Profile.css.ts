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
  opacity: 0,
  animation: `${fadeUp} 1s forwards`,
});
