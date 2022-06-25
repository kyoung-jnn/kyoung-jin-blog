import type { ReactNode } from "react";
import styled from "styled-components";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SectionContainer from "@/components/layout/SectionContainer";

interface LayoutWrapperProps {
  children: ReactNode;
}

function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <SectionContainer>
      <div className="flex flex-col justify-between h-screen">
        <Header />
        <MainSection>{children}</MainSection>
        <Footer />
      </div>
    </SectionContainer>
  );
}

const MainSection = styled.main`
  margin-bottom: auto;
`;

export default LayoutWrapper;
