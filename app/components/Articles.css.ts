import { style, keyframes } from '@vanilla-extract/css';

export const fadeLeft = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateX(10px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateX(0px)',
  },
});

export const wrapper = style({
  opacity: 0,
  animation: `${fadeLeft} 1s forwards`,
});
