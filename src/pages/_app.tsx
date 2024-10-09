import '@/styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Analytics />
      <Head>
        <title>지메추</title>
        <meta property="og:title" content="지메추" key="title" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />;
    </>
  );
}
