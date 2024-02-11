import media from '@/styles/media';
import { fadeUp } from '@/utils/animation';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import ArrowBack from './icons/ArrowBack';
import { PropsWithChildren } from 'react';

function Sidebar({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <Wrapper>
      <ArrowBack
        width={20}
        height={20}
        onClick={() => router.back()}
        css={css`
          cursor: pointer;
        `}
      />
      {children}
    </Wrapper>
  );
}

export default Sidebar;

const Wrapper = styled.aside`
  position: relative;
  display: none;
  flex-shrink: 0;
  padding: 8px 0;

  ${media.desktop} {
    position: sticky;
    display: grid;
    gap: 20px;
    top: 90px;
    animation: ${fadeUp} 0.5s forwards;
  }
`;
