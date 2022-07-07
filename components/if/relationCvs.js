import React, { useRef, useState, useEffect } from "react";
import { useControlsStore, useRulesStore } from "../../lib/store";

export default function RelationCvs(
  videoWidth,
  videoHeight,
  fingerA,
  fingerB,
  distance,
  then
) {
  const reactionRef = useRef(null);

  const fingersL = useControlsStore((state) => {
    state.fingersL;
  });
  const fingersR = useControlsStore((state) => {
    state.fingersR;
  });

  const [fingerAX, setFingerAX] = useState();
  const [fingerAY, setFingerAY] = useState();
  const [fingerBX, setFingerBX] = useState();
  const [fingerBY, setFingerBY] = useState();

  const getDistance = (ax, ay, bx, by) => {
    let xDistance = ax - bx;
    let yDistance = ay - by;
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  };

  var scale = 2; // Change to 1 on retina screens to see blurry canvas.

  const drawInteraction = () => {
    reactionRef.current.width = Math.floor(640 * scale);
    reactionRef.current.height = Math.floor(480 * scale);
    const ctx = reactionRef.current.getContext("2d");
    ctx.scale(scale, scale);

    ctx.beginPath();
    ctx.rect(fingerAX, fingerAY, 100, 100);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 1;
    ctx.stroke();

    if (getDistance(fingerAX, fingerAY, fingerBX, fingerBY) < distance) {
      // 이부분에 대해서는 then에서 함수 가져오는 방식으로
      ctx.beginPath();
      ctx.moveTo(fingerAX, fingerAY);
      ctx.lineTo(fingerBX, fingerBY);
      ctx.strokeStyle = "green";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };

  useEffect(() => {
    drawInteraction();
    console.log("canvas", fingerAX, fingerBX);
  }, [fingerAX, fingerBX]);

  useEffect(() => {
    if (fingerA === "thumbL") {
      setFingerAX(fingersL[0]);
      setFingerAX(fingersL[1]);
    } else if (fingerA === "indexL") {
    }
  }, [fingerA, fingerB]);
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
