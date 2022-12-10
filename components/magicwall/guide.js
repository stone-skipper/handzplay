import { motion } from "framer-motion";

export default function Guide({ display = true }) {
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
        zIndex: 9,
        opacity: 0.4,
      }}
    >
      <div
        style={{
          width: "90vw",
          height: "fit-content",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "grey",
        }}
      >
        <div
          style={{
            width: "35vw",
            height: "35vw",
            borderRadius: "40vw",
            background: "pink",
          }}
        ></div>
      </div>
    </div>
  );
}
