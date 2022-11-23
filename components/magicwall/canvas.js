import { motion } from "framer-motion";

export default function Canvas({ display = true, notification = true }) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#9CABC2",
        display: display === true ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        gap: 40,
      }}
    >
      static canvas comes here
      <div
        style={{
          width: "100vw",
          height: "fit-content",
          position: "absolute",
          bottom: 40,
          display: "flex",
          justifyContent: "center",
          display: notification === true ? "flex" : "none",
        }}
      >
        <motion.div
          //   initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: notification === true ? 1 : 0,
            y: notification === true ? 0 : 20,
          }}
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: 6,
            background: "white",
            borderRadius: 4,
          }}
          transition={{ duration: 0.3 }}
        >
          notification swipe
        </motion.div>
      </div>
    </div>
  );
}
