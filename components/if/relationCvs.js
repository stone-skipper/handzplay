import React, { useRef, useState, useEffect } from "react";
import { useControlsStore, useRulesStore } from "../../lib/store";

export default function RelationCvs({
  videoWidth,
  videoHeight,
  fingersSelected,
  distance,
  then,
}) {
  const reactionRef = useRef(null);

  const fingersL = useControlsStore((state) => state.fingersL);
  const fingersR = useControlsStore((state) => state.fingersR);
  var fingersSelectedCoord = [];

  const getDistance = (ax, ay, bx, by) => {
    let xDistance = ax - bx;
    let yDistance = ay - by;
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  };

  var scale = 2; // Change to 1 on retina screens to see blurry canvas.

  const drawInteraction = () => {
    reactionRef.current.width = Math.floor(videoWidth * scale);
    reactionRef.current.height = Math.floor(videoHeight * scale);
    const ctx = reactionRef.current.getContext("2d");
    ctx.scale(scale, scale);

    if (
      fingersSelectedCoord.length !== 0 &&
      getDistance(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y
      ) < distance
    ) {
      // 이부분에 대해서는 then에서 함수 가져오는 방식으로
      ctx.beginPath();
      ctx.moveTo(fingersSelectedCoord[0].x, fingersSelectedCoord[0].y);
      ctx.lineTo(fingersSelectedCoord[1].x, fingersSelectedCoord[1].y);
      ctx.strokeStyle = "green";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };

  useEffect(() => {
    if (fingersSelected !== undefined) {
      for (let i = 0; i < fingersSelected.length; i++) {
        if (fingersSelected[i] === "thumbL") {
          fingersSelectedCoord.push({ x: fingersL[0], y: fingersL[1] });
        } else if (fingersSelected[i] === "indexL") {
          fingersSelectedCoord.push({ x: fingersL[2], y: fingersL[3] });
        } else if (fingersSelected[i] === "middleL") {
          fingersSelectedCoord.push({ x: fingersL[4], y: fingersL[5] });
        } else if (fingersSelected[i] === "ringL") {
          fingersSelectedCoord.push({ x: fingersL[6], y: fingersL[7] });
        } else if (fingersSelected[i] === "pinkyL") {
          fingersSelectedCoord.push({ x: fingersL[8], y: fingersL[9] });
        } else if (fingersSelected[i] === "thumbR") {
          fingersSelectedCoord.push({ x: fingersR[0], y: fingersR[1] });
        } else if (fingersSelected[i] === "indexR") {
          fingersSelectedCoord.push({ x: fingersR[2], y: fingersR[3] });
        } else if (fingersSelected[i] === "middleR") {
          fingersSelectedCoord.push({ x: fingersR[4], y: fingersR[5] });
        } else if (fingersSelected[i] === "ringR") {
          fingersSelectedCoord.push({ x: fingersR[6], y: fingersR[7] });
        } else if (fingersSelected[i] === "pinkyR") {
          fingersSelectedCoord.push({ x: fingersR[8], y: fingersR[9] });
        }
      }
    }
    drawInteraction();
  }, [fingersL, fingersR]);

  return (
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
        transform: "scaleX(-1)",
      }}
    />
  );
}
