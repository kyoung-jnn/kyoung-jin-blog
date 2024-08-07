import MessageSVG from '@/public/message.svg';
import { css } from '@emotion/react';
import { ComponentProps } from 'react';

function MessageIcon({ ...attributes }: ComponentProps<'svg'>) {
  return (
    <MessageSVG
      {...attributes}
      css={css`
        cursor: pointer;
      `}
    />
  );
}

export default MessageIcon;
