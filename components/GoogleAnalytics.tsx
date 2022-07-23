import siteMetadata from '@/database/siteMetadata';
import Script from 'next/script';

export const GoogleAnalyticsScript = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${siteMetadata.analytics.google}`}
      ></Script>
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteMetadata.analytics.google}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};
