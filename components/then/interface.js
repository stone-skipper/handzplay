import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useControlsStore } from "../../lib/store";

export default function Interface({ type, trigger, thenDetail }) {
  const [moveDistance, setMoveDistance] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handColor = useControlsStore((state) => state.handColor);

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
    if (trigger === true && thenDetail[1] === "position") {
      setMoveDistance(moveDistance + thenDetail[2]);
    } else if (
      trigger === true &&
      thenDetail[1] === "color" &&
      color === initial.color
    ) {
      setColor(onPose.color);
    } else if (
      trigger === true &&
      thenDetail[1] === "color" &&
      color === onPose.color
    ) {
      setColor(initial.color);
    }
  }, [trigger]);

  return (
    <div style={{ width: initial.width, height: initial.height }}>
      {type === "rect" && (
        <motion.div
          drag={true}
          dragElastic={0.2}
          dragMomentum={false}
          onDragEnd={(event, info) => {
            setPos({
              x: info.point.x - window.innerWidth / 2,
              y: info.point.y - window.innerHeight / 2,
            });
            setMoveDistance(0);
          }}
          // center="true"
          style={{
            position: "absolute",
            zIndex: 30,
          }}
          animate={{
            backgroundColor: color,
            width: trigger === false ? initial.width : onPose.width,
            height: trigger === false ? initial.height : onPose.height,
            borderRadius: trigger === false ? initial.radius : onPose.radius,
            rotate: trigger === false ? initial.rotate : onPose.rotate,
            opacity: trigger === false ? initial.opacity : onPose.opacity,
            y: thenDetail[3] === "y" ? moveDistance : 0,
            x: thenDetail[3] === "x" ? moveDistance : 0,
          }}
        />
      )}
      {type === "circle" && (
        <motion.div
          // center="true"
          drag={true}
          dragElastic={0.2}
          dragMomentum={false}
          onDragEnd={(event, info) => {
            setPos({
              x: info.point.x - window.innerWidth / 2,
              y: info.point.y - window.innerHeight / 2,
            });
            setMoveDistance(0);
          }}
          style={{
            position: "absolute",
            zIndex: 30,
            borderRadius: 3000,
          }}
          animate={{
            backgroundColor: color,
            width: trigger === false ? initial.width : onPose.width,
            height: trigger === false ? initial.height : onPose.height,
            rotate: trigger === false ? initial.rotate : onPose.rotate,
            opacity: trigger === false ? initial.opacity : onPose.opacity,
            y: thenDetail[3] === "y" ? moveDistance + pos.y : pos.y,
            x: thenDetail[3] === "x" ? moveDistance + pos.x : pos.x,
          }}
        />
      )}
      {type === "text" && (
        <motion.div
          // center="true"
          drag={true}
          dragElastic={0.2}
          dragMomentum={false}
          onDragEnd={(event, info) => {
            setPos({
              x: info.point.x - window.innerWidth / 2,
              y: info.point.y - window.innerHeight / 2,
            });
            setMoveDistance(0);
          }}
          style={{
            position: "absolute",
            zIndex: 30,
            radius: 3000,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          animate={{
            backgroundColor: color,
            fontSize: trigger === false ? initial.textSize : onPose.textSize,
            width: trigger === false ? initial.width : onPose.width,
            height: trigger === false ? initial.height : onPose.height,
            borderRadius: trigger === false ? initial.radius : onPose.radius,
            rotate: trigger === false ? initial.rotate : onPose.rotate,
            opacity: trigger === false ? initial.opacity : onPose.opacity,
            y: thenDetail[3] === "y" ? moveDistance + pos.y : pos.y,
            x: thenDetail[3] === "x" ? moveDistance + pos.x : pos.x,
            color: "white",
          }}
        >
          {trigger === false ? initial.text : onPose.text}
        </motion.div>
      )}
    </div>
  );
}
