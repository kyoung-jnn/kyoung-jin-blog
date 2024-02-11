import MessageSVG from '@/public/message.svg';
import { ComponentProps } from 'react';

function MessageIcon({ ...attributes }: ComponentProps<'svg'>) {
  return <MessageSVG {...attributes} />;
}

export default MessageIcon;
