// import '../styles/globals.ts';
import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import { global } from '../styles/globals';
import { SWRConfig } from 'swr';

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Global styles={global} />
      <Component {...pageProps} />
    </SWRConfig>
  );
}
