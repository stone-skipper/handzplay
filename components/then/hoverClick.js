import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useControlsStore } from "../../lib/store";

export default function HoverClick({
  width,
  height,
  initialColor,
  hoverColor,
  content,
  display,
}) {
  const [hovered, setHovered] = useState(false);
  const fingersL = useControlsStore((state) => state.fingersL);
  const fingersR = useControlsStore((state) => state.fingersR);
  const [boundary, setBoundary] = useState([0, 0]);

  const [wWidth, setwWidth] = useState(0);
  const [wHeight, setwHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setwWidth(window.innerWidth);
    setwHeight(window.innerHeight);
  }, []);

  const cameraSize = useControlsStore((state) => state.cameraSize);

  useEffect(() => {
    let boundingRect = ref.current.getBoundingClientRect();
    setBoundary([
      ((wWidth - boundingRect.x) * cameraSize[0]) / wWidth,
      (boundingRect.y * cameraSize[1]) / wHeight,
    ]);

    // console.log(
    //   fingersL[2],
    //   fingersL[3],
    //   boundary[0],
    //   boundary[0] - width / 2,
    //   boundary[1],
    //   boundary[1] + height / 2
    // );
    if (
      (fingersL[2] > boundary[0] - width &&
        fingersL[2] < boundary[0] &&
        fingersL[3] > boundary[1] &&
        fingersL[3] < boundary[1] + height) ||
      (fingersR[2] > boundary[0] - width &&
        fingersR[2] < boundary[0] &&
        fingersR[3] > boundary[1] &&
        fingersR[3] < boundary[1] + height)
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
        display: display === true ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        background: initialColor,
        originX: 0,
        originY: 0,
        fontSize: 20,
      }}
      ref={ref}
      animate={{
        // background: hovered === true ? "blue" : initialColor,
        border:
          hovered === true ? "3px solid " + hoverColor : "3px solid white",
        width: width - 6,
        height: height - 6,
        color: hovered === true ? hoverColor : "black",
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
