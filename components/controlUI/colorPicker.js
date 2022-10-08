import { ChromePicker } from "react-color";
import { useState, useEffect } from "react";
import { useRulesStore } from "../../lib/store";

export default function ColorPicker({ label, arrayIndex = null }) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#555555");
  const updateRuleInProgress = useRulesStore(
    (state) => state.updateRuleInProgress
  );

  useEffect(() => {
    updateRuleInProgress(label, selectedColor, arrayIndex);
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => {
          setDisplayColorPicker(!displayColorPicker);
        }}
        style={{
          width: "fit-content",
          padding: 20,
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
