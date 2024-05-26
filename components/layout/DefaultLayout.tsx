import type { PropsWithChildren } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default DefaultLayout;
