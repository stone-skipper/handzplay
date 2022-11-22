import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useControlsStore } from "../../lib/store";

export default function GestureModal({ type, action, thenDetail }) {
  const [moveDistance, setMoveDistance] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handColor = useControlsStore((state) => state.handColor);

  // action will be up, down, left, right

  const variants = {
    default: { opacity: 1, rotate: 0 },
    confirm: { opacity: 0, rotate: -20, background: "green" },
    decline: { opacity: 0, rotate: 20, background: "red" },
  };

  const initial = {
    width: thenDetail[1] === "size" ? thenDetail[2] : 200,
    height: thenDetail[1] === "size" ? thenDetail[2] : 200,
    opacity: thenDetail[1] === "opacity" ? thenDetail[2] : 1,
    rotate: 0,
    radius: 0,
    color: thenDetail[1] === "color" ? thenDetail[2] : handColor,
    x: 0,
    y: 0,
    textSize: thenDetail[1] === "size" ? thenDetail[2] : 40,
    text: thenDetail[1] === "content" ? thenDetail[2] : "text",
  };

  const onPose = {
    width: thenDetail[1] === "size" ? thenDetail[3] : 200,
    height: thenDetail[1] === "size" ? thenDetail[3] : 200,
    opacity: thenDetail[1] === "opacity" ? thenDetail[3] : 1,
    rotate: 0,
    radius: 0,
    color: thenDetail[1] === "color" ? thenDetail[3] : handColor,
    x: 0,
    y: 0,
    textSize: thenDetail[1] === "size" ? thenDetail[3] : 40,
    text: thenDetail[1] === "content" ? thenDetail[3] : "text",
  };

  const [color, setColor] = useState(initial.color);

  useEffect(() => {
    console.log(action);
  }, [action]);

  //   useEffect(() => {
  //     if (trigger === true && thenDetail[1] === "position") {
  //       setMoveDistance(moveDistance + thenDetail[2]);
  //     } else if (
  //       trigger === true &&
  //       thenDetail[1] === "color" &&
  //       color === initial.color
  //     ) {
  //       setColor(onPose.color);
  //     } else if (
  //       trigger === true &&
  //       thenDetail[1] === "color" &&
  //       color === onPose.color
  //     ) {
  //       setColor(initial.color);
  //     }
  //   }, [trigger]);

  return (
    <motion.div
      style={{
        width: 100,
        height: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      animate={{}}
    >
      swipe left to 'yes', swipe right to 'no'
    </motion.div>
  );
}
