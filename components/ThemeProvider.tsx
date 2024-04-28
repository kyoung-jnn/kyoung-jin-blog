'use client';

import GlobalStyles from '@/styles/global-styles';
import { Global } from '@emotion/react';
import { ThemeProvider as _ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <_ThemeProvider
      attribute="data-theme"
      enableSystem={false}
      defaultTheme="dark"
      themes={['dark', 'light']}
    >
      <Global styles={GlobalStyles} />
      {children}
    </_ThemeProvider>
  );
}

export default ThemeProvider;
