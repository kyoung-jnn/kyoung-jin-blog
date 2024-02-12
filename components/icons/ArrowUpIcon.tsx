import ArrowUpSVG from '@/public/arrow-up.svg';
import { css } from '@emotion/react';
import { ComponentProps } from 'react';

function ArrowUpIcon({ ...attributes }: ComponentProps<'svg'>) {
  return (
    <ArrowUpSVG
      {...attributes}
      css={css`
        cursor: pointer;
      `}
    />
  );
}

export default ArrowUpIcon;
