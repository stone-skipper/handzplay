import { useControlsStore, useRulesStore } from "../../lib/store";
import styles from "./panels.module.scss";
import { useEffect, useState, useRef } from "react";
import Divider from "../UI/controls/divider";

import RulesList from "./rulesList";
import NewRule from "./newRule";
import NewInterface from "./newInterface";
import { useOnClickOutside } from "../../lib/hook";

export default function Rules() {
  const rules = useRulesStore((state) => state.rules);
  const drawMode = useControlsStore((state) => state.drawMode);
  const addRule = useRulesStore((state) => state.addRule);
  const currentTab = useControlsStore((state) => state.currentTab);
  const [ruleContent, setRuleContent] = useState("list"); //list or new
  const removeRuleInProgress = useRulesStore(
    (state) => state.removeRuleInProgress
  );
  const ref = useRef();
  // useOnClickOutside(ref, () =>
  //   useControlsStore.setState({ currentTab: "none" })
  // );

  useEffect(() => {
    if (currentTab !== "rules") {
      setRuleContent("list");
      removeRuleInProgress();
    }
  }, [currentTab]);
  const ruleInProgress = useRulesStore((state) => state.ruleInProgress);

  return (
    <div className={styles.wrapper} style={{ width: "52.8vw" }} ref={ref}>
      {ruleContent === "list" && (
        <>
          <div
            className={styles.content}
            style={{ display: currentTab === "rules" ? "flex" : "none" }}
          >
            <RulesList />
          </div>
          <div
            style={{
              display: currentTab === "rules" ? "flex" : "none",
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
              onClick={() => {
                setRuleContent("new");
              }}
            >
              + Create a new rule
            </div>
            <Divider direction="vertical" customSize={30} color="lightgrey" />
            <div
              className={styles.btn}
              onClick={() => {
                setRuleContent("newInter");
              }}
            >
              + Add a new interface
            </div>
            <Divider direction="vertical" customSize={30} color="lightgrey" />
            <div
              className={styles.btn}
              style={{ color: drawMode === false ? "black" : "red" }}
              onClick={() => {
                useControlsStore.setState({ drawMode: !drawMode });
                useControlsStore.setState({ currentTab: "none" });
              }}
            >
              {drawMode === false ? "+ Canvas Mode (Beta)" : "Exit Canvas Mode"}
            </div>
          </div>
        </>
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
                  ruleInProgress.ifType !== "" && ruleInProgress.thenType !== ""
                    ? "#0066FF"
                    : "lightgrey",
              }}
              onClick={() => {
                if (
                  ruleInProgress.ifType !== "" &&
                  ruleInProgress.thenType !== ""
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
      {ruleContent === "newInter" && (
        <>
          <NewInterface />
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
          opacity: currentTab === "rules" || currentTab === "none" ? 1 : 0.4,
        }}
        onClick={() => {
          if (currentTab === "rules") {
            useControlsStore.setState({ currentTab: "none" });
          } else {
            useControlsStore.setState({ currentTab: "rules" });
          }
        }}
      >
        <p>conditions</p>
      </div>
    </div>
  );
}
