import { ChromePicker } from "react-color";
import { useState, useEffect, useRef } from "react";
import { useRulesStore } from "../../lib/store";
import { useOnClickOutside } from "../../lib/hook";

export default function ColorPicker({ label, arrayIndex = null }) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#555555");
  const updateRuleInProgress = useRulesStore(
    (state) => state.updateRuleInProgress
  );
  const ref = useRef();

  useEffect(() => {
    updateRuleInProgress(label, selectedColor, arrayIndex);
  }, []);
  useOnClickOutside(ref, () => setDisplayColorPicker(false));

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => {
          setDisplayColorPicker(!displayColorPicker);
        }}
        style={{
          width: "fit-content",
          // padding: 12,
          borderRadius: 2,
          color: selectedColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {selectedColor}
      </div>

      <div
        style={{
          display: displayColorPicker === true ? "block" : "none",
          position: "absolute",
          zIndex: 10,
          bottom: 35,
        }}
        ref={ref}
      >
        <ChromePicker
          disableAlpha={true}
          color={selectedColor}
          onChangeComplete={(color) => {
            setSelectedColor(color.hex);
            updateRuleInProgress(label, color.hex, arrayIndex);
          }}
        />
      </div>
    </div>
  );
}
