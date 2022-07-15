import Handpose from "../components/handpose";
import { useEffect } from "react";
import Logo from "../components/UI/logo";
import Footer from "../components/UI/footer";
import Illust from "../components/UI/svg";
import { useControlsStore } from "../lib/store";
import styles from "../handsplay.module.scss";

export default function Index() {
  const handIndicatorType = useControlsStore(
    (state) => state.handIndicatorType
  );
  const currentPoseL = useControlsStore((state) => state.currentPoseL);
  const currentPoseR = useControlsStore((state) => state.currentPoseR);
  const handReady = useControlsStore((state) => state.handReady);
  const cameraAccess = useControlsStore((state) => state.cameraAccess);

  const landingRules = [
    {
      ifType: "pose",
      pose: ["victory", "left"], //type of gesture, left right both
      thenType: "element",
      thenDetail: [
        "rect",
        {
          color: "blue",
          opacity: 1,
          width: 100,
          height: 100,
          radius: 10,
          rotate: 0,
        }, // initial
        {
          color: "white",
          opacity: 1,
          width: 150,
          height: 100,
          radius: 10,
          rotate: 45,
          move: ["y", 20], // 'x' or 'y' as axis / movedistance
        }, //onPose
      ],
    },
  ];
  // const cameraFeed = useControlsStore((state) => state.cameraFeed);
  useEffect(() => {
    if (currentPoseL === "victory" && currentPoseR === "victory") {
      window.location.href = "/playground";
    }
  }, [currentPoseL, currentPoseR]);

  return (
    <div className={styles.app}>
      <Handpose
        handIndicatorType={"blurred"}
        cameraFeed={false}
        rules={landingRules}
      />
      <div className={styles.titleWrapper}>
        <Logo color="white" displayTag={true} fontSize={72} />
      </div>
      <div style={{ position: "absolute", color: "white", zIndex: 50, top: 0 }}>
        {cameraAccess === true ? "" : "waiting for an access to your camera"}
        {handReady === true ? "" : "opening eyes to see your hands..."}
        {handReady === true && cameraAccess === true && "I can see your hands!"}
        {currentPoseL} {currentPoseR}
      </div>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 150,
        }}
      >
        {/* <Illust /> */}
      </div>
      <Footer />
    </div>
  );
}
