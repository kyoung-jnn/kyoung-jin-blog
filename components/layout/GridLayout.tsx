import media from '@/styles/media';
import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';

function GridLayout({ children }: PropsWithChildren) {
  return (
    <section
      css={css`
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 0 20px;
        margin-top: 60px;

        ${media.tablet} {
          display: grid;
          justify-content: center;
          align-items: flex-start;
          gap: 10px;
          grid-template-columns: 192px 640px 192px;
        }
      `}
    >
      {children}
    </section>
  );
}

export default GridLayout;
