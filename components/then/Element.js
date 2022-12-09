import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useControlsStore } from "../../lib/store";

export default function Element({ currentAction, thenDetail, actionDetail }) {
  const currentPoseR = useControlsStore((state) => state.currentPoseR);
  const currentPoseL = useControlsStore((state) => state.currentPoseL);

  const fingersL = useControlsStore((state) => state.fingersL);
  const fingersR = useControlsStore((state) => state.fingersR);

  const [checkAction, setCheckAction] = useState([]);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const [moveDistance, setMoveDistance] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const [size, setSize] = useState(thenDetail[2]);
  const [rotate, setRotate] = useState(0);
  const [color, setColor] = useState(thenDetail[1]);
  const [text, setText] = useState(thenDetail[3]);

  const [boundary, setBoundary] = useState([0, 0]);

  const [wWidth, setwWidth] = useState(0);
  const [wHeight, setwHeight] = useState(0);

  const ref = useRef(null);

  useEffect(() => {
    setwWidth(window.innerWidth);
    setwHeight(window.innerHeight);
    setCheckAction(Object.getOwnPropertyNames(actionDetail));
    console.log(checkAction);

    for (const key of Object.keys(actionDetail)) {
      // console.log(key, actionDetail[key]);
      variant[key] = {
        background:
          actionDetail[key][0] === "color" ? actionDetail[key][1] : color,
        width: actionDetail[key][0] === "size" ? actionDetail[key][1] : size,
        height: actionDetail[key][0] === "size" ? actionDetail[key][1] : size,
      };
    }
  }, []);

  useEffect(() => {
    console.log(variant);
  }, [variant]);

  const cameraSize = useControlsStore((state) => state.cameraSize);

  useEffect(() => {
    if (
      checkAction.includes("hover") === true ||
      checkAction.includes("click") === true
    ) {
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
    } else {
      return;
    }
  }, [fingersL, fingersR]);

  useEffect(() => {
    if (actionDetail.hover !== undefined) {
      if (hovered === true && actionDetail.hover[0] === "text") {
        setText(actionDetail.hover[1]);
      }
    }

    if (actionDetail.click !== undefined) {
      console.log(actionDetail.click[2]);

      if (
        (currentPoseL === actionDetail.click[2] ||
          currentPoseR === actionDetail.click[2]) &&
        hovered === true
      ) {
        setClicked(true);
        console.log("clicked");
      }
    }
  }, [hovered]);

  useEffect(() => {
    if (clicked === true) {
      setTimeout(() => {
        setClicked(false);
      }, 1000);
      if (actionDetail.click[0] === "text") {
        setText(actionDetail.click[1]);
      }
    }
  }, [clicked]);

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
    if (
      checkAction.includes(currentAction) === true &&
      actionDetail[currentAction] === "text"
    ) {
      setText(actionDetail[currentAction][1]);
    }
  }, [currentAction]);

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
            borderRadius:
              checkAction.includes("hover") === true ||
              checkAction.includes("click") === true
                ? 8
                : 0,
          }}
          ref={ref}
          variants={variant}
          animate={
            checkAction.includes(currentAction) === true
              ? currentAction
              : checkAction.includes("hover") === true && hovered === true
              ? "hover"
              : checkAction.includes("click") === true && clicked === true
              ? "click"
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
            borderRadius: 5000,
          }}
          ref={ref}
          variants={variant}
          animate={
            checkAction.includes(currentAction) === true
              ? currentAction
              : checkAction.includes("hover") === true && hovered === true
              ? "hover"
              : checkAction.includes("click") === true && clicked === true
              ? "click"
              : "initial"
          }
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
            color: color,
            rotate: rotate,
          }}
          ref={ref}
          variants={variant}
          animate={
            checkAction.includes(currentAction) === true
              ? currentAction
              : checkAction.includes("hover") === true && hovered === true
              ? "hover"
              : checkAction.includes("click") === true && clicked === true
              ? "click"
              : "initial"
          }
        >
          {text}
        </motion.div>
      )}
    </>
  );
}
