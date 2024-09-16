import { style } from '@vanilla-extract/css';
import BREAK_POINT from '@/constants/breakpoints';

export const wrapper = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginTop: '60px',

  '@media': {
    [`screen and (min-width: ${BREAK_POINT.tablet}px)`]: {
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gridTemplateColumns: '192px 640px 192px',
    },
  },
});
