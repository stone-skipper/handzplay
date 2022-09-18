import { useState, useEffect } from "react";
import { useRulesStore } from "../../lib/store";

export default function NoRuleStatus() {
  const rules = useRulesStore((state) => state.rules);
  return (
    <div style={{ display: rules.length === 0 ? "block" : "none" }}>
      No rules at the moment! Create new rules
    </div>
  );
}
