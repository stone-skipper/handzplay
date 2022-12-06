import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useControlsStore, useMagicWallStore } from "../../lib/store";

export default function HoverClick({
  width,
  height,
  initialColor,
  hoverColor,
  content,
  display,
  id,
}) {
  const [hovered, setHovered] = useState(false);
  const fingersL = useControlsStore((state) => state.fingersL);
  const fingersR = useControlsStore((state) => state.fingersR);
  const selectedApp = useMagicWallStore((state) => state.selectedApp);

  const [boundary, setBoundary] = useState([0, 0]);
  const [selected, setSelected] = useState(false);
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

    if (
      (fingersL[2] > boundary[0] - (width * cameraSize[0]) / wWidth &&
        fingersL[2] < boundary[0] &&
        fingersL[3] > boundary[1] &&
        fingersL[3] < boundary[1] + (height * cameraSize[1]) / wHeight) ||
      (fingersR[2] > boundary[0] - (width * cameraSize[0]) / wWidth &&
        fingersR[2] < boundary[0] &&
        fingersR[3] > boundary[1] &&
        fingersR[3] < boundary[1] + (height * cameraSize[1]) / wHeight)
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
        // justifyContent: "center",
        // alignItems: "center",
        borderRadius: 5,
        background: initialColor,
        originX: 0,
        originY: 0,
        fontSize: 20,
        fontFamily: "TTcommonsDemiBold",
        boxShadow:
          "0px 1.56449px 1.56449px rgba(0, 42, 88, 0.08), 0px 3.12899px 3.12899px rgba(0, 42, 88, 0.08), 0px 6.25798px 6.25798px rgba(0, 42, 88, 0.08), 0px 12.516px 12.516px rgba(0, 42, 88, 0.08)",
      }}
      id={id}
      ref={ref}
      animate={{
        // background: hovered === true ? "blue" : initialColor,
        border:
          hovered === true
            ? "3px solid " + hoverColor
            : "3px solid " + initialColor,
        width: width - 6,
        height: height - 6,
        color: hovered === true ? hoverColor : "black",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <span style={{ padding: 15 }}> {content}</span>
    </motion.div>
  );
}
