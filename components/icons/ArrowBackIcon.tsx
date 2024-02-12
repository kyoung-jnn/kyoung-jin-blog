import ArrowBackSVG from '@/public/arrow-back.svg';
import { css } from '@emotion/react';
import { ComponentProps } from 'react';

function ArrowBackIcon({ ...attributes }: ComponentProps<'svg'>) {
  return (
    <ArrowBackSVG
      {...attributes}
      css={css`
        cursor: pointer;
      `}
    />
  );
}

export default ArrowBackIcon;
