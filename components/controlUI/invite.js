import { useControlsStore, useInviteStore } from "../../lib/store";
import styles from "./panels.module.scss";
import { useEffect, useState, useRef } from "react";
import ColorSelect from "../UI/controls/color";
import Divider from "../UI/controls/divider";
import HandIllust01 from "../visual/hand01";
import HandIllust02 from "../visual/hand02";
import { motion } from "framer-motion";

export default function Invite() {
  const nameRef = useRef();
  const handColor = useControlsStore((state) => state.handColor);
  const myId = useInviteStore((state) => state.myId);
  const inviteStatus = useInviteStore((state) => state.inviteStatus);
  const inviteLink = useInviteStore((state) => state.inviteLink);
  const currentTab = useControlsStore((state) => state.currentTab);
  const [controlToggle, setControlToggle] = useState(false);
  const [btnText, setBtnText] = useState("invite a friend");
  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.content}
        style={{ display: currentTab === "invite" ? "flex" : "none" }}
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
          style={{
            width: "100%",
            height: "fit-content",
            textAlign: "center",
            padding: "20px 0",
            fontSize: "0.85em",
            opacity: 0.4,
          }}
        >
          Share the invite link to your friend.
          <br /> You'll be able to see friend's hand <br />
          as the invitation is accepted
        </div>
        <div
          className={styles.btn}
          style={{ background: handColor, color: "white" }}
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
          opacity: currentTab === "invite" || currentTab === "none" ? 1 : 0.4,

          background:
            inviteStatus === true ? "orange" : "rgba(0, 77, 192, 0.2)",
          color: inviteStatus === true ? "white" : "rgba(0, 77, 192, 1)",
        }}
        onClick={() => {
          if (currentTab === "invite") {
            useControlsStore.setState({ currentTab: "none" });
          } else {
            useControlsStore.setState({ currentTab: "invite" });
          }
        }}
      >
        <p>{inviteStatus === true ? "Connected" : "Invite"}</p>
      </div>
    </div>
  );
}
