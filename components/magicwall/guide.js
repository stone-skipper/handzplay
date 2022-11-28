import { motion } from "framer-motion";
import { useEffect } from "react";
import { useControlsStore } from "../../lib/store";
import HoverClick from "../then/hoverClick";

export default function Guide({ display = true }) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#EBF1F6",
        display: display === true ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        gap: 40,
      }}
    >
      <div
        style={{
          width: "100vw",
          height: "fit-content",
          position: "absolute",
          bottom: 130,
          display: "flex",
          justifyContent: "center",
          display: notification === true ? "flex" : "none",
        }}
      ></div>
    </div>
  );
}
