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

export default function Test() {
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
      clickRef.current.play();
    }
  }, [fingersR, fingersL, currentPoseL, currentPoseR]);

  useEffect(() => {
    // console.log(rules);
    audioRef.current.volume = vol;
  }, [vol]);

  async function copyImageToClipboard(imgElement) {
    if (!imgElement) {
      console.error("Invalid image element");
      return;
    }

    // Fetch the image as a Blob
    try {
      const response = await fetch(imgElement.src);
      const blob = await response.blob();

      // Use the Clipboard API to copy the image
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);

      console.log("Image copied to clipboard");
    } catch (err) {
      console.error("Failed to copy image to clipboard", err);
    }
  }

  useEffect(() => {
    if (snapshots.length !== 0) {
      // copyElementToClipboard(snapshots[snapshots.length - 1]);
      const imgElement = document.getElementById("latestImage");
      copyImageToClipboard(imgElement);
    }
  }, [snapshots]);

  return (
    <div
      className={styles.playground}
      style={{ background: playgroundBgColor }}
    >
      <div style={{ transform: "scaleX(-0.6) scaleY(0.6) rotate(90deg)" }}>
        <Handpose
          handIndicatorType={handIndicatorType}
          cameraFeed={cameraFeed}
          rules={rules}
          handColor={handColor}
          screenOptionalTrigger={
            fingersR[2] < cameraSize[0] * 0.7 &&
            fingersR[2] > cameraSize[0] * 0.3 &&
            fingersR[3] < cameraSize[1] * 0.7 &&
            fingersR[3] > cameraSize[1] * 0.3 &&
            fingersR[2] !== 0 &&
            currentPoseR === "pointer_clicked"
          }
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
          <div
            style={{
              width: "40vw",
              height: "40vh",
              border:
                (fingersR[2] < cameraSize[0] * 0.7 &&
                  fingersR[2] > cameraSize[0] * 0.3 &&
                  fingersR[3] < cameraSize[1] * 0.7 &&
                  fingersR[3] > cameraSize[1] * 0.3 &&
                  fingersR[2] !== 0) ||
                (fingersL[2] < cameraSize[0] * 0.7 &&
                  fingersL[2] > cameraSize[0] * 0.3 &&
                  fingersL[3] < cameraSize[1] * 0.7 &&
                  fingersL[3] > cameraSize[1] * 0.3 &&
                  fingersL[2] !== 0)
                  ? "2px solid yellow"
                  : "2px solid grey",
            }}
          ></div>
        </div>
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

      <audio
        autoPlay
        id="myaudio"
        controls
        src={"/media/click.wav"}
        loop
        ref={audioRef}
        style={{ position: "fixed", left: 0, top: 0, zIndex: 1000 }}
      ></audio>
      <audio
        id="myaudio"
        controls
        src={"/media/confirm.mp3"}
        ref={clickRef}
        style={{ position: "fixed", left: 0, top: 60, zIndex: 1000 }}
      ></audio>
      <div
        style={{
          width: "20vw",
          position: "fixed",
          right: 0,
          top: 0,
          height: "100vh",
          background: "rgba(0,0,0,0.1)",
          color: "black",
          padding: 20,
          textAlign: "center",
          flexDirection: "column",
          display: "flex",
          gap: 20,
          overflowY: "scroll",
          fontWeight: 600,
        }}
      >
        Snapshot history
        {snapshots.length !== 0 &&
          snapshots.map((info, index) => {
            return (
              <div key={"snapshot" + index}>
                <img
                  id={index === snapshots.length - 1 ? "latestImage" : ""}
                  src={info}
                  style={{
                    width: "100%",
                    aspectRatio: 1 / 1,
                    objectFit: "contain",
                    height: "auto",
                    transform: "rotate(90deg) scaleY(-1)",
                  }}
                />
              </div>
            );
          })}
      </div>
      <div
        style={{
          display: "flex",
          width: "100vw",
          position: "absolute",
          top: 0,
          left: 0,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 15,
          color: "white",
          paddingTop: 10,
          textAlign: "center",
        }}
      >
        {cameraSize}
        <br />
        Left: {currentPoseL + ": " + fingersL[2] + ", " + fingersL[3]}
        <br />
        Right: {currentPoseR + ": " + fingersR[2] + ", " + fingersR[3]}
      </div>
    </div>
  );
}
