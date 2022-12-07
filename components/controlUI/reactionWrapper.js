import { useState, useEffect } from "react";
import EnumSelect from "./enumSelect";
import { motion } from "framer-motion";
import styles from "./panels.module.scss";
import { useRulesStore } from "../../lib/store";
import ColorPicker from "./colorPicker";
import TextInput from "./textInput";
import HorizontalScrollPicker from "./horizontalScrollPicker";

export default function ReactionWrapper({ title, options, label }) {
  const [add, setAdd] = useState(false);
  const ruleInProgress = useRulesStore((state) => state.ruleInProgress);
  const removeProperty = useRulesStore((state) => state.removeProperty);
  const updateRuleInProgress = useRulesStore(
    (state) => state.updateRuleInProgress
  );
  useEffect(() => {
    //   if (add === true) {
    //     updateRuleInProgress("thenDetail", [title], 4);
    //   }
    if (add === false) {
      removeProperty(label, null);
    } else {
      updateRuleInProgress(label, [], null);
    }
  }, [add]);
  return (
    <div
      style={{
        padding: 10,
        opacity: add === true ? 1 : 0.4,
        display: "flex",
        background: "#F0F4FB",
        gap: 10,
        justifyContent: "space-between",
        borderRadius: 5,
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: 10 }}>
        <motion.div
          className={styles.delete}
          style={{
            cursor: "pointer",
            userSelect: "none",
          }}
          animate={{
            rotate: add === true ? 45 : 0,
          }}
          onClick={() => {
            setAdd(!add);
          }}
        >
          +
        </motion.div>
        <div>{title}</div>
      </div>
      {/* <HorizontalScrollPicker
        title=""
        label={label}
        arrayIndex={0}
        options={options}
      /> */}
      <EnumSelect
        title=""
        label={label}
        arrayIndex={0}
        options={options}
        display={add === true ? true : false}
      />
      {ruleInProgress[label] !== undefined &&
        ruleInProgress[label][0] === "color" && (
          <ColorPicker label={label} arrayIndex={1} />
        )}
      {ruleInProgress[label] !== undefined &&
        ruleInProgress[label][0] === "size" && (
          <TextInput
            label={label}
            arrayIndex={1}
            number={true}
            placeholder={50}
          />
        )}{" "}
      {ruleInProgress[label] !== undefined &&
        ruleInProgress[label][0] === "text" && (
          <TextInput label={label} arrayIndex={1} />
        )}{" "}
    </div>
  );
}
