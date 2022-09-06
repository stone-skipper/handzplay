import Head from "next/head";

import Handpose from "../components/handpose";
import Logo from "../components/UI/logo";
import Controls from "../components/controlUI/controls";
import Rules from "../components/controlUI/rules";
import Grid from "../components/grid";
import { useControlsStore, useRulesStore } from "../lib/store";
import styles from "../handsplay.module.scss";
import { useEffect } from "react";

export default function Playground() {
  const handIndicatorType = useControlsStore(
    (state) => state.handIndicatorType
  );
  const rules = useRulesStore((state) => state.rules);
  const handColor = useControlsStore((state) => state.handColor);
  const playgroundBgColor = useControlsStore(
    (state) => state.playgroundBgColor
  );

  const cameraFeed = useControlsStore((state) => state.cameraFeed);

  useEffect(() => {
    console.log(rules);
  }, [rules]);

  return (
    <div
      className={styles.playground}
      style={{ background: playgroundBgColor }}
    >
      <Head>
        <title>PLAYGROUND</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Grid color={handColor} />
      <Handpose
        handIndicatorType={handIndicatorType}
        cameraFeed={cameraFeed}
        rules={rules}
        handColor={handColor}
      />
      <div
        style={{
          display: "flex",
          width: "94vw",
          position: "absolute",
          bottom: 0,
          left: "3vw",
          justifyContent: "center",
          gap: 0,
        }}
      >
        <Rules />
        <Controls />
      </div>

      <div
        style={{
          width: "100vw",
          position: "absolute",
          top: 36,
          display: "flex",
          justifyContent: "center",
          zIndex: 51,
        }}
      >
        <div
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: 5,
            background: playgroundBgColor,
          }}
        >
          <Logo color={handColor} displayTag={false} fontSize={40} />
        </div>
      </div>
    </div>
  );
}
