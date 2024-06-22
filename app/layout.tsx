import ProgressBar from '@/components/ProgressBar';

import { ReactNode } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ThemeProvider from '@/components/ThemeProvider';
import SITE_METADATA from '@/database/siteMetadata';
import { GoogleAnalyticsScript } from '@/components/GoogleAnalytics';

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        {/* 폰트 */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdnjs.cloudflare.com/ajax/libs/pretendard/1.3.9/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {/* Naver */}
        <meta
          name="naver-site-verification"
          content="90fde3e7dfdfe8af10193837b23f5a11239155ba"
        />
        {/* RSS */}
        <link
          rel="alternate"
          type="application/rss+xml"
          href={`${SITE_METADATA.siteUrl}/rss.xml`}
          title="rss"
        />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <GoogleAnalyticsScript />
      </head>
      <body>
        <ThemeProvider>
          <ProgressBar />
          <Header />
          <div>{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
