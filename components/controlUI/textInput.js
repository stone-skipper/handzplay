import { useState, useEffect, useRef } from "react";
import { useRulesStore } from "../../lib/store";

export default function TextInput({
  label,
  arrayIndex = null,
  placeholder = "text",
  number = false,
}) {
  const updateRuleInProgress = useRulesStore(
    (state) => state.updateRuleInProgress
  );
  const [content, setContent] = useState(null);
  const baseWidth = 30;
  const [width, setWidth] = useState(0);
  const span = useRef();

  useEffect(() => {
    setWidth(span.current.offsetWidth);
    console.log(content);
  }, [content]);

  useEffect(() => {
    if (content === null && placeholder !== "text") {
      console.log("!");
      updateRuleInProgress(label, placeholder, arrayIndex);
    } else {
      updateRuleInProgress(label, content, arrayIndex);
    }
  }, []);

  return (
    <div
      style={{
        width: "fit-content",
        textAlign: "center",
        background: "#DAE4FF",
        position: "relative",
        // margin: 12,
        borderRadius: 3,
        padding: 3,
      }}
    >
      <span style={{ position: "absolute", opacity: 0 }} ref={span}>
        {content}
      </span>

      <input
        placeholder={placeholder}
        type={number === true ? "number" : "text"}
        // number={number}
        style={{
          width: baseWidth + width,
          background: "none",
          border: "none",
          outline: "none",
          textAlign: "center",
          zIndex: 10,
        }}
        min={0}
        max={500}
        onChange={(e) => {
          if (number === true && e.target.value !== "") {
            setContent(parseInt(e.target.value));
            updateRuleInProgress(label, parseInt(e.target.value), arrayIndex);
          } else if (number === true && e.target.value === "") {
            console.log("ignore!");
          } else {
            setContent(e.target.value);
            updateRuleInProgress(label, e.target.value, arrayIndex);
          }
        }}
      />
    </div>
  );
}
