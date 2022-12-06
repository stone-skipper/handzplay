import { motion } from "framer-motion";
import HoverClick from "../then/hoverClick";

const dashboardWidth = 400;
const dashboardHeight = 100;

import Clock from "./clock";

export default function DashboardVert({ display = true }) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: display === true ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        background: "linear-gradient(180deg, #C5D4E3 0%, #A4B8CD 100%)",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <Clock />

      <div
        style={{
          width: "fit-content",
          height: "fit-content",
          display: "grid",
          gridTemplateRows: "repeat(3, " + dashboardHeight + "px)",
          gap: 20,
        }}
      >
        <HoverClick
          width={dashboardWidth}
          height={dashboardHeight}
          initialColor="#EBF1F6"
          hoverColor="#7B61FF"
          content="photo"
          display={display}
          id="photo"
        />
        <HoverClick
          width={dashboardWidth}
          height={dashboardHeight}
          initialColor="#EBF1F6"
          hoverColor="#7B61FF"
          content="canvas"
          display={display}
          id="canvas"
        />
        <HoverClick
          width={dashboardWidth}
          height={dashboardHeight}
          initialColor="#EBF1F6"
          hoverColor="#7B61FF"
          content="wellness"
          display={display}
          id="wellness"
        />
      </div>
    </div>
  );
}
