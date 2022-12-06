import { motion } from "framer-motion";
import HoverClick from "../then/hoverClick";
import Clock from "./clock";

const dashboardWidth = 200;

export default function Dashboard({ display = true }) {
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
          gridTemplateRows: "repeat(2, " + dashboardWidth + "px)",
          gridTemplateColumns: "repeat(2, " + dashboardWidth + "px)",
          gap: 20,
        }}
      >
        <HoverClick
          width={dashboardWidth}
          height={dashboardWidth}
          initialColor="#EBF1F6"
          hoverColor="#7B61FF"
          content="photo"
          display={display}
          id="photo"
          gesture="okay"
        />
        <HoverClick
          width={dashboardWidth}
          height={dashboardWidth}
          initialColor="#EBF1F6"
          hoverColor="#7B61FF"
          content="canvas"
          display={display}
          id="canvas"
          gesture="okay"
        />
        <HoverClick
          width={dashboardWidth}
          height={dashboardWidth}
          initialColor="#EBF1F6"
          hoverColor="#7B61FF"
          content="wellness"
          display={display}
          id="wellness"
          gesture="okay"
        />
        <HoverClick
          width={dashboardWidth}
          height={dashboardWidth}
          initialColor="#EBF1F6"
          hoverColor="#7B61FF"
          content="call"
          display={display}
          id="call"
          gesture="okay"
        />
      </div>
    </div>
  );
}
