import { useControlsStore, useRulesStore } from "../../lib/store";
import styles from "./panels.module.scss";
import { useEffect, useState } from "react";
import Divider from "../UI/controls/divider";

import RulesList from "./rulesList";
import NewRule from "./newRule";
import { current } from "immer";

export default function Rules() {
  const rules = useRulesStore((state) => state.rules);
  const addRule = useRulesStore((state) => state.addRule);
  const currentTab = useControlsStore((state) => state.currentTab);
  const [ruleContent, setRuleContent] = useState("list"); //list or new
  const removeRuleInProgress = useRulesStore(
    (state) => state.removeRuleInProgress
  );

  useEffect(() => {
    if (currentTab !== "rules") {
      setRuleContent("list");
      removeRuleInProgress();
    }
  }, [currentTab]);
  const ruleInProgress = useRulesStore((state) => state.ruleInProgress);

  return (
    <div className={styles.wrapper} style={{ width: "52.8vw" }}>
      {ruleContent === "list" && (
        <div
          className={styles.content}
          style={{ display: currentTab === "rules" ? "flex" : "none" }}
        >
          <RulesList />
          <div
            className={styles.btn}
            onClick={() => {
              setRuleContent("new");
            }}
          >
            + create a new rule
          </div>
        </div>
      )}
      {ruleContent === "new" && (
        <>
          <NewRule />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              background: "white",
              borderRadius: 10,
              padding: "10px 16px",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px -10px 54px 0px #004DC014",
            }}
          >
            <div
              className={styles.btn}
              style={{
                color:
                  ruleInProgress.ifType !== undefined ||
                  ruleInProgress.thenType !== undefined
                    ? "#0066FF"
                    : "lightgrey",
              }}
              onClick={() => {
                if (
                  ruleInProgress.ifType !== undefined ||
                  ruleInProgress.thenType !== undefined
                ) {
                  setRuleContent("list");
                  addRule(ruleInProgress);
                  removeRuleInProgress();
                } else {
                }
              }}
            >
              add
            </div>
            <Divider direction="vertical" customSize={30} color="lightgrey" />
            <div
              className={styles.btn}
              onClick={() => {
                setRuleContent("list");
                removeRuleInProgress();
              }}
            >
              cancel
            </div>
          </div>
        </>
      )}
      <div
        className={styles.header}
        style={{
          background: "#0066FF",
          opacity: currentTab === "control" ? 0.4 : 1,
        }}
        onClick={() => {
          if (currentTab === "rules") {
            useControlsStore.setState({ currentTab: "none" });
          } else {
            useControlsStore.setState({ currentTab: "rules" });
          }
        }}
      >
        <p>rules</p>
      </div>
    </div>
  );
}
