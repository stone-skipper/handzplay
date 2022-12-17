import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useControlsStore } from "../../lib/store";

export default function ActionInterface({ currentAction, thenDetail }) {
  const [moveDistance, setMoveDistance] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const [size, setSize] = useState(thenDetail[1]);
  const [rotate, setRotate] = useState(0);
  const [color, setColor] = useState(thenDetail[2]);
  const [text, setText] = useState(thenDetail[3]);
  useEffect(() => {
    if (thenDetail[4] === "color") {
      if (currentAction === "left") {
        setColor(thenDetail[5]);
      } else if (currentAction === "right") {
        setColor(thenDetail[6]);
      } else if (currentAction === "up") {
        setColor(thenDetail[7]);
      } else if (currentAction === "down") {
        setColor(thenDetail[8]);
      } else if (currentAction === "") {
        setColor(thenDetail[2]);
      }
    } else if (thenDetail[4] === "size") {
      if (currentAction === "left") {
        setSize(size + thenDetail[5]);
      } else if (currentAction === "right") {
        setSize(size + thenDetail[6]);
      } else if (currentAction === "up") {
        setSize(size + thenDetail[7]);
      } else if (currentAction === "down") {
        setSize(size + thenDetail[8]);
      } else if (currentAction === "") {
      }
    } else if (thenDetail[4] === "rotate") {
      if (currentAction === "left") {
        setRotate(rotate + thenDetail[5]);
      } else if (currentAction === "right") {
        setRotate(rotate + thenDetail[6]);
      } else if (currentAction === "up") {
        setRotate(rotate + thenDetail[7]);
      } else if (currentAction === "down") {
        setRotate(rotate + thenDetail[8]);
      } else if (currentAction === "") {
      }
    } else if (thenDetail[4] === "text") {
      if (currentAction === "left") {
        setText(thenDetail[5]);
      } else if (currentAction === "right") {
        setText(thenDetail[6]);
      } else if (currentAction === "up") {
        setText(thenDetail[7]);
      } else if (currentAction === "down") {
        setText(thenDetail[8]);
      } else if (currentAction === "") {
        setText(thenDetail[3]);
      }
    }
  }, [currentAction]);

  useEffect(() => {
    console.log(currentAction);
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
          }}
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
          animate={{ width: size, height: size }}
        >
          {text}
        </motion.div>
      )}
    </>
  );
}
