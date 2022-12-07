import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useControlsStore } from "../../lib/store";

export default function Element({ currentAction, thenDetail, actionDetail }) {
  const [moveDistance, setMoveDistance] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const [size, setSize] = useState(thenDetail[2]);
  const [rotate, setRotate] = useState(0);
  const [color, setColor] = useState(thenDetail[1]);
  const [text, setText] = useState(thenDetail[3]);

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
    console.log(actionDetail);
  }, []);

  const cameraSize = useControlsStore((state) => state.cameraSize);

  useEffect(() => {
    let boundingRect = ref.current.getBoundingClientRect();
    setBoundary([
      ((wWidth - boundingRect.x) * cameraSize[0]) / wWidth,
      (boundingRect.y * cameraSize[1]) / wHeight,
    ]);

    if (
      (fingersL[2] > boundary[0] - (thenDetail[2] * cameraSize[0]) / wWidth &&
        fingersL[2] < boundary[0] &&
        fingersL[3] > boundary[1] &&
        fingersL[3] <
          boundary[1] + (thenDetail[2] * cameraSize[1]) / wHeight) ||
      (fingersR[2] > boundary[0] - (thenDetail[2] * cameraSize[0]) / wWidth &&
        fingersR[2] < boundary[0] &&
        fingersR[3] > boundary[1] &&
        fingersR[3] < boundary[1] + (thenDetail[2] * cameraSize[1]) / wHeight)
    ) {
      setHovered(true);
    } else {
      setHovered(false);
    }
  }, [fingersL, fingersR]);

  useEffect(() => {
    console.log(currentAction);
  }, [currentAction]);

  const [variant, setVariant] = useState({
    left: {},
    right: {},
    up: {},
    down: {},
    hover: {},
    click: {},
  });

  useEffect(() => {}, [actionDetail]);

  return (
    <>
      {thenDetail[0] === "rect" && (
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: color,
            color: "white",
            rotate: rotate,
          }}
          ref={ref}
          variants={variant}
          animate={{ width: size, height: size }}
        >
          {text}
        </motion.div>
      )}
      {thenDetail[0] === "circle" && (
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: color,
            color: "white",
            rotate: rotate,
            borderRadius: 10000,
          }}
          ref={ref}
          variants={variant}
          animate={{ width: size, height: size }}
        >
          {text}
        </motion.div>
      )}
      {thenDetail[0] === "text" && (
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "transparent",
            color: color,
            fontSize: size,
            rotate: rotate,
          }}
          ref={ref}
          variants={variant}
          animate={{ width: size, height: size }}
        >
          {text}
        </motion.div>
      )}
    </>
  );
}
