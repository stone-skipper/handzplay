import { ChromePicker } from "react-color";
import { useState, useEffect, useRef } from "react";
import { useRulesStore } from "../../lib/store";

export default function TextInput({ label, arrayIndex = null }) {
  const updateRuleInProgress = useRulesStore(
    (state) => state.updateRuleInProgress
  );
  const [content, setContent] = useState("");
  const baseWidth = 30;
  const [width, setWidth] = useState(0);
  const span = useRef();

  useEffect(() => {
    setWidth(span.current.offsetWidth);
  }, [content]);

  useEffect(() => {
    updateRuleInProgress(label, content, arrayIndex);
  }, []);

  return (
    <div
      style={{
        width: "fit-content",
        textAlign: "center",
        background: "lightgrey",
        position: "relative",
      }}
    >
      <span style={{ position: "absolute", opacity: 0 }} ref={span}>
        {content}
      </span>

      <input
        placeholder="text"
        style={{
          width: baseWidth + width,
          background: "none",
          border: "none",
          outline: "none",
          textAlign: "center",
          zIndex: 10,
        }}
        onChange={(e) => {
          setContent(e.target.value);
          // textRef.current = e.target.value;
          updateRuleInProgress(label, e.target.value, arrayIndex);
        }}
      />
    </div>
  );
}
