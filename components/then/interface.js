import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Interface({ type, initial, onPose, trigger }) {
  const [moveDistance, setMoveDistance] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (trigger === true) {
      setMoveDistance(moveDistance + onPose.move[1]);
    }
  }, [trigger]);

  if (type === "rect") {
    return (
      <motion.div
        drag={true}
        dragElastic={0.2}
        dragMomentum={false}
        onDragEnd={(event, info) => {
          setPos({ x: info.point.x, y: info.point.y });
          setMoveDistance(0);
        }}
        center="true"
        style={{
          position: "absolute",
          zIndex: 30,
        }}
        animate={{
          backgroundColor: trigger === false ? initial.color : onPose.color,
          width: trigger === false ? initial.width : onPose.width,
          height: trigger === false ? initial.height : onPose.height,
          borderRadius: trigger === false ? initial.radius : onPose.radius,
          rotate: trigger === false ? initial.rotate : onPose.rotate,
          opacity: trigger === false ? initial.opacity : onPose.opacity,
          y: onPose.move[0] === "y" ? moveDistance + pos.y : pos.y,
          x: onPose.move[0] === "x" ? moveDistance + pos.x : pos.x,
        }}
      />
    );
  } else if (type === "circle") {
    return (
      <motion.div
        drag={true}
        dragElastic={0.2}
        dragMomentum={false}
        center="true"
        style={{
          position: "absolute",
          zIndex: 30,
        }}
        animate={{
          backgroundColor: trigger === false ? initial.color : onPose.color,
          width: trigger === false ? initial.size : onPose.size,
          height: trigger === false ? initial.size : onPose.size,
          borderRadius: trigger === false ? initial.size / 2 : onPose.size / 2,
          opacity: trigger === false ? initial.opacity : onPose.opacity,
          y: onPose.move[0] === "y" ? moveDistance + pos.y : pos.y,
          x: onPose.move[0] === "x" ? moveDistance + pos.x : pos.x,
        }}
      />
    );
  } else if (type === "text") {
    return (
      <motion.div
        drag={true}
        dragElastic={0.2}
        dragMomentum={false}
        center="true"
        style={{
          position: "absolute",
          zIndex: 30,
          textAlign: "center",
        }}
        animate={{
          fontSize: trigger === false ? initial.fontSize : onPose.fontSize,
          color: trigger === false ? initial.color : onPose.color,
          opacity: trigger === false ? initial.opacity : onPose.opacity,
          y: onPose.move[0] === "y" ? moveDistance + pos.y : pos.y,
          x: onPose.move[0] === "x" ? moveDistance + pos.x : pos.x,
        }}
      >
        {trigger === false ? initial.content : onPose.content}
      </motion.div>
    );
  }
}
