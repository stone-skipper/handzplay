import { useRulesStore } from "../../lib/store";

import { useEffect, useState, useRef } from "react";
import styles from "./panels.module.scss";

import { motion } from "framer-motion";

export default function EnumSelect({
  title,
  label,
  options,
  relatedProperty = [],
  inactive = [],
  arrayIndex = null,
}) {
  const ruleInProgress = useRulesStore((state) => state.ruleInProgress);
  const updateRuleInProgress = useRulesStore(
    (state) => state.updateRuleInProgress
  );
  const removeRuleInProgress = useRulesStore(
    (state) => state.removeRuleInProgress
  );
  const removeProperty = useRulesStore((state) => state.removeProperty);

  const [selected, setSelected] = useState("");
  useEffect(() => {
    for (let i = 0; i < relatedProperty.length; i++) {
      removeProperty(relatedProperty[i], null);
    }
  }, [selected]);

  useEffect(() => {
    if (inactive.includes(selected) === true) {
      setSelected("");
    }
  }, [ruleInProgress]);

  useEffect(() => {
    updateRuleInProgress(label, selected, arrayIndex);
  }, []);
  return (
    <div className={styles.enumWrapper}>
      {title}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 14,
        }}
      >
        {options.map((data, index) => {
          return (
            <motion.div
              key={index}
              onClick={() => {
                if (inactive.includes(data) === false) {
                  updateRuleInProgress(label, data, arrayIndex);
                  setSelected(data);
                }
                // console.log(ruleInProgress);
              }}
              style={{
                cursor: "pointer",
                textDecorationLine:
                  inactive.includes(data) === true ? "line-through" : "none",
                opacity: inactive.includes(data) === true ? 0.4 : 1,
                fontWeight: selected === data ? 600 : 500,
                color: selected === data ? "#0066FF" : "grey",
                userSelect: "none",
              }}
            >
              {selected === data && "● "}
              {data}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
