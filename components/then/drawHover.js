import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useControlsStore } from "../../lib/store";

export default function DrawHover({
  width,
  height,
  top,
  left,
  initialColor,
  hoverColor,
  hoverType,
  content,
  display = true,
  radius = true,
}) {
  const [hovered, setHovered] = useState(false);
  const fingersL = useControlsStore((state) => state.fingersL);
  const fingersR = useControlsStore((state) => state.fingersR);
  const [boundary, setBoundary] = useState([0, 0]);

  const [wWidth, setwWidth] = useState(0);
  const [wHeight, setwHeight] = useState(0);
  const ref = useRef(null);

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

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
        position: "absolute",
        top: top,
        left: left,
        width: width,
        height: height,
        display: display === true ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        originX: 0,
        originY: 0,
        fontSize: 20,
        borderRadius: radius === true ? 5 : 0,
        userSelect: "none",
        zIndex: 0,
      }}
      ref={ref}
      animate={{
        background:
          hovered === true && hoverType === "color" ? hoverColor : initialColor,

        // boxShadow:
        //   hovered === true
        //     ? "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
        //     : "rgba(255, 255, 255, 0.1) 0px 0px 0px 0px inset, rgba(50, 50, 93, 0.25) 0px 0px 0px -20px, rgba(0, 0, 0, 0.3) 0px 0px 0px 0px",
        boxShadow:
          hovered === true && hoverType === "float"
            ? "rgba(" +
              hexToRgb(hoverColor).r +
              ", " +
              hexToRgb(hoverColor).g +
              ", " +
              hexToRgb(hoverColor).b +
              ", 0.1) 0px 1px 1px 0px inset, rgba(" +
              hexToRgb(hoverColor).r +
              ", " +
              hexToRgb(hoverColor).g +
              ", " +
              hexToRgb(hoverColor).b +
              ", 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
            : "rgba(" +
              hexToRgb(hoverColor).r +
              ", " +
              hexToRgb(hoverColor).g +
              ", " +
              hexToRgb(hoverColor).b +
              ", 0.1) 0px 0px 0px 0px inset, rgba(" +
              hexToRgb(hoverColor).r +
              ", " +
              hexToRgb(hoverColor).g +
              ", " +
              hexToRgb(hoverColor).b +
              ", 0.25) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 0px 0px 0px",
        // background: hovered === true ? "blue" : initialColor,
        // border:
        //   hovered === true ? "3px solid " + hoverColor : "3px solid white",
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
