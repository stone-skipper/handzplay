import Head from "next/head";

import Handpose from "../components/handpose";
import { useEffect } from "react";
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

export default function Index() {
  const leftHand = useControlsStore((state) => state.leftHand);
  const rightHand = useControlsStore((state) => state.rightHand);
  const currentPoseL = useControlsStore((state) => state.currentPoseL);
  const currentPoseR = useControlsStore((state) => state.currentPoseR);
  const handReady = useControlsStore((state) => state.handReady);
  const cameraAccess = useControlsStore((state) => state.cameraAccess);

  const landingRules = [
    // {
    //   ifType: "pose",
    //   pose: ["victory", "left"], //type of gesture, left right both
    //   thenType: "element",
    //   thenDetail: [
    //     "rect",
    //     {
    //       color: "blue",
    //       opacity: 1,
    //       width: 100,
    //       height: 100,
    //       radius: 10,
    //       rotate: 0,
    //     }, // initial
    //     {
    //       color: "white",
    //       opacity: 1,
    //       width: 150,
    //       height: 100,
    //       radius: 10,
    //       rotate: 45,
    //       move: ["y", 20], // 'x' or 'y' as axis / movedistance
    //     }, //onPose
    //   ],
    // },
  ];
  // const cameraFeed = useControlsStore((state) => state.cameraFeed);
  useEffect(() => {
    if (currentPoseL === "thumbs_up" && currentPoseR === "thumbs_up") {
      window.location.href = "/playground";
    }
  }, [currentPoseL, currentPoseR]);

  return (
    <div className={styles.app}>
      <Head>
        <title>HANDZPLAY</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Handpose
        handIndicatorType={"blurred"}
        cameraFeed={false}
        rules={landingRules}
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
        <Logo color="white" displayTag={true} fontSize={64} delay={3} />
        <LoadingSlider />
      </div>

      <Footer />
    </div>
  );
}
