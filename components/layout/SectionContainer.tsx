import styled from "styled-components";

export default function SectionContainer({ children }: any) {
  return <StyledSectionContainer>{children}</StyledSectionContainer>;
}

const StyledSectionContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 768px;

  @media (min-width: 640px) {
    padding-left: 24px /* 24px */;
    padding-right: 24px /* 24px */;
  }

  @media (min-width: 1280px) {
    max-width: 896px /* 896px */;
    padding-left: 0px;
    padding-right: 0px;
  }
`;
