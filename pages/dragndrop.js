import Handpose from "../components/handpose";
import ThreeScene from "../components/three";
import Logo from "../components/UI/logo";
import About from "../components/controlUI/about";
import Controls from "../components/controlUI/controls";
import Rules from "../components/controlUI/rules";
import Grid from "../components/grid";
import { useControlsStore, useRulesStore } from "../lib/store";
import styles from "../handsplay.module.scss";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function DragNDrop() {
  const audioRef = useRef();
  const clickRef = useRef();
  const [vol, setVol] = useState(1);
  const handIndicatorType = useControlsStore(
    (state) => state.handIndicatorType
  );
  const rules = useRulesStore((state) => state.rules);
  const handColor = useControlsStore((state) => state.handColor);
  const playgroundBgColor = useControlsStore(
    (state) => state.playgroundBgColor
  );
  const currentPoseL = useControlsStore((state) => state.currentPoseL);
  const currentPoseR = useControlsStore((state) => state.currentPoseR);
  const fingersR = useControlsStore((state) => state.fingersR);
  const fingersL = useControlsStore((state) => state.fingersL);
  const cameraSize = useControlsStore((state) => state.cameraSize);
  const snapshots = useControlsStore((state) => state.snapshots);
  const [clipboardImage, setClipboardImage] = useState(null);

  const addRule = useRulesStore((state) => state.addRule);

  const cameraFeed = useControlsStore((state) => state.cameraFeed);

  useEffect(() => {
    // audioRef.current.play();

    useControlsStore.setState({ toggleTemplate: true });
    useControlsStore.setState({ currentTab: "none" });
    useControlsStore.setState({ isScreenOptional: true });
    // for (let i = 0; i < screenOptional.length; i++) {
    //   addRule(screenOptional[i]);
    // }
    // audioEl.load();
  }, []);
  const handlePaste = async (event) => {
    event.preventDefault();
    const items = event.clipboardData.items;

    for (const item of items) {
      if (item.type.startsWith("image")) {
        const file = item.getAsFile();
        const imgSrc = URL.createObjectURL(file);
        setClipboardImage(imgSrc);
        break;
      }
    }
  };

  useEffect(() => {
    if (
      (fingersR[2] < cameraSize[0] * 0.7 &&
        fingersR[2] > cameraSize[0] * 0.3 &&
        fingersR[3] < cameraSize[1] * 0.7 &&
        fingersR[3] > cameraSize[1] * 0.3 &&
        fingersR[2] !== 0 &&
        currentPoseR === "Lpointer") ||
      (fingersL[2] < cameraSize[0] * 0.7 &&
        fingersL[2] > cameraSize[0] * 0.3 &&
        fingersL[3] < cameraSize[1] * 0.7 &&
        fingersL[3] > cameraSize[1] * 0.3 &&
        fingersL[2] !== 0 &&
        currentPoseL === "Lpointer")
    ) {
      setVol(1);
    } else if (
      (fingersR[2] !== 0 && currentPoseR === "Lpointer") ||
      (fingersL[2] !== 0 && currentPoseL === "Lpointer")
    ) {
      setVol(0.2);
    } else {
      setVol(0);
    }

    if (
      (fingersR[2] < cameraSize[0] * 0.7 &&
        fingersR[2] > cameraSize[0] * 0.3 &&
        fingersR[3] < cameraSize[1] * 0.7 &&
        fingersR[3] > cameraSize[1] * 0.3 &&
        fingersR[2] !== 0 &&
        currentPoseR === "pointer_clicked") ||
      (fingersL[2] < cameraSize[0] * 0.7 &&
        fingersL[2] > cameraSize[0] * 0.3 &&
        fingersL[3] < cameraSize[1] * 0.7 &&
        fingersL[3] > cameraSize[1] * 0.3 &&
        fingersL[2] !== 0 &&
        currentPoseL === "pointer_clicked")
    ) {
      // clickRef.current.play();
    }
  }, [fingersR, fingersL, currentPoseL, currentPoseR]);

  useEffect(() => {
    // console.log(rules);
    // audioRef.current.volume = vol;
  }, [vol]);

  function findMidpoint(x1, y1, x2, y2) {
    const xm = (x1 + x2) / 2;
    const ym = (y1 + y2) / 2;
    return { xm, ym };
  }
  return (
    <div
      className={styles.playground}
      style={{ background: playgroundBgColor }}
      onPaste={handlePaste}
    >
      <Handpose
        handIndicatorType={handIndicatorType}
        cameraFeed={cameraFeed}
        rules={rules}
        handColor={handColor}
      />
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <motion.div
          style={{
            background: "yellow",
            position: "absolute",
            top: 0,
            left: 0,
            width: 50,
            height: 50,
          }}
          animate={{
            x:
              findMidpoint(
                fingersR[0],
                fingersR[1],
                fingersR[2],
                fingersR[3].xm
              ) - 25,
            y:
              findMidpoint(
                fingersR[0],
                fingersR[1],
                fingersR[2],
                fingersR[3].ym
              ) - 25,
          }}
          transition={{ duration: 0 }}
        >
          <img src={clipboardImage !== null ? image : ""} alt="image" />
        </motion.div>
      </div>

      <div
        style={{
          display: "flex",
          width: "100vw",
          position: "absolute",
          bottom: 4,
          gap: 4,
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        {/* <About />
        <Rules /> */}
        <Controls />
      </div>
    </div>
  );
}
