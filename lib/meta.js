import Head from "next/head";

const Meta = ({
  title,
  keywords,
  description,
  ogTitle,
  ogType,
  ogUrl,
  ogImage,
}) => {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <meta name="keywords" content={keywords}></meta>
      <meta name="description" content={description}></meta>
      <meta property="og:title" content={ogTitle} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImage} />
      <meta charSet="utf-8"></meta>
      {/* <link rel="icon" href="/favicon.ico"></link> */}
      <title>{title}</title>
    </Head>
  );
};
Meta.defaultProps = {
  title: "Handzplay - playground for gesture interaction",
  keywords:
    "interaction, gesture interaction, gesture, machine learning, human computer interaction, hand gesture",
  description:
    "This website reads your hands from webcam by machine learning. You can add rules and interfaces to explore gesture interaction by yourself.",
  ogTitle: "Handzplay",
  ogUrl: "https://smlweb-src.s3.ap-northeast-2.amazonaws.com/handz_thumb.jpg",
  ogTyoe: "website",
};

export default Meta;
