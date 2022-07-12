import React, { useRef, useState, useEffect } from "react";
import { useControlsStore, useRulesStore } from "../../lib/store";
import { line, rect, circle, star, text, clipping } from "../then/shape";
import { audio } from "../then/audio";
import { current } from "immer";
import { motion } from "framer-motion";
import Element from "../then/element";

export default function PoseCvs({
  videoWidth,
  videoHeight,
  pose,
  thenType,
  thenDetail,
}) {
  const reactionRef = useRef(null);

  const fingersL = useControlsStore((state) => state.fingersL);
  const fingersR = useControlsStore((state) => state.fingersR);
  const currentPoseL = useControlsStore((state) => state.currentPoseL);
  const currentPoseR = useControlsStore((state) => state.currentPoseR);

  const [trigger, setTrigger] = useState(false);

  var scale = 2; // Change to 1 on retina screens to see blurry canvas.

  const pullTrigger = () => {
    if (pose[1] === "left" && pose[0] === currentPoseL) {
      console.log("left!" + currentPoseL);
      setTrigger(true);
    } else if (pose[1] === "right" && pose[0] === currentPoseR) {
      console.log("right!" + currentPoseR);
      setTrigger(true);
    } else if (
      pose[1] === "both" &&
      pose[0] === currentPoseL &&
      pose[0] === currentPoseR
    ) {
      console.log("both!" + currentPoseL);
      setTrigger(true);
    } else {
      setTrigger(false);
    }
  };

  useEffect(() => {
    console.log(trigger);
  }, [trigger]);

  useEffect(() => {
    pullTrigger();
    console.log(currentPoseL, currentPoseR);
  }, [currentPoseL, currentPoseR]);

  return (
    <motion.div
      style={{
        width: "fit-content",
        height: "fit-content",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Element
        trigger={trigger}
        type={thenDetail[0]}
        initial={thenDetail[1]}
        onPose={thenDetail[2]}
      />
    </motion.div>
  );
}
