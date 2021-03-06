import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
          <Head>
              <title>Notion Widgets</title>
              <meta name="description" content="Notion widgets" />
              <meta name="viewport" content="width=device-width"/>
              <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
      </>
  );
}

export default MyApp
