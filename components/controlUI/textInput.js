import { ChromePicker } from "react-color";
import { useState, useEffect, useRef } from "react";
import { useRulesStore } from "../../lib/store";

export default function TextInput({ label, arrayIndex = null }) {
  const updateRuleInProgress = useRulesStore(
    (state) => state.updateRuleInProgress
  );

  const textRef = useRef(null);

  //   useEffect(() => {
  //     updateRuleInProgress(label, selectedColor, arrayIndex);
  //   }, []);

  return (
    <div
      style={{
        width: "fit-content",
        padding: "0 20px",
        textAlign: "center",
        background: "grey",
        position: "relative",
      }}
    >
      <input
        placeholder="text"
        style={{
          width: "fit-content",
          background: "blue",
          border: "none",
          outline: "none",
          textAlign: "center",
          zIndex: 10,
        }}
        onChange={(e) => {
          textRef.current = e.target.value;
          updateRuleInProgress(label, e.target.value, arrayIndex);
        }}
      />
    </div>
  );
}
