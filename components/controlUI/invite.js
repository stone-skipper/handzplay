import { useControlsStore, useInviteStore } from "../../lib/store";
import styles from "./panels.module.scss";
import { useEffect, useState, useRef } from "react";
import ColorSelect from "../UI/controls/color";
import Divider from "../UI/controls/divider";
import HandIllust01 from "../visual/hand01";
import HandIllust02 from "../visual/hand02";
import { motion } from "framer-motion";

export default function Invite() {
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
  const backgroundType = useControlsStore((state) => state.backgroundType);
  const fingersL = useControlsStore((state) => state.fingersL);
  const fingersR = useControlsStore((state) => state.fingersR);
  const nameRef = useRef();
  const myId = useInviteStore((state) => state.myId);
  const inviteLink = useInviteStore((state) => state.inviteLink);
  const [controlToggle, setControlToggle] = useState(false);
  const [btnText, setBtnText] = useState("invite a friend");
  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.content}
        style={{ display: controlToggle === true ? "flex" : "none" }}
      >
        <div className={styles.controlWrapper}>
          <div className={styles.controlTitle}>Your name</div>
          <div className={styles.input}>
            <input placeholder="name" ref={nameRef} />
          </div>
        </div>
        <div className={styles.controlWrapper}>
          <div className={styles.controlTitle}>Session id</div>
          <div className={styles.options}>{myId} </div>
        </div>
        <div
          className={styles.btn}
          onClick={() => {
            if (nameRef.current.value !== "") {
              navigator.clipboard.writeText(inviteLink + nameRef.current.value);
              setBtnText("copied!");
              setTimeout(() => {
                setBtnText("waiting your friend...");
              }, 2000);
            } else {
              setBtnText("set your name first");
              setTimeout(() => {
                setBtnText("invite a friend");
              }, 2000);
            }
          }}
        >
          {btnText}
        </div>
      </motion.div>
      <div
        className={styles.header}
        style={{
          background: "rgba(0, 77, 192, 0.2)",
          color: "rgba(0, 77, 192, 1)",
        }}
        onClick={() => {
          setControlToggle(!controlToggle);
        }}
      >
        <p>Invite</p>
      </div>
    </div>
  );
}
