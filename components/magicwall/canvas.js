import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useControlsStore } from "../../lib/store";
import SwipeNoti from "./swipeNoti";

export default function Canvas({ display = true, notification = true }) {
  const currentActionL = useControlsStore((state) => state.currentActionL);
  const currentActionR = useControlsStore((state) => state.currentActionR);

  useEffect(() => {
    if (currentActionL === "left" || currentActionR === "left") {
      setAccept(true);
    } else if (currentActionL === "right" || currentActionR === "right") {
      setDecline(true);
    } else {
    }
  }, [currentActionL, currentActionR]);

  const [accept, setAccept] = useState(false);
  const [decline, setDecline] = useState(false);

  useEffect(() => {
    if (accept === true) {
      setTimeout(() => {
        setAccept(false);
      }, 1000);
    } else if (decline === true) {
      setTimeout(() => {
        setDecline(false);
      }, 1000);
    }
  }, [accept, decline]);

  return (
    <motion.div
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
      animate={{ opacity: display === true ? 1 : 0 }}
    >
      <motion.img
        src="magicwall/canvas.png"
        style={{ width: "130%" }}
        animate={{ opacity: notification === true ? 0.2 : 1 }}
      ></motion.img>
      <div
        style={{
          width: "100vw",
          height: "fit-content",
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          display: notification === true ? "flex" : "none",
        }}
      >
        <SwipeNoti display={notification} accept={accept} decline={decline} />
      </div>
    </motion.div>
  );
}
