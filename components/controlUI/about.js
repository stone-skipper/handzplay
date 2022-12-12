import { useControlsStore, useInviteStore } from "../../lib/store";
import styles from "./panels.module.scss";
import { useEffect, useState, useRef } from "react";
import { useOnClickOutside } from "../../lib/hook";
import { motion } from "framer-motion";

export default function About() {
  const handColor = useControlsStore((state) => state.handColor);

  const currentTab = useControlsStore((state) => state.currentTab);
  const ref = useRef();
  // useOnClickOutside(ref, () =>
  //   useControlsStore.setState({ currentTab: "none" })
  // );

  return (
    <div className={styles.wrapper} ref={ref}>
      <motion.div
        className={styles.content}
        style={{ display: currentTab === "about" ? "flex" : "none" }}
      >
        <div style={{ color: handColor, fontSize: "1.1em", lineHeight: 1.5 }}>
          Handzplay aims to explore the potential of hand gestures as a way of
          interacting with devices and interfaces. <br />
          <br />
          With any device with camera, you can use your fingers and hands to
          interact, and create new ‘rules’, defining type of trigger and
          reaction.
          <br /> Or you can create new ‘interfaces’ that changes based on your
          action, like swiping and hovering.
          <br />
          <br />
          If you have any inquiry or ideas, please reach out to me via{" "}
          <a
            style={{ color: handColor, textDecoration: "underline" }}
            href="mailto:iam.seungmee.lee@gmail.com"
            target="_blank"
          >
            {"->"} email
          </a>{" "}
          or{" "}
          <a
            style={{ color: handColor, textDecoration: "underline" }}
            href="https://www.instagram.com/stone.skipper/"
            target="_blank"
          >
            {"->"} instagram
          </a>{" "}
          <br />
          <br />
        </div>
        <div className={styles.controlWrapper}>
          <div className={styles.controlTitle}>Made by</div>
          <div className={styles.options}>
            <a
              style={{ color: "black" }}
              href="https://seungmee-lee.com"
              target="_blank"
            >
              {"->"} stone.skipper
            </a>
          </div>
        </div>
        <div className={styles.controlWrapper}>
          <div className={styles.controlTitle}>Version</div>
          <div className={styles.options}>1.2.0 (updated 2022.12.13)</div>
        </div>
        <div className={styles.controlWrapper}>
          <div className={styles.controlTitle}>References</div>
          <div className={styles.options}>
            <a
              style={{ color: "black" }}
              href="https://blog.tensorflow.org/2021/11/3D-handpose.html"
              target="_blank"
            >
              {"->"} tensorflow
            </a>{" "}
            <a
              style={{ color: "black" }}
              href="https://github.com/andypotato/fingerpose"
              target="_blank"
            >
              {"->"} fingerpose
            </a>
          </div>
        </div>
      </motion.div>
      <div
        className={styles.header}
        style={{
          background: "#4B92FD",
          opacity: currentTab === "about" || currentTab === "none" ? 1 : 0.4,
        }}
        onClick={() => {
          if (currentTab === "about") {
            useControlsStore.setState({ currentTab: "none" });
          } else {
            useControlsStore.setState({ currentTab: "about" });
          }
        }}
      >
        <p> What is this?</p>
      </div>
    </div>
  );
}
