import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import MainLayout from '@/components/layout/MainLayout';
import GlobalStyles from '@/styles/global-styles';
import * as ga from '@/utils/gtag';
import ProgressBar from '@/components/ProgressBar';
import { Global } from '@emotion/react';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 페이지 별 GA 적용
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Global styles={GlobalStyles} />
      <ThemeProvider attribute="data-theme" defaultTheme="light">
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <MainLayout>
          <ProgressBar />
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </>
  );
}

export default App;
