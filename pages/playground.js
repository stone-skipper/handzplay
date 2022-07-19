import Handpose from "../components/handpose";
// import Layout from "../components/layout";
import Logo from "../components/UI/logo";
import Controls from "../components/controlUI/controls";
import Rules from "../components/rulesUI/rules";
import Grid from "../components/grid";
import { useControlsStore, useRulesStore } from "../lib/store";
import styles from "../handsplay.module.scss";

export default function Playground() {
  const handIndicatorType = useControlsStore(
    (state) => state.handIndicatorType
  );
  const rules = useRulesStore((state) => state.rules);
  const handColor = useControlsStore((state) => state.handColor);

  return (
    <div className={styles.playground}>
      <Grid color={handColor} />
      <Handpose
        handIndicatorType={handIndicatorType}
        cameraFeed={false}
        rules={rules}
        handColor={handColor}
      />
      <Controls />
      <Rules />
      <div
        style={{
          width: "100vw",
          position: "absolute",
          top: 36,
          display: "flex",
          justifyContent: "center",
          zIndex: 51,
        }}
      >
        <div
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: 5,
            background: "#f3f3f3",
          }}
        >
          <Logo color={handColor} displayTag={false} fontSize={40} />
        </div>
      </div>
    </div>
  );
}
