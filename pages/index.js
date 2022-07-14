import Handpose from "../components/handpose";
// import Layout from "../components/layout";
import Controls from "../components/controlUI/controls";
import Rules from "../components/rulesUI/rules";
import Grid from "../components/grid";
import Logo from "../components/UI/logo";
import Footer from "../components/UI/footer";
import { useControlsStore } from "../lib/store";
import styles from "../handsplay.module.scss";

export default function Index() {
  const handIndicatorType = useControlsStore(
    (state) => state.handIndicatorType
  );
  // const currentPoseL = useControlsStore((state) => state.currentPoseL);
  // const currentPoseR = useControlsStore((state) => state.currentPoseR);

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

  return (
    <div className={styles.app}>
      <Handpose
        handIndicatorType={"blurred"}
        cameraFeed={false}
        rules={landingRules}
      />
      <div className={styles.titleWrapper}>
        <Logo color="white" displayTag={true} />
      </div>
      {/* <div style={{ position: "absolute", color: "white" }}>
        {currentPoseL} {currentPoseR}
      </div> */}
      <Footer />
    </div>
  );
}
