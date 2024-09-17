'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren, memo } from 'react';

import styled from '@emotion/styled';

import media from '@/styles/media';

import IconButton from './IconButton';

function Sidebar({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <Wrapper>
      <IconButton name="ArrowUpLeft" onClick={() => router.back()} />
      {children}
    </Wrapper>
  );
}

export default memo(Sidebar);

const Wrapper = styled.aside`
  position: relative;
  display: none;

  ${media.desktop} {
    position: sticky;
    display: grid;
    gap: 20px;
    top: 90px;
  }
`;
