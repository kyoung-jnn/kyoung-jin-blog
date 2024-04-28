import type { PropsWithChildren } from 'react';
import Footer from 'app/components/Footer';
import Header from 'app/components/Header';

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
