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
  const [type, setType] = useState("");
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
        if
        <p>
          type :{" "}
          <span
            style={{
              opacity: type === "pose" ? 1 : 0.2,
            }}
            onClick={() => {
              setType("pose");
            }}
          >
            pose
          </span>{" "}
          <span
            style={{
              opacity: type === "relation" ? 1 : 0.2,
            }}
            onClick={() => {
              setType("relation");
            }}
          >
            relation
          </span>{" "}
          <span
            style={{
              opacity: type === "action" ? 1 : 0.2,
            }}
            onClick={() => {
              setType("action");
            }}
          >
            action
          </span>
        </p>
        <br />
        then (shapes / audios) to (move / scale) / (play)
      </div>
    </div>
  );
}
