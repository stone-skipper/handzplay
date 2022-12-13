import Head from "next/head";

import Handpose from "../components/handpose";
import { useEffect, useState } from "react";
import Logo from "../components/UI/logo";
import Footer from "../components/UI/footer";
import { useControlsStore } from "../lib/store";
import styles from "../handsplay.module.scss";
import HandIllust01 from "../components/visual/hand01";
import HandIllust02 from "../components/visual/hand02";
import LoadingSlider from "../components/UI/loadingSlider";
import { motion } from "framer-motion";
import HandIllust03 from "../components/visual/hand03";
import HandIllust04 from "../components/visual/hand04";
import { useViewport } from "../lib/hook";
import StyledLink from "../components/UI/styledLink";

export default function Index() {
  const leftHand = useControlsStore((state) => state.leftHand);
  const rightHand = useControlsStore((state) => state.rightHand);
  const currentPoseL = useControlsStore((state) => state.currentPoseL);
  const currentPoseR = useControlsStore((state) => state.currentPoseR);

  const [isMobile, setIsMobile] = useState(false);
  const breakpoint = 640;
  useEffect(() => {
    if (window.innerWidth > breakpoint) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  });
  const { width } = useViewport();

  useEffect(() => {
    if (currentPoseL === "thumbs_up" && currentPoseR === "thumbs_up") {
      window.location.href = "/playground";
    }
  }, [currentPoseL, currentPoseR]);

  return isMobile === false ? (
    <div className={styles.app}>
      <Handpose
        handIndicatorType={"blurred"}
        cameraFeed={false}
        handColor="white"
      />

      <motion.div
        animate={{
          opacity: rightHand === true || leftHand === true ? 0 : 1,
          filter:
            rightHand === true || leftHand === true
              ? "blur(30px)"
              : "blur(0px)",
        }}
        style={{ width: "100%", height: "100%", position: "absolute", top: 0 }}
      >
        <HandIllust01 initTop="20%" initLeft="20%" top="20%" left="0" />
        <HandIllust02 initTop="33%" initLeft="50%" top="33%" left="65%" />
        <HandIllust03 initTop="46%" initLeft="28%" top="45%" left="16%" />
        <HandIllust04 initTop="9%" initLeft="52%" top="6%" left="60%" />
      </motion.div>
      <div className={styles.titleWrapper}>
        <Logo color="white" displayTag={true} fontSize={64} delay={0.6} />
        <LoadingSlider />
      </div>

      <Footer />
    </div>
  ) : (
    <div className={styles.mobile}>
      <div
        className={styles.titleWrapper}
        style={{ height: "fit-content", marginTop: "20vh" }}
      >
        <Logo color="white" displayTag={false} fontSize={45} delay={0} />

        <div
          style={{
            color: "white",
            fontSize: "0.7em",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          <p>
            playground for your hands,
            <br /> instead of your mouse
          </p>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "50vh",
          color: "white",
          fontSize: "0.6em",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          textAlign: "center",
          lineHeight: 2,
        }}
      >
        <p>
          it's not supported on mobile.
          <br />
          <br />
          In the meantime, check my{" "}
          <StyledLink
            link="https://www.instagram.com/stone.skipper"
            title="instagram"
          />
          <br />
          or{" "}
          <StyledLink
            link="https://www.handzplay.vercel.app"
            title="copy the link"
            copyToClipboard={true}
          />{" "}
          <br />
          to come back on your laptop
        </p>
      </div>
    </div>
  );
}
