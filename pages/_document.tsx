import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GoogleAnalyticsScript } from '@/components/GoogleAnalytics';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* 파비콘 */}
          <link rel="shortcut icon" href="/favicon.ico" />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <GoogleAnalyticsScript />
          {/* 폰트 */}
          <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
          <link
            rel="stylesheet"
            as="style"
            crossOrigin="anonymous"
            href="https://cdnjs.cloudflare.com/ajax/libs/pretendard/1.3.6/static/pretendard.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
