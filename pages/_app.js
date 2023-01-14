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
        <title>Handzplay - playground for gesture interaction</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta
          name="keywords"
          content="interaction, gesture interaction, gesture, machine learning, human computer interaction, hand gesture"
        ></meta>
        <meta
          name="description"
          content="Explore hand gesture interaction by creating rules and interfaces. This website reads your hands from webcam by machine learning."
        ></meta>
        <meta property="og:title" content="Handzplay" />
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content={ogUrl} /> */}
        <meta
          property="og:image"
          content="https://smlweb-src.s3.ap-northeast-2.amazonaws.com/handz_thumb.jpg"
        />
        <meta charSet="utf-8"></meta>
        <link
          rel="preload"
          href="/font/GAINSBOR.TTF"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
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
    </Provider>
  );
}
