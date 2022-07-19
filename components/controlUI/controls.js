import { useControlsStore } from "../../lib/store";
import styles from "./controls.module.scss";
import { useEffect, useState } from "react";
import ColorSelect from "../UI/controls/color";
import Divider from "../UI/controls/divider";

export default function Controls() {
  const cameraFeed = useControlsStore((state) => state.cameraFeed);
  const handReady = useControlsStore((state) => state.handReady);
  const leftHand = useControlsStore((state) => state.leftHand);
  const rightHand = useControlsStore((state) => state.rightHand);
  const currentPoseL = useControlsStore((state) => state.currentPoseL);
  const currentPoseR = useControlsStore((state) => state.currentPoseR);
  const handColor = useControlsStore((state) => state.handColor);
  const handIndicatorType = useControlsStore(
    (state) => state.handIndicatorType
  );
  const fingersL = useControlsStore((state) => state.fingersL);
  const fingersR = useControlsStore((state) => state.fingersR);

  const [controlToggle, setControlToggle] = useState(true);

  return (
    <div className={styles.wrapper}>
      <div
        onClick={() => {
          setControlToggle(!controlToggle);
        }}
      >
        <p> Status {"&"} settings</p>
      </div>
      <div
        className={styles.content}
        style={{ display: controlToggle === true ? "flex" : "none" }}
      >
        <p>
          {handReady === true ? "recognizing your hand" : "loading hand..."}
        </p>
        <div style={{ display: "flex" }}>
          <p style={{ width: "50%", opacity: leftHand === true ? 1 : 0.4 }}>
            left: {currentPoseL}
          </p>
          <p style={{ width: "50%", opacity: leftHand === true ? 1 : 0.4 }}>
            right: {currentPoseR}
          </p>
        </div>

        <Divider color="lightgrey" />
        <p
          onClick={() => {
            useControlsStore.setState({ cameraFeed: !cameraFeed });
          }}
        >
          camera Feed: {cameraFeed.toString()}
        </p>
        <p
          onClick={() => {
            if (handIndicatorType === "skeleton") {
              useControlsStore.setState({ handIndicatorType: "points" });
            } else if (handIndicatorType === "points") {
              useControlsStore.setState({ handIndicatorType: "blurred" });
            } else if (handIndicatorType === "blurred") {
              useControlsStore.setState({ handIndicatorType: "skeleton" });
            }
          }}
        >
          hand type: {handIndicatorType}
        </p>

        <p style={{ display: "flex", alignItems: "center" }}>
          hand color <ColorSelect />
        </p>
        {/* <p>{fingersL.toString()}</p>
        <p>{fingersR.toString()}</p> */}
      </div>
    </div>
  );
}
