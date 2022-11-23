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
        background: "#9CABC2",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <h1> Hello, Sam</h1>
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
          content="blah"
          display={display}
        />
        <HoverClick
          width={dashboardWidth}
          height={dashboardWidth}
          initialColor="white"
          content="blah"
          display={display}
        />
        <HoverClick
          width={dashboardWidth}
          height={dashboardWidth}
          initialColor="white"
          content="blah"
          display={display}
        />
        <HoverClick
          width={dashboardWidth}
          height={dashboardWidth}
          initialColor="white"
          content="blah"
          display={display}
        />
      </div>
    </div>
  );
}
