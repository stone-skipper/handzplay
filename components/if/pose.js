import React, { useRef, useState, useEffect } from "react";
import { useControlsStore, useRulesStore } from "../../lib/store";
import { motion } from "framer-motion";
import Interface from "../then/interface";
import DrawCvs from "../then/drawCvs";
import StampCvs from "../then/stampCvs";
import AudioCvs from "../then/audioCvs";
import ShapeCvs from "../then/shapeCvs";
import TranscriptCvs from "../then/transcriptCvs";

export default function Pose({
  videoWidth,
  videoHeight,
  hand,
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
    if (hand === "left" && pose === currentPoseL) {
      console.log("left!" + currentPoseL);
      setTrigger(true);
      setPoint({ x: palmPos.lx, y: palmPos.ly });
    } else if (hand === "right" && pose === currentPoseR) {
      console.log("right!" + currentPoseR);
      setTrigger(true);
      setPoint({ x: palmPos.rx, y: palmPos.ry });
    } else if (
      hand === "both" &&
      pose === currentPoseL &&
      pose === currentPoseR
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
            type={thenDetail[0]}
            trigger={trigger}
            thenDetail={thenDetail}
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
      {thenType === "shape" && (
        <ShapeCvs
          videoWidth={videoWidth}
          videoHeight={videoHeight}
          trigger={trigger}
          points={[point.x - 10, point.y - 10, point.x + 10, point.y + 10]}
          thenDetail={thenDetail}
        />
      )}
    </>
  );
}
