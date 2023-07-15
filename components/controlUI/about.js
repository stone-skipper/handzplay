import { useControlsStore, useInviteStore } from "../../lib/store";
import styles from "./panels.module.scss";
import { useEffect, useState, useRef } from "react";
import { useOnClickOutside } from "../../lib/hook";
import { motion } from "framer-motion";
import StyledLink from "../UI/styledLink";

export default function About({ buttonType = "long" }) {
  const handColor = useControlsStore((state) => state.handColor);

  const currentTab = useControlsStore((state) => state.currentTab);
  const ref = useRef();

  return (
    <div className={styles.wrapper} ref={ref}>
      <motion.div
        className={styles.content}
        style={{ display: currentTab === "about" ? "flex" : "none" }}
      >
        <p
          style={{
            color: handColor,
            fontSize: "1.1em",
            lineHeight: 1.5,
            letterSpacing: "normal",
            textTransform: "unset",
          }}
        >
          Handzplay aims to explore the potential of hand gestures as a way of
          interacting with devices and interfaces. <br />
          <br />
          With any device with camera, you can use your fingers and hands to
          interact, and create new ‘rules’, defining type of trigger and
          reaction. Or you can create new ‘interfaces’ that changes based on
          your action, like swiping and hovering.
          <br />
          <br />
          If you have any inquiry or ideas, please reach out to me via{" "}
          <StyledLink
            title="email"
            link="mailto:iam.seungmee.lee@gmail.com"
            color={handColor}
          />{" "}
          ,{" "}
          <StyledLink
            title="twitter"
            link="https://www.twitter.com/@smee_leee/"
            color={handColor}
          />{" "}
          or{" "}
          <StyledLink
            title="instagram"
            link="https://www.instagram.com/stone.skipper/"
            color={handColor}
          />
          <br />
          <br />
          No data will be saved here, cuz I don't know how.
        </p>

        <div className={styles.controlWrapper}>
          <div className={styles.controlTitle}>Made by</div>
          <div className={styles.options}>
            <StyledLink
              title="seungmee lee"
              link="https://www.seungmee-lee.com"
              color="black"
              underline={false}
            />
          </div>
        </div>
        <div className={styles.controlWrapper}>
          <div className={styles.controlTitle}>Version</div>
          <div className={styles.options}>1.2.0 (updated 2022.12.13)</div>
        </div>
        <div className={styles.controlWrapper}>
          <div className={styles.controlTitle}>References</div>
          <div className={styles.options}>
            <StyledLink
              title="tensorflow"
              link="https://blog.tensorflow.org/2021/11/3D-handpose.html"
              color="black"
              underline={false}
            />
            <StyledLink
              title="fingerpose"
              link="https://github.com/andypotato/fingerpose"
              color="black"
              underline={false}
            />
          </div>
        </div>
      </motion.div>
      <motion.div
        className={styles.header}
        style={{
          background: "#4B92FD",
          opacity: currentTab === "about" || currentTab === "none" ? 1 : 0.4,
          width: buttonType === "short" ? 50 : "inherit",
          height: buttonType === "short" ? 50 : "inherit",
          borderRadius: buttonType === "short" ? 50 : 6,
          fontSize: buttonType === "short" ? 16 : "inherit",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => {
          if (currentTab === "about") {
            useControlsStore.setState({ currentTab: "none" });
          } else {
            useControlsStore.setState({ currentTab: "about" });
          }
        }}
        whileHover={{ scale: buttonType === "long" ? 1 : 1.1 }}
      >
        {buttonType === "long" ? "What is this?" : "?"}
      </motion.div>
    </div>
  );
}
