import Handpose from "../components/handpose";
// import Layout from "../components/layout";
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
  // const cameraFeed = useControlsStore((state) => state.cameraFeed);

  return (
    <div className={styles.playground}>
      <Grid />
      <Handpose
        handIndicatorType={handIndicatorType}
        cameraFeed={false}
        rules={rules}
      />
      <Controls />
      <Rules />
    </div>
  );
}
