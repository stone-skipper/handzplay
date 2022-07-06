import React, { useRef, useState, useEffect } from "react";
import { useControlsStore, useRulesStore } from "../lib/store";

export default function InteractionCanvas() {
  const reactionRef = useRef(null);

  const thumbL = useControlsStore((state) => state.thumbL);
  const indexL = useControlsStore((state) => state.indexL);
  const middleL = useControlsStore((state) => state.middleL);
  const ringL = useControlsStore((state) => state.ringL);
  const pinkyL = useControlsStore((state) => state.pinkyL);

  const thumbR = useControlsStore((state) => state.thumbR);
  const indexR = useControlsStore((state) => state.indexR);
  const middleR = useControlsStore((state) => state.middleR);
  const ringR = useControlsStore((state) => state.ringR);
  const pinkyR = useControlsStore((state) => state.pinkyR);

  const currentPose = useControlsStore((state) => state.currentPose);
  const rules = useRulesStore((state) => state.rules);

  const getDistance = (ax, ay, bx, by) => {
    let xDistance = ax - bx;
    let yDistance = ay - by;
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  };
  const drawInteraction = () => {
    const ctx = reactionRef.current.getContext("2d");
    console.log(thumbL);
    if (getDistance(indexL[0], indexL[1], indexR[0], indexR[1]) < 20) {
    }
    // if (currentPose === "pointer") {
    //   ctx.beginPath();
    //   ctx.moveTo(indexL[0], indexL[1]);
    //   ctx.lineTo(indexR[0], indexR[1]);
    //   ctx.strokeStyle = "blue";
    //   ctx.lineWidth = 2;
    //   ctx.stroke();
    // }
  };

  useEffect(() => {
    setInterval(() => {
      drawInteraction();
    }, 10);
  }, []);

  return (
    <div>
      <canvas
        ref={reactionRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 12,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          // transform: "scaleX(-1)",
        }}
      />
    </div>
  );
}
