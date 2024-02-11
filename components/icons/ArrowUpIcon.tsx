import ArrowUpSVG from '@/public/arrow-up.svg';
import { ComponentProps } from 'react';

function ArrowUpIcon({ ...attributes }: ComponentProps<'svg'>) {
  return <ArrowUpSVG {...attributes} />;
}

export default ArrowUpIcon;
