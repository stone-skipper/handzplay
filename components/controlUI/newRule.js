import { useRulesStore } from "../../lib/store";
import shallow from "zustand/shallow";

import { useEffect, useState, useRef } from "react";
import styles from "./panels.module.scss";

import { motion } from "framer-motion";
import ScrollPicker from "./scrollPicker";
import EnumSelect from "./enumSelect";

export default function NewRule({ options, onScroll }) {
  const ruleInProgress = useRulesStore((state) => state.ruleInProgress);

  useEffect(() => {
    console.log(ruleInProgress);
  }, [ruleInProgress]);

  return (
    <>
      {ruleInProgress.ifType}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <EnumSelect
          title="Trigger"
          label="ifType"
          options={["pose", "finger"]}
        />
        <EnumSelect
          title="Result"
          label="then"
          options={["shape", "draw", "audio", "element", "stamp"]}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        {ruleInProgress.ifType === "pose" && (
          <>
            <ScrollPicker label="hand" options={["left", "right", "both"]} />
            <ScrollPicker
              label="pose"
              options={[
                "victory",
                "thumb-up",
                "spidey",
                "pointer",
                "two",
                "three",
                "four",
                "five",
              ]}
            />
          </>
        )}

        <ScrollPicker
          label="fingerA"
          options={[
            "left thumb",
            "left index",
            "left middle",
            "left ring",
            "left pinky",
            "right thumb",
            "right index",
            "right middle",
            "right ring",
            "right pinky",
          ]}
        />
        <ScrollPicker
          label="fingerB"
          options={[
            "left thumb",
            "left index",
            "left middle",
            "left ring",
            "left pinky",
            "right thumb",
            "right index",
            "right middle",
            "right ring",
            "right pinky",
          ]}
        />
        <ScrollPicker
          label="distance"
          options={[10, 20, 30, 40, 50, 60, 70, 80]}
        />
      </div>
    </>
  );
}
