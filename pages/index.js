import Handpose from "../components/handpose";
// import Layout from "../components/layout";
import Controls from "../components/controlUI/controls";
import Rules from "../components/rulesUI/rules";
import Grid from "../components/grid";
import { useControlsStore } from "../lib/store";
import styles from "../handsplay.module.scss";

export default function Index() {
  const handIndicatorType = useControlsStore(
    (state) => state.handIndicatorType
  );
  return (
    <div className={styles.app}>
      <Grid />
      <Handpose handIndicatorType={handIndicatorType} />
      <Controls />
      <Rules />
    </div>
  );
}
