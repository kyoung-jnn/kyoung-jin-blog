import ArrorBack from '@/public/arrow-back.svg';
import { ComponentProps } from 'react';

function ArrowBack({ ...attributes }: ComponentProps<'svg'>) {
  return <ArrorBack {...attributes} />;
}

export default ArrowBack;
