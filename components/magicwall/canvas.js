import { motion } from "framer-motion";
import { useEffect } from "react";
import { useControlsStore } from "../../lib/store";
import HoverClick from "../then/hoverClick";

export default function Canvas({ display = true, notification = true }) {
  const currentActionL = useControlsStore((state) => state.currentActionL);
  const currentActionR = useControlsStore((state) => state.currentActionR);
  useEffect(() => {
    if (currentActionL === "left" || currentActionR === "left") {
    } else if (currentActionL === "right" || currentActionR === "right") {
    } else {
    }
  }, [currentActionL, currentActionR]);

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
      static canvas comes here
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
      >
        <motion.div
          animate={{
            opacity: notification === true ? 1 : 0,
            y: notification === true ? 0 : 20,
          }}
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: 10,
            background: "white",
            borderRadius: 4,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 60,
          }}
          transition={{ duration: 0.3 }}
        >
          John Liu is inviting you for collaboration
          <div style={{ display: "flex" }}>
            <HoverClick
              width={90}
              height={50}
              content="call"
              initialColor={"green"}
              hoverColor={"blue"}
              display={true}
            />
            <HoverClick
              width={90}
              height={50}
              content="accept"
              initialColor={"red"}
              hoverColor={"blue"}
              display={true}
            />
          </div>
          <div style={{ position: "absolute", bottom: -40, opacity: 0.5 }}>
            gesture guidance here
          </div>
        </motion.div>
      </div>
    </div>
  );
}
