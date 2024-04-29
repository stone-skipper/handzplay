import Handpose from "../../components/handpose";
import Logo from "../../components/UI/logo";
import About from "../../components/controlUI/about";
import Controls from "../../components/controlUI/controls";
import Rules from "../../components/controlUI/rules";
import Grid from "../../components/grid";
import { useControlsStore, useRulesStore } from "../../lib/store";
import styles from "../../handsplay.module.scss";
import { useEffect, useState } from "react";
import Template from "../../components/controlUI/template";
import Slides from "../../components/deck/slides";

export default function Deck() {
  const handIndicatorType = useControlsStore(
    (state) => state.handIndicatorType
  );

  const currentPoseL = useControlsStore((state) => state.currentPoseL);
  const currentPoseR = useControlsStore((state) => state.currentPoseR);
  //   useEffect(() => {
  //     if (handIndicatorType === "blurred") {
  //       useControlsStore.setState({ handBlur: 35 });
  //     } else if (handIndicatorType === "cursor") {
  //       useControlsStore.setState({ handBlur: 0 });
  //     } else {
  //       useControlsStore.setState({ handBlur: 0 });
  //     }
  //   }, [handIndicatorType]);

  const rules = useRulesStore((state) => state.rules);
  const handColor = useControlsStore((state) => state.handColor);
  const playgroundBgColor = useControlsStore(
    (state) => state.playgroundBgColor
  );
  const [toggleModal, setToggleModal] = useState(true);
  const cameraFeed = useControlsStore((state) => state.cameraFeed);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    useControlsStore.setState({ toggleTemplate: true });
    useControlsStore.setState({ currentTab: "none" });
    useRulesStore.setState({
      rules: [
        {
          ifType: "fingers",
          fingerA: "thumbR",
          fingerB: "indexR",
          distance: 30,
          thenType: "draw",
          thenDetail: ["white", 2], // color and linewidth
        },
      ],
    });
  }, []);

  useEffect(() => {
    if (currentPoseR === "okay") {
      setCurrent(current + 1);
    }
  }, [currentPoseR]);

  return (
    <div
      className={styles.playground}
      style={{ background: playgroundBgColor }}
    >
      <div
        style={{
          position: "absolute",
          background: "rgba(0,0,0,0.2)",
          width: "100vw",
          height: "100vh",
          left: 0,
          top: 0,
          display: toggleModal === true ? "flex" : "none",
        }}
      ></div>
      <Slides current={current} />
      <Handpose
        handIndicatorType={handIndicatorType}
        cameraFeed={cameraFeed}
        rules={rules}
        handColor={handColor}
      />
    </div>
  );
}
