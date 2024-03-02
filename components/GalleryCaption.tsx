import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';

function GalleryCaption({ children }: PropsWithChildren) {
  return (
    <figcaption
      css={css`
        margin-top: 6px;
        font-size: 12px;
        font-style: italic;
      `}
    >
      {children}
    </figcaption>
  );
}

export default GalleryCaption;
