import media from '@/styles/media';
import { fadeLeft } from '@/utils/animation';
import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
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
    animation: ${fadeLeft} 0.5s forwards;
  }
`;
