import { useRulesStore } from "../../lib/store";

import { useEffect, useState, useRef } from "react";
import styles from "./panels.module.scss";

import { motion } from "framer-motion";

export default function EnumSelect({ title, label, options }) {
  const ruleInProgress = useRulesStore((state) => state.ruleInProgress);
  const updateRuleInProgress = useRulesStore(
    (state) => state.updateRuleInProgress
  );
  const [selected, setSelected] = useState("");

  return (
    <div className={styles.enumWrapper}>
      {title}
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        {options.map((data, index) => {
          return (
            <motion.div
              key={index}
              onClick={() => {
                updateRuleInProgress(label, data);
                setSelected(data);
                // console.log(ruleInProgress);
              }}
              style={{
                cursor: "pointer",
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
