import React, { useRef, useState, useEffect } from "react";
import { useControlsStore, useRulesStore } from "../../lib/store";
import { line, rect, circle, star, text, clipping } from "../then/shape";
import { audio } from "../then/audio";
import { current } from "immer";
import { motion } from "framer-motion";
import Interface from "../then/interface";
import DrawCvs from "./drawCvs";
import StampCvs from "./stampCvs";
import AudioCvs from "./audioCvs";
import TranscriptCvs from "./transcriptCvs";

export default function Pose({
  videoWidth,
  videoHeight,
  pose,
  thenType,
  thenDetail,
  palmPos,
}) {
  const currentPoseL = useControlsStore((state) => state.currentPoseL);
  const currentPoseR = useControlsStore((state) => state.currentPoseR);

  const [trigger, setTrigger] = useState(false);
  const [point, setPoint] = useState({ x: 0, y: 0 });

  const pullTrigger = () => {
    if (pose[1] === "left" && pose[0] === currentPoseL) {
      console.log("left!" + currentPoseL);
      setTrigger(true);
      setPoint({ x: palmPos.lx, y: palmPos.ly });
    } else if (pose[1] === "right" && pose[0] === currentPoseR) {
      console.log("right!" + currentPoseR);
      setTrigger(true);
      setPoint({ x: palmPos.rx, y: palmPos.ry });
    } else if (
      pose[1] === "both" &&
      pose[0] === currentPoseL &&
      pose[0] === currentPoseR
    ) {
      console.log("both!" + currentPoseL);
      setTrigger(true);
      setPoint({
        x: (palmPos.lx + palmPos.rx) / 2,
        y: (palmPos.ly + palmPos.rx) / 2,
      });
    } else {
      setTrigger(false);
    }
  };

  useEffect(() => {
    pullTrigger();
  }, [palmPos]);

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
      {thenType === "draw" && (
        <DrawCvs
          videoWidth={videoWidth}
          videoHeight={videoHeight}
          trigger={trigger}
          thenDetail={thenDetail}
          point={point}
        />
      )}
      {thenType === "stamp" && (
        <StampCvs
          videoWidth={videoWidth}
          videoHeight={videoHeight}
          trigger={trigger}
          thenDetail={thenDetail}
          point={point}
        />
      )}
      {thenType === "transcript" && (
        <TranscriptCvs
          videoWidth={videoWidth}
          videoHeight={videoHeight}
          trigger={trigger}
          thenDetail={thenDetail}
          point={point}
        />
      )}
      {thenType === "audio" && (
        <AudioCvs trigger={trigger} thenDetail={thenDetail} point={point} />
      )}
    </>
  );
}
