import { PropsWithChildren } from 'react';

import { css } from '@emotion/react';

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
