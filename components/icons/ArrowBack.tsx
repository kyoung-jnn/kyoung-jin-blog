import ArrowBackSVG from '@/public/arrow-back.svg';
import { ComponentProps } from 'react';

function ArrowBack({ ...attributes }: ComponentProps<'svg'>) {
  return <ArrowBackSVG {...attributes} />;
}

export default ArrowBack;
