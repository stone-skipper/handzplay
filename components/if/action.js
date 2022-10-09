import React, { useRef, useState, useEffect } from "react";
import { useControlsStore, useRulesStore } from "../../lib/store";
import { motion } from "framer-motion";
import Interface from "../then/interface";

import AudioCvs from "../then/audioCvs";

export default function Action({
  videoWidth,
  videoHeight,
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

  const pullTrigger = () => {
    if (action[1] === "left" && action[0] === currentActionL) {
      console.log("left!" + currentActionL);
      setTrigger(true);
    } else if (action[1] === "right" && action[0] === currentActionR) {
      console.log("right!" + currentActionR);
      setTrigger(true);
    } else {
      setTrigger(false);
    }
  };

  useEffect(() => {
    pullTrigger();
    console.log(currentActionL, currentActionR);
  }, [currentActionL, currentActionR]);

  return (
    <>
      {thenType === "interface" && (
        <motion.div
          style={{
            width: "fit-content",
            height: "fit-content",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Interface
            trigger={trigger}
            type={thenDetail[0]}
            initial={thenDetail[1]}
            onPose={thenDetail[2]}
          />
        </motion.div>
      )}

      {thenType === "audio" && (
        <AudioCvs trigger={trigger} thenDetail={thenDetail} point={point} />
      )}
    </>
  );
}
