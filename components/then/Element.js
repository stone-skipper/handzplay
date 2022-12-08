import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useControlsStore } from "../../lib/store";

export default function Element({ currentAction, thenDetail, actionDetail }) {
  const [checkAction, setCheckAction] = useState([]);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const [moveDistance, setMoveDistance] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const [size, setSize] = useState(thenDetail[2]);
  const [rotate, setRotate] = useState(0);
  const [color, setColor] = useState(thenDetail[1]);
  const [text, setText] = useState(thenDetail[3]);

  const fingersL = useControlsStore((state) => state.fingersL);
  const fingersR = useControlsStore((state) => state.fingersR);
  const [boundary, setBoundary] = useState([0, 0]);

  const [wWidth, setwWidth] = useState(0);
  const [wHeight, setwHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setwWidth(window.innerWidth);
    setwHeight(window.innerHeight);
    setCheckAction(Object.getOwnPropertyNames(actionDetail));
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
    if (text !== thenDetail[3]) {
      setTimeout(() => {
        setText(thenDetail[3]);
      }, 1000);
    }
  }, [text]);

  const [variant, setVariant] = useState({
    initial: { width: size, height: size, rotate: rotate, background: color },
  });

  useEffect(() => {
    // console.log(Object.getOwnPropertyNames(actionDetail));
    if (actionDetail.left !== undefined) {
      setVariant({
        ...variant,
        left: {
          background:
            actionDetail.left[0] === "color" ? actionDetail.left[1] : color,
          width: actionDetail.left[0] === "size" ? actionDetail.left[1] : size,
          height: actionDetail.left[0] === "size" ? actionDetail.left[1] : size,
        },
      });
      if (actionDetail.left[0] === "text" && currentAction === "left") {
        setText(actionDetail.left[1]);
        setTimeout(() => {
          setText(thenDetail[3]);
        }, 1000);
      }
    }
    if (actionDetail.right !== undefined) {
      setVariant({
        ...variant,
        right: {
          background:
            actionDetail.right[0] === "color" ? actionDetail.right[1] : color,
          width:
            actionDetail.right[0] === "size" ? actionDetail.right[1] : size,
          height:
            actionDetail.right[0] === "size" ? actionDetail.right[1] : size,
        },
      });
      if (actionDetail.right[0] === "text" && currentAction === "right") {
        setText(actionDetail.right[1]);
      }
    }
    if (actionDetail.up !== undefined) {
      setVariant({
        ...variant,
        up: {
          background:
            actionDetail.up[0] === "color" ? actionDetail.up[1] : color,
          width: actionDetail.up[0] === "size" ? actionDetail.up[1] : size,
          height: actionDetail.up[0] === "size" ? actionDetail.up[1] : size,
        },
      });
      if (actionDetail.up[0] === "text" && currentAction === "up") {
        setText(actionDetail.up[1]);
      }
    }
    if (actionDetail.down !== undefined) {
      setVariant({
        ...variant,
        down: {
          background:
            actionDetail.down[0] === "color" ? actionDetail.down[1] : color,
          width: actionDetail.down[0] === "size" ? actionDetail.down[1] : size,
          height: actionDetail.down[0] === "size" ? actionDetail.down[1] : size,
        },
      });
      if (actionDetail.down[0] === "text" && currentAction === "down") {
        setText(actionDetail.down[1]);
      }
    }
  }, [actionDetail]);

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
          animate={
            checkAction.includes(currentAction) === true
              ? currentAction
              : "initial"
          }
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
