import { ChromePicker, SketchPicker } from "react-color";
import { useState } from "react";
import { useControlsStore } from "../../../lib/store";

export default function ColorSelect({ variable, onColorChange }) {
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
          background: variable,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {variable}
      </div>

      <div
        style={{
          display: displayColorPicker === true ? "block" : "none",
          position: "absolute",
        }}
      >
        <ChromePicker
          disableAlpha={true}
          color={variable}
          onChangeComplete={(color) => {
            onColorChange(color);
            // useControlsStore.setState({ handColor: color.hex });
          }}
        />
      </div>
    </div>
  );
}
