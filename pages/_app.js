import Cursor from "../components/UI/cursor";
import { useCreateStore, Provider } from "../lib/store";
import Head from "next/head";
import ReactGA from "react-ga4";
import { useEffect } from "react";

import "../style.css";

export default function App({ Component, pageProps }) {
  const createStore = useCreateStore(pageProps.initialZustandState);
  useEffect(() => {
    ReactGA.initialize("G-TXL5WE7WBK");
    ReactGA.send("pageview");
  }, []);

  return (
    <Provider createStore={createStore}>
      <Head>
        <title>HANDZPLAY</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Component {...pageProps} />
      <Cursor />
    </Provider>
  );
}
