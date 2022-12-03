import { useControlsStore, useRulesStore } from "../../lib/store";
import styles from "./panels.module.scss";
import { useEffect, useState } from "react";
import Divider from "../UI/controls/divider";
import NoRuleStatus from "./noRuleStatus";

export default function RulesList() {
  const rules = useRulesStore((state) => state.rules);
  const removeRule = useRulesStore((state) => state.removeRule);

  useEffect(() => {
    console.log(rules);
  }, [rules]);

  const PoseWrapper = ({ hand, pose }) => {
    return (
      <div className={styles.trigger}>
        <div className={styles.if}>{hand}</div>{" "}
        {hand === "both" ? "hands are" : "hand is"}{" "}
        <div className={styles.if}>{pose}</div>
      </div>
    );
  };

  const ActionWrapper = ({ hand, action }) => {
    return (
      <div className={styles.trigger}>
        <div className={styles.if}>{hand}</div> hand swipes
        <div className={styles.if}>{action}</div>
      </div>
    );
  };
  const InterfaceWrapper = ({ type, property }) => {
    return (
      <div className={styles.trigger}>
        <div className={styles.if}>{type}</div> to change
        <div className={styles.if}>{property}</div>
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
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: "55%", paddingBottom: 6 }}>Trigger</div>
        <div style={{ width: "45%", paddingBottom: 6 }}>Result</div>
      </div>

      <Divider color="black" direction="horizontal" />
      <div className={styles.rulesWrapper}>
        <NoRuleStatus />
        {rules.map((rule, index) => {
          return (
            <div className={styles.rule}>
              <div className={styles.number}>{index + 1}</div>
              {rule.ifType === "pose" && (
                <PoseWrapper hand={rule.hand} pose={rule.pose} />
              )}
              {rule.ifType === "action" && rule.thenType === "audio" && (
                <ActionWrapper hand={rule.hand} action={rule.action} />
              )}
              {rule.ifType === "action" && rule.thenType === "interface" && (
                <InterfaceWrapper
                  type={rule.thenDetail[0]}
                  property={rule.thenDetail[4]}
                />
              )}
              {rule.ifType === "fingers" && (
                <RelationWrapper
                  fingerA={rule.fingerA}
                  fingerB={rule.fingerB}
                  distance={rule.distance}
                />
              )}
              <div>👉</div>
              <div className={styles.thenWrapper}>
                <div className={styles.then}>{rule.thenType}</div>
                <div className={styles.thenDetail}>
                  {rule.thenDetail !== undefined && rule.thenDetail.toString()}
                </div>
              </div>
              <div
                className={styles.delete}
                onClick={() => {
                  console.log(index);
                  removeRule(index);
                }}
              >
                ⨉
              </div>
            </div>
          );
        })}
      </div>

      <Divider color="lightgrey" direction="horizontal" />
    </>
  );
}
