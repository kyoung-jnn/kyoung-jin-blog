import type { ReactNode } from 'react';
import styled from 'styled-components';
import media from '@/styles/media';
import BREAK_POINTS from '@/constants/breakpoints';

interface SectionConatinerProps {
  children: ReactNode;
}

export default function SectionContainer({ children }: SectionConatinerProps) {
  return <StyledSectionContainer>{children}</StyledSectionContainer>;
}

const StyledSectionContainer = styled.div`
  max-width: ${BREAK_POINTS.tablet + 'px'};
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;

  ${media.tablet} {
    padding-left: 24px;
    padding-right: 24px;
  }
`;
