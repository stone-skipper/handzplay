import { motion } from "framer-motion";
import HoverClick from "../then/hoverClick";

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
        background: "#EBF1F6",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <h1>Dashboard</h1>
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
          initialColor="white"
          hoverColor="#7B61FF"
          content="photo"
          display={display}
          id="photo"
        />
        <HoverClick
          width={dashboardWidth}
          height={dashboardWidth}
          initialColor="white"
          hoverColor="#7B61FF"
          content="canvas"
          display={display}
          id="canvas"
        />
        <HoverClick
          width={dashboardWidth}
          height={dashboardWidth}
          initialColor="white"
          hoverColor="#7B61FF"
          content="wellness"
          display={display}
          id="wellness"
        />
        <HoverClick
          width={dashboardWidth}
          height={dashboardWidth}
          initialColor="white"
          hoverColor="#7B61FF"
          content="call"
          display={display}
          id="call"
        />
      </div>
    </div>
  );
}
