import { useRulesStore } from "../../lib/store";

import { useEffect, useState, useRef } from "react";
import styles from "./panels.module.scss";

import { motion } from "framer-motion";

export default function EnumSelect({ title, label, options, relatedProperty }) {
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
  return (
    <div className={styles.enumWrapper}>
      {title}
      <div style={{ display: "flex", flexDirection: "row", gap: 16 }}>
        {options.map((data, index) => {
          return (
            <motion.div
              key={index}
              onClick={async () => {
                // await removeRuleInProgress();

                updateRuleInProgress(label, data);
                setSelected(data);
                // console.log(ruleInProgress);
              }}
              style={{
                cursor: "pointer",
                fontWeight: 500,
                color: selected === data ? "blue" : "grey",
              }}
            >
              {data}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
