import { ChromePicker, SketchPicker } from "react-color";
import { useState } from "react";
import { useControlsStore } from "../../../lib/store";

export default function ColorSelect() {
  const handColor = useControlsStore((state) => state.handColor);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => {
          setDisplayColorPicker(!displayColorPicker);
        }}
        style={{
          width: "fit-content",
          padding: 10,
          borderRadius: 2,
          background: handColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {handColor}
      </div>

      <div
        style={{
          display: displayColorPicker === true ? "block" : "none",
          position: "absolute",
        }}
      >
        <ChromePicker
          disableAlpha={true}
          color={handColor}
          onChangeComplete={(color) => {
            useControlsStore.setState({ handColor: color.hex });
          }}
        />
      </div>
    </div>
  );
}
