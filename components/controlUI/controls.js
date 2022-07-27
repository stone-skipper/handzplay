import { useControlsStore } from "../../lib/store";
import styles from "./panels.module.scss";
import { useEffect, useState } from "react";
import ColorSelect from "../UI/controls/color";
import Divider from "../UI/controls/divider";
import HandIllust01 from "../visual/hand01";
import HandIllust02 from "../visual/hand02";
import { motion } from "framer-motion";

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

  const [controlToggle, setControlToggle] = useState(false);

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.content}
        style={{ display: controlToggle === true ? "flex" : "none" }}
      >
        <div className={styles.statusBox}>
          <div>
            <motion.div
              style={{
                position: "relative",
                scale: 0.4,
                height: 100,
                width: "90%",
              }}
            >
              <HandIllust01
                initTop={-150}
                initLeft={-320}
                top={-150}
                left={-320}
              />
              <HandIllust02
                initTop={-130}
                initLeft={140}
                top={-130}
                left={140}
              />
            </motion.div>
            <div>
              <span className={styles.status}>
                {handReady === true ? "Active" : "Loading..."}
              </span>
              <br />
              <span className={styles.title}>Hand Recognition</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              borderTop: "1px solid white",
              width: "90%",
              alignItems: "center",
              paddingTop: 6,
            }}
          >
            <div
              style={{
                width: "50%",
                opacity: leftHand === true ? 1 : 0.4,
                height: "fit-content",
              }}
            >
              <span className={styles.status}>
                {currentPoseL !== "" ? currentPoseL : "--"}
              </span>
              <br /> <span className={styles.title}>left</span>
            </div>
            <Divider direction="vertical" color="white" customSize={25} />
            <div
              style={{
                width: "50%",
                opacity: rightHand === true ? 1 : 0.4,
                height: "fit-content",
              }}
            >
              <span className={styles.status}>
                {currentPoseR !== "" ? currentPoseR : "--"}
              </span>
              <br /> <span className={styles.title}>right</span>
            </div>
          </div>
        </div>

        <div className={styles.controlWrapper}>
          <div className={styles.controlTitle}>Camera Feed</div>
          <div className={styles.options}>
            <div
              onClick={() => {
                useControlsStore.setState({ cameraFeed: true });
              }}
              style={{
                color: cameraFeed === true ? "#004DC0" : "grey",
              }}
            >
              on
            </div>
            <div className={styles.dividerPosition}>
              <Divider direction="vertical" customSize={7} color="grey" />
            </div>
            <div
              onClick={() => {
                useControlsStore.setState({ cameraFeed: false });
              }}
              style={{
                color: cameraFeed === false ? "#004DC0" : "grey",
              }}
            >
              off
            </div>
          </div>
        </div>
        <div className={styles.controlWrapper}>
          <div className={styles.controlTitle}>Hand Type</div>
          <div className={styles.options}>
            <div
              onClick={() => {
                useControlsStore.setState({ handIndicatorType: "points" });
              }}
              style={{
                color: handIndicatorType === "points" ? "#004DC0" : "grey",
              }}
            >
              point
            </div>
            <div className={styles.dividerPosition}>
              <Divider direction="vertical" customSize={7} color="grey" />
            </div>
            <div
              onClick={() => {
                useControlsStore.setState({ handIndicatorType: "skeleton" });
              }}
              style={{
                color: handIndicatorType === "skeleton" ? "#004DC0" : "grey",
              }}
            >
              skeleton
            </div>
            <div className={styles.dividerPosition}>
              <Divider direction="vertical" customSize={7} color="grey" />
            </div>
            <div
              onClick={() => {
                useControlsStore.setState({ handIndicatorType: "blurred" });
              }}
              style={{
                color: handIndicatorType === "blurred" ? "#004DC0" : "grey",
              }}
            >
              shadow
            </div>
          </div>
        </div>

        <p style={{ display: "flex", alignItems: "center" }}>
          hand color <ColorSelect />
        </p>
        <p style={{ display: "flex", alignItems: "center" }}>
          playground color <ColorSelect />
        </p>
      </motion.div>
      <div
        className={styles.header}
        style={{
          background: "rgba(0, 77, 192, 0.5)",
        }}
        onClick={() => {
          setControlToggle(!controlToggle);
        }}
      >
        <p> Status {"&"} settings</p>
      </div>
    </div>
  );
}
