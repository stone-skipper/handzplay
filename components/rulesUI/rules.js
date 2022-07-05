import { useControlsStore } from "../../lib/store";
import styles from "./rules.module.scss";
import { useState } from "react";

export default function Rules() {
  const cameraFeed = useControlsStore((state) => state.cameraFeed);
  const handReady = useControlsStore((state) => state.handReady);
  const leftHand = useControlsStore((state) => state.leftHand);
  const rightHand = useControlsStore((state) => state.rightHand);
  const currentPose = useControlsStore((state) => state.currentPose);
  const handIndicatorType = useControlsStore(
    (state) => state.handIndicatorType
  );

  const [rulesToggle, setRulesToggle] = useState(false);
  return (
    <div className={styles.wrapper}>
      <div
        onClick={() => {
          setRulesToggle(!rulesToggle);
        }}
      >
        Rules
      </div>
      <div
        className={styles.content}
        style={{ display: rulesToggle === true ? "flex" : "none" }}
      >
        if (pose / relation / action)
        <br />
        then (shapes / audios) to (move / scale) / (play)
      </div>
    </div>
  );
}
