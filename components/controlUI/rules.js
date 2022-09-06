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
              onClick={() => {
                setRuleContent("list");
                addRule(ruleInProgress);
                removeRuleInProgress();
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
              create a new rule
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
        <p>customize rules</p>
      </div>
    </div>
  );
}
