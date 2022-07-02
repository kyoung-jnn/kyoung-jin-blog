import type { ReactNode } from 'react';
import styled from 'styled-components';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SectionContainer from '@/components/SectionContainer';

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <SectionContainer>
      <StyledMainLayout>
        <Header />
        <main>{children}</main>
        <Footer />
      </StyledMainLayout>
    </SectionContainer>
  );
}

const StyledMainLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

export default MainLayout;
