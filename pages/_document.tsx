import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GoogleAnalyticsScript } from '@/components/GoogleAnalytics';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* 파비콘 */}
          <link rel="shortcut icon" href="/favicon.ico" />
          {/* Naver */}
          <meta
            name="naver-site-verification"
            content="90fde3e7dfdfe8af10193837b23f5a11239155ba"
          />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <GoogleAnalyticsScript />
          {/* 폰트 */}
          <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
          <link
            rel="stylesheet"
            as="style"
            crossOrigin="anonymous"
            href="https://cdnjs.cloudflare.com/ajax/libs/pretendard/1.3.9/variable/pretendardvariable-dynamic-subset.min.css"
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            href="/rss.xml"
            title="rss"
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
