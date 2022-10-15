import { useState, useEffect } from "react";
import { useRulesStore, useControlsStore } from "../../lib/store";

export default function NoRuleStatus() {
  const rules = useRulesStore((state) => state.rules);
  return (
    <div
      style={{
        display: rules.length === 0 ? "block" : "none",
        padding: "20px 0",
        textAlign: "center",
      }}
    >
      No rule at the moment! <br />
      Create a new rule, or start from{" "}
      <span
        onClick={() => {
          useControlsStore.setState({ toggleTemplate: true });
        }}
        style={{
          color: "#0066FF",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        {"->"} template
      </span>
    </div>
  );
}
