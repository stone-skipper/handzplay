import Head from "next/head";

import Handpose from "../components/handpose";
import Logo from "../components/UI/logo";
import About from "../components/controlUI/about";
import Controls from "../components/controlUI/controls";
import Rules from "../components/controlUI/rules";
import Grid from "../components/grid";
import { useControlsStore, useRulesStore } from "../lib/store";
import styles from "../handsplay.module.scss";
import { useEffect } from "react";
import Template from "../components/controlUI/template";
import { magicWall } from "../lib/rulePreset";

export default function Playground() {
  const handIndicatorType = useControlsStore(
    (state) => state.handIndicatorType
  );
  const rules = useRulesStore((state) => state.rules);
  const handColor = useControlsStore((state) => state.handColor);
  const currentPoseR = useControlsStore((state) => state.currentPoseR);
  const currentPoseL = useControlsStore((state) => state.currentPoseL);

  const playgroundBgColor = useControlsStore(
    (state) => state.playgroundBgColor
  );
  const addRule = useRulesStore((state) => state.addRule);

  const cameraFeed = useControlsStore((state) => state.cameraFeed);

  useEffect(() => {
    useControlsStore.setState({ handColor: "#9CABC2" });
    for (let i = 0; i < magicWall.length; i++) {
      addRule(magicWall[i]);
    }
  }, []);

  useEffect(() => {
    if (currentPoseR === "pointer" || currentPoseL === "pointer") {
      useControlsStore.setState({ handIndicatorType: "cursor" });
    } else {
      useControlsStore.setState({ handIndicatorType: "blurred" });
    }
  }, [currentPoseR]);

  useEffect(() => {
    console.log(rules);
  }, [rules]);

  return (
    <div
      className={styles.playground}
      style={{ background: playgroundBgColor }}
    >
      <Head>
        <title>Handzplay Magic Wall</title>
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
          width: "100vw",
          position: "absolute",
          bottom: 4,
          gap: 4,
          justifyContent: "center",
        }}
      >
        <About />
        <Rules />
        <Controls />
      </div>

      <div
        style={{
          width: "100vw",
          position: "absolute",
          top: 18,
          display: "flex",
          justifyContent: "center",
          zIndex: 51,
        }}
      >
        <div
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "0 5px",
            background: playgroundBgColor,
          }}
        >
          <Logo
            color={handColor}
            displayTag={false}
            fontSize={40}
            text={"MAGIC WALL"}
          />
        </div>
      </div>
      <Template />
    </div>
  );
}
