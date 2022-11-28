import Head from "next/head";

import Handpose from "../components/handpose";
import Controls from "../components/controlUI/controls";
import AmbientMode from "../components/magicwall/ambientMode";
import Canvas from "../components/magicwall/canvas";
import Auth from "../components/magicwall/auth";
import Dashboard from "../components/magicwall/dashboard";
import { useControlsStore, useRulesStore } from "../lib/store";
import styles from "../handsplay.module.scss";
import { useEffect, useState } from "react";
import { magicWall } from "../lib/rulePreset";

export default function Playground() {
  const handIndicatorType = useControlsStore(
    (state) => state.handIndicatorType
  );
  const rules = useRulesStore((state) => state.rules);
  const handColor = useControlsStore((state) => state.handColor);
  const currentPoseR = useControlsStore((state) => state.currentPoseR);
  const currentPoseL = useControlsStore((state) => state.currentPoseL);

  const addRule = useRulesStore((state) => state.addRule);

  const cameraFeed = useControlsStore((state) => state.cameraFeed);

  const [sequence, setSequence] = useState(0);

  useEffect(() => {
    useControlsStore.setState({ handColor: "#B9B4EC" });
    for (let i = 0; i < magicWall.length; i++) {
      addRule(magicWall[i]);
    }
  }, []);

  useEffect(() => {
    if (currentPoseR === "pointer" || currentPoseL === "pointer") {
      useControlsStore.setState({ handCursorType: ["➤", 24] });
      useControlsStore.setState({ handIndicatorType: "cursor" });
    }
    // else if (currentPoseR === "five" || currentPoseL === "five") {
    //   useControlsStore.setState({ handCursorType: ["✋", 40] });
    //   useControlsStore.setState({ handIndicatorType: "cursor" });
    // }
    else {
      useControlsStore.setState({ handCursorType: ["●", 50] });
      useControlsStore.setState({ handIndicatorType: "blurDot" });
    }
  }, [currentPoseR, currentPoseL]);

  useEffect(() => {
    console.log(rules);
  }, [rules]);

  return (
    <div
      className={styles.playground}
      style={{ background: "black" }}
      onKeyDown={(e) => {
        console.log(e.key);
        if (e.key === "1" || "2" || "3" || "4" || "0") {
          setSequence(parseInt(e.key));
        }
      }}
      tabIndex="0"
    >
      <Head>
        <title>Handzplay Magic Wall</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div
        style={{
          color: "white",
          position: "fixed",
          zIndex: 10,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: 10,
            background: "green",
          }}
          onClick={() => {
            if (sequence < 4) {
              setSequence(sequence + 1);
            } else {
              setSequence(0);
            }
          }}
        >
          ↑
        </div>
        <div style={{ color: "green" }}> {sequence}</div>
        <div
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: 10,
            background: "green",
          }}
          onClick={() => {
            if (sequence < 1) {
              setSequence(4);
            } else {
              setSequence(sequence - 1);
            }
          }}
        >
          ↓
        </div>
      </div>
      <AmbientMode display={sequence === 0 ? true : false} />
      <Auth
        display={sequence === 1 ? true : false}
        detectRaisedHand={
          currentPoseL === "five" || currentPoseR === "five" ? true : false
        }
      />
      <Dashboard display={sequence === 2 ? true : false} />
      <Canvas
        display={sequence === 3 || sequence === 4 ? true : false}
        notification={sequence === 4 ? true : false}
      />

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
          marginLeft: 4,
          justifyContent: "flex-start",
        }}
      >
        <Controls />
      </div>
    </div>
  );
}
