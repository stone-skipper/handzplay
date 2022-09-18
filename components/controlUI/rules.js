import { useControlsStore, useRulesStore } from "../../lib/store";
import styles from "./panels.module.scss";
import { useEffect, useState } from "react";
import Divider from "../UI/controls/divider";

import RulesList from "./rulesList";
import NewRule from "./newRule";

export default function Rules() {
  const rules = useRulesStore((state) => state.rules);
  const addRule = useRulesStore((state) => state.addRule);
  const [controlToggle, setControlToggle] = useState(false);
  const [ruleContent, setRuleContent] = useState("list"); //list or new
  const removeRuleInProgress = useRulesStore(
    (state) => state.removeRuleInProgress
  );

  useEffect(() => {
    if (controlToggle === false) {
      setRuleContent("list");
      removeRuleInProgress();
    }
  }, [controlToggle]);
  const ruleInProgress = useRulesStore((state) => state.ruleInProgress);

  return (
    <div className={styles.wrapper} style={{ width: "50vw" }}>
      <div
        className={styles.content}
        style={{ display: controlToggle === true ? "flex" : "none" }}
      >
        {ruleContent === "new" && (
          <>
            <NewRule />
            <div
              className={styles.btn}
              style={{
                opacity:
                  ruleInProgress.ifType !== undefined ||
                  ruleInProgress.thenType !== undefined
                    ? 1
                    : 0.5,
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
            <div
              className={styles.btn}
              onClick={() => {
                setRuleContent("list");
                removeRuleInProgress();
              }}
            >
              cancel
            </div>
          </>
        )}
        {ruleContent === "list" && (
          <>
            <RulesList />
            <div
              className={styles.btn}
              onClick={() => {
                setRuleContent("new");
              }}
            >
              + create a new rule
            </div>
          </>
        )}
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
        <p>rules</p>
      </div>
    </div>
  );
}
