import { useControlsStore, useRulesStore } from "../../lib/store";
import styles from "./panels.module.scss";
import { useEffect, useState } from "react";
import Divider from "../UI/controls/divider";

export default function Rules() {
  const rules = useRulesStore((state) => state.rules);

  const [controlToggle, setControlToggle] = useState(true);
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
    <div className={styles.wrapper} style={{ width: "47vw" }}>
      <div
        className={styles.content}
        style={{ display: controlToggle === true ? "flex" : "none" }}
      >
        <div style={{ display: "flex" }}>
          <p>trigger</p>
          <p>result</p>
        </div>

        <Divider color="black" />
        <div className={styles.rulesWrapper}>
          {rules.map((rule, index) => {
            return (
              <div className={styles.rule}>
                <div className={styles.number}>{index + 1}</div>
                {rule.ifType === "pose" ? (
                  <PoseWrapper hand={rule.pose[1]} pose={rule.pose[0]} />
                ) : (
                  <RelationWrapper
                    fingerA={rule.fingerA}
                    fingerB={rule.fingerB}
                    distance={rule.distance}
                  />
                )}
                <div>👉</div>
                <div className={styles.thenWrapper}>
                  <div className={styles.then}>{rule.thenType}</div>
                  <div className={styles.thenDetail}>{rule.thenDetail[0]}</div>
                </div>
                <div className={styles.delete} onClick={() => {}}>
                  ⨉
                </div>
              </div>
            );
          })}
        </div>

        <Divider color="lightgrey" />
        <div
          onClick={() => {
            useRulesStore.setState({
              rules: [
                ...rules,
                {
                  ifType: "pose",
                  pose: ["", ""],
                  thenType: "",
                  thenDetail: [""],
                },
              ],
            });
          }}
        >
          create a new rule
        </div>
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
