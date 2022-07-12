import { useControlsStore } from "../../lib/store";
import styles from "./controls.module.scss";
import { useEffect, useState } from "react";

export default function Controls() {
  const cameraFeed = useControlsStore((state) => state.cameraFeed);
  const handReady = useControlsStore((state) => state.handReady);
  const leftHand = useControlsStore((state) => state.leftHand);
  const rightHand = useControlsStore((state) => state.rightHand);
  const currentPoseL = useControlsStore((state) => state.currentPoseL);
  const currentPoseR = useControlsStore((state) => state.currentPoseR);

  const handIndicatorType = useControlsStore(
    (state) => state.handIndicatorType
  );
  const fingersL = useControlsStore((state) => state.fingersL);
  const fingersR = useControlsStore((state) => state.fingersR);

  // useEffect(() => {
  //   console.log(fingersL);
  // }, [fingersL]);

  const [controlToggle, setControlToggle] = useState(false);
  return (
    <div className={styles.wrapper}>
      <div
        onClick={() => {
          setControlToggle(!controlToggle);
        }}
      >
        Controls
      </div>
      <div
        className={styles.content}
        style={{ display: controlToggle === true ? "flex" : "none" }}
      >
        <p
          onClick={() => {
            useControlsStore.setState({ cameraFeed: !cameraFeed });
          }}
        >
          camera: {cameraFeed.toString()}
        </p>
        <p>handModel: {handReady.toString()}</p>
        <p
          onClick={() => {
            if (handIndicatorType === "skeleton") {
              useControlsStore.setState({ handIndicatorType: "points" });
            } else if (handIndicatorType === "points") {
              useControlsStore.setState({ handIndicatorType: "skeleton" });
            }
          }}
        >
          hand indicator: {handIndicatorType}
        </p>
        <p>
          hands:{leftHand === true ? "left" : null}
          {rightHand === true ? "right" : null}
        </p>

        <p>
          current Pose: {currentPoseL},{currentPoseR}
        </p>
        <p>{fingersL.toString()}</p>
        <p>{fingersR.toString()}</p>
      </div>
    </div>
  );
}
