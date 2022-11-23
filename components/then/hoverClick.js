import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useControlsStore } from "../../lib/store";

export default function HoverClick({
  width,
  height,
  initialColor,
  hoverColor,
  content,
}) {
  const [hovered, setHovered] = useState(false);
  const fingersL = useControlsStore((state) => state.fingersL);
  const fingersR = useControlsStore((state) => state.fingersR);
  const [boundary, setBoundary] = useState([0, 0]);

  const [wWidth, setwWidth] = useState(0);
  const [wHeight, setwHeight] = useState(0);
  const ref = useRef();

  useEffect(() => {
    setwWidth(window.innerWidth / 2);
    setwHeight(window.innerHeight / 2);
    console.log(wWidth, wHeight);
    let boundingRect = ref.current.getBoundingClientRect();
    console.log(boundingRect);
    setBoundary([wWidth - boundingRect.x / 2, boundingRect.y / 2]);
  }, []);

  useEffect(() => {
    console.log(
      fingersL[2],
      fingersL[3],
      boundary[0],
      boundary[0] - width / 2,
      boundary[1],
      boundary[1] + height / 2
    );
    if (
      (fingersL[2] > boundary[0] - width / 2 &&
        fingersL[2] < boundary[0] &&
        fingersL[3] > boundary[1] &&
        fingersL[3] < boundary[1] + height / 2) ||
      (fingersR[2] > boundary[0] - width / 2 &&
        fingersR[2] < boundary[0] &&
        fingersR[3] > boundary[1] &&
        fingersR[3] < boundary[1] + height / 2)
    ) {
      setHovered(true);
    } else {
      setHovered(false);
    }
  }, [fingersL, fingersR]);

  return (
    <motion.div
      style={{
        width: width,
        height: height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        background: initialColor,
        originX: 0,
        originY: 0,
      }}
      ref={ref}
      animate={{
        background: hovered === true ? "blue" : initialColor,
        // border: hovered === true ? "2px solid blue" : "none",
        // scale: hovered === true ? 1.05 : 1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      {content}
    </motion.div>
  );
}
