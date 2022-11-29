import React, { useRef, useState, useEffect } from "react";
import { useControlsStore, useRulesStore } from "../../lib/store";
import { motion } from "framer-motion";
import Interface from "../then/interface";
import ActionInterface from "../then/actionInterface";

import AudioCvs from "../then/audioCvs";

export default function Action({
  videoWidth,
  videoHeight,
  hand,
  action,
  thenType,
  thenDetail,
}) {
  const currentActionR = useControlsStore((state) => state.currentActionR);
  const currentActionL = useControlsStore((state) => state.currentActionL);
  const fingersL = useControlsStore((state) => state.fingersL);
  const fingersR = useControlsStore((state) => state.fingersR);

  const [trigger, setTrigger] = useState(false);
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [currentAction, setCurrentAction] = useState("");

  const pullTrigger = () => {
    if (hand === "left" && action === currentActionL) {
      console.log("left!" + currentActionL);
      setTrigger(true);
    } else if (hand === "right" && action === currentActionR) {
      console.log("right!" + currentActionR);
      setTrigger(true);
    } else {
      setTrigger(false);
    }
  };

  useEffect(() => {
    pullTrigger();
    console.log(currentActionL, currentActionR);
    if (currentActionL !== "") {
      setCurrentAction(currentActionL);
    } else if (currentActionR !== "") {
      setCurrentAction(currentActionR);
    }
  }, [currentActionL, currentActionR]);

  useEffect(() => {
    if (currentAction !== "") {
      setTimeout(() => {
        setCurrentAction("");
      }, 1000);
    }
  }, [currentAction]);

  return (
    <>
      {thenType === "interface" && (
        <ActionInterface
          currentAction={currentAction}
          thenDetail={thenDetail}
        />
      )}

      {thenType === "audio" && (
        <AudioCvs trigger={trigger} thenDetail={thenDetail} point={point} />
      )}
    </>
  );
}
