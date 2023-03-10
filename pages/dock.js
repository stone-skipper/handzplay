import Head from "next/head";

import Handpose from "../components/handpose";
import Controls from "../components/controlUI/controls";
import DockUI from "../components/magicwall/dockUI";
import {
  useControlsStore,
  useRulesStore,
  useMagicWallStore,
} from "../lib/store";
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
  const openPalmMarkersL = useMagicWallStore((state) => state.openPalmMarkersL);
  const openPalmMarkersR = useMagicWallStore((state) => state.openPalmMarkersR);

  const addRule = useRulesStore((state) => state.addRule);
  const cameraFeed = useControlsStore((state) => state.cameraFeed);

  const sequence = useMagicWallStore((state) => state.sequence);
  const [openPalmL, setOpenPalmL] = useState(false);
  const [openPalmR, setOpenPalmR] = useState(false);

  useEffect(() => {
    useControlsStore.setState({ handColor: "#B9B4EC" });
    for (let i = 0; i < magicWall.length; i++) {
      addRule(magicWall[i]);
    }
  }, []);

  useEffect(() => {
    // useControlsStore.setState({ handIndicatorType: "cursor" });
    // useControlsStore.setState({ handCursorType: ["●", 50] });
    // useControlsStore.setState({ handBlur: 6 });
    // if (currentPoseR === "pointer" || currentPoseL === "pointer") {
    //   useControlsStore.setState({ handCursorType: ["➤", 24] });
    //   useControlsStore.setState({ handBlur: 0 });
    // }
    // else if (currentPoseR === "five" || currentPoseL === "five") {
    //   useControlsStore.setState({ handCursorType: ["✋", 40] });
    //   useControlsStore.setState({ handIndicatorType: "cursor" });
    // }
    // else {
    //   useControlsStore.setState({ handCursorType: ["●", 50] });
    //   useControlsStore.setState({ handBlur: 6 });
    // }
  }, [currentPoseR, currentPoseL]);

  useEffect(() => {
    if (
      Math.min(
        ...[
          openPalmMarkersL[1],
          openPalmMarkersL[3],
          openPalmMarkersL[5],
          openPalmMarkersL[7],
          openPalmMarkersL[9],
        ]
      ) === openPalmMarkersL[9] &&
      openPalmMarkersL[9] !== 0
    ) {
      setOpenPalmL(true);
    } else {
      setOpenPalmL(false);
    }
  }, [openPalmMarkersL]);

  useEffect(() => {
    if (
      Math.min(
        ...[
          openPalmMarkersR[1],
          openPalmMarkersR[3],
          openPalmMarkersR[5],
          openPalmMarkersR[7],
          openPalmMarkersR[9],
        ]
      ) === openPalmMarkersR[9] &&
      openPalmMarkersR[9] !== 0
    ) {
      setOpenPalmR(true);
    } else {
      setOpenPalmR(false);
    }
  }, [openPalmMarkersR]);

  //   useEffect(() => {
  //     if (sequence > 7) {
  //       useMagicWallStore.setState({ sequence: 0 });
  //     } else if (sequence < 0) {
  //       useMagicWallStore.setState({ sequence: 7 });
  //     }
  //   }, [sequence]);

  return (
    <div
      className={styles.playground}
      style={{ fontFamily: "TTcommonsMed" }}
      onKeyDown={(e) => {
        console.log(e.key);
        if (e.key === "1" || "2" || "3" || "4" || "0" || "5" || "6") {
          useMagicWallStore.setState({ sequence: parseInt(e.key) });
        }
      }}
      tabIndex="0"
    >
      <Head>
        <title>Handzplay Magic Wall</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div style={{ position: "absolute" }}>
        L:{openPalmMarkersL[1]}, {openPalmMarkersL[3]}, {openPalmMarkersL[5]},
        {openPalmMarkersL[7]}, {openPalmMarkersL[9]}
        <br />
        {openPalmL.toString()}
      </div>
      <DockUI open={openPalmL} />
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
