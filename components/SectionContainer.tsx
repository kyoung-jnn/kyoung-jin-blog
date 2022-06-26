import styled from 'styled-components';
import media from '@/styles/media';
import BreakPoints from '@/constants/breakpoints';

export default function SectionContainer({ children }: any) {
  return <StyledSectionContainer>{children}</StyledSectionContainer>;
}

const StyledSectionContainer = styled.div`
  max-width: ${BreakPoints.tablet + 'px'};
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;

  ${media.tablet} {
    padding-left: 24px;
    padding-right: 24px;
  }
`;
