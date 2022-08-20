import { useControlsStore, useRulesStore } from "../../lib/store";
import styles from "./panels.module.scss";
import { useEffect, useState } from "react";
import Divider from "../UI/controls/divider";
import NewRules from "./newRule";
import RuleList from "./ruleList";

export default function Rules() {
  const rules = useRulesStore((state) => state.rules);
  const addRule = useRulesStore((state) => state.addRule);
  const [controlToggle, setControlToggle] = useState(false);
  useEffect(() => {}, [rules]);

  const PoseWrapper = ({ hand, pose }) => {
    return (
      <div className={styles.trigger}>
        <div className={styles.if}>{hand}</div> hand is{" "}
        <div className={styles.if}>{pose}</div>
      </div>
    );
  };

  const RelationWrapper = ({ fingerA, fingerB, distance }) => {
    return (
      <div className={styles.trigger}>
        <div className={styles.if}>{fingerA}</div>
        <div className={styles.distanceWrapper}>
          <div className={styles.line}>
            <Divider color="rgba(48, 131, 255, 1)" direction="horizontal" />
          </div>
          <div className={styles.distance}> {distance}</div>
          <div className={styles.line}>
            <Divider color="rgba(48, 131, 255, 1)" direction="horizontal" />
          </div>
        </div>
        <div className={styles.if}>{fingerB}</div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper} style={{ width: "50vw" }}>
      <div
        className={styles.content}
        style={{ display: controlToggle === true ? "flex" : "none" }}
      >
        <NewRules />
        {/* <RuleList /> */}
      </div>
      <div
        className={styles.header}
        style={{
          background: "rgba(0, 77, 192, 1)",
        }}
        onClick={() => {
          setControlToggle(!controlToggle);
        }}
      >
        <p>customize rules</p>
      </div>
    </div>
  );
}
