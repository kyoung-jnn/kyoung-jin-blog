import ProgressBar from '@/components/ProgressBar';

import { ReactNode } from 'react';
import Footer from 'app/components/Footer';
import Header from 'app/components/Header';
import ThemeProvider from '@/components/ThemeProvider';
import { main } from './page.css';

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </head>
      <body>
        <ThemeProvider>
          <ProgressBar />
          <Header />
          <div className={main}>{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
