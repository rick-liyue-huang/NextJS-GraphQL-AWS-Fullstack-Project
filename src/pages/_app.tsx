import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import createEmotionCache from '../createEmotionCache';
import theme from '../theme';

import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import { HeaderComponent } from '../components/HeaderComponent';
import AuthProvider from '../context/AuthContext';

Amplify.configure({
  ...awsconfig,
  ssr: true,
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <HeaderComponent />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </CacheProvider>
  );
}
