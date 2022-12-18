import type { ReactNode } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SectionContainer from '@/components/SectionContainer';

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <SectionContainer>
        <main>{children}</main>
        <Footer />
      </SectionContainer>
    </>
  );
}

export default MainLayout;
