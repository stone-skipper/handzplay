import { ChromePicker, SketchPicker } from "react-color";
import { useState, useRef } from "react";
import { useOnClickOutside } from "../../../lib/hook";
import { useControlsStore } from "../../../lib/store";

export default function ColorSelect({
  variable,
  onColorChange,
  border = false,
}) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const ref = useRef();

  useOnClickOutside(ref, () => setDisplayColorPicker(false));

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => {
          setDisplayColorPicker(!displayColorPicker);
        }}
        style={{
          width: 100,
          padding: 6,
          borderRadius: 2,
          background: variable,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          textTransform: "uppercase",
          userSelect: "none",
          cursor: "pointer",
          border:
            border === true ? "1px solid lightgrey" : "0px solid lightgrey",
        }}
      >
        {variable}
      </div>

      <div
        style={{
          display: displayColorPicker === true ? "block" : "none",
          position: "absolute",
          bottom: 38,
          right: 0,
        }}
        ref={ref}
      >
        <ChromePicker
          disableAlpha={true}
          color={variable}
          onChangeComplete={(color) => {
            onColorChange(color);
          }}
        />
      </div>
    </div>
  );
}
