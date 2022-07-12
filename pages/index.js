import Handpose from "../components/handpose";
// import Layout from "../components/layout";
import Controls from "../components/controlUI/controls";
import Rules from "../components/rulesUI/rules";
import Grid from "../components/grid";

import styles from "../handsplay.module.scss";

export default function Index() {
  return (
    <div className={styles.app}>
      <Grid />
      <Controls />
      <Rules />
      <Handpose />
    </div>
  );
}
