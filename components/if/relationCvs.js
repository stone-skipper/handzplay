import React, { useRef, useState, useEffect } from "react";
import { useControlsStore, useRulesStore } from "../../lib/store";
import {
  line,
  rect,
  circle,
  star,
  text,
  clipping,
  stamp,
  bubble,
} from "../then/shape";
import { audio } from "../then/audio";
import { trace } from "../then/trace";

export default function RelationCvs({
  videoWidth,
  videoHeight,
  fingersSelected,
  distance,
  thenType,
  thenDetail,
}) {
  const reactionRef = useRef(null);

  const fingersL = useControlsStore((state) => state.fingersL);
  const fingersR = useControlsStore((state) => state.fingersR);
  var fingersSelectedCoord = [];
  const [trigger, setTrigger] = useState(false);

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

    //shape
    if (
      fingersSelectedCoord.length !== 0 &&
      thenType === "shape" &&
      thenDetail[0] === "line" &&
      getDistance(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y
      ) < distance
    ) {
      line(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y,
        thenDetail[1],
        ctx
      );
    } else if (
      fingersSelectedCoord.length !== 0 &&
      thenType === "shape" &&
      thenDetail[0] === "circle" &&
      getDistance(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y
      ) < distance
    ) {
      circle(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y,
        thenDetail[1],
        thenDetail[2],
        ctx
      );
    } else if (
      fingersSelectedCoord.length !== 0 &&
      thenType === "shape" &&
      thenDetail[0] === "text" &&
      getDistance(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y
      ) < distance
    ) {
      text(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y,
        thenDetail[1],
        thenDetail[2],
        thenDetail[3],
        ctx
      );
    } else if (
      fingersSelectedCoord.length !== 0 &&
      thenType === "shape" &&
      thenDetail[0] === "star" &&
      getDistance(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y
      ) < distance
    ) {
      star(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y,
        thenDetail[1],
        thenDetail[2],
        ctx
      );
    } else if (
      fingersSelectedCoord.length !== 0 &&
      thenType === "shape" &&
      thenDetail[0] === "rect" &&
      getDistance(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y
      ) < distance
    ) {
      rect(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y,
        thenDetail[1],
        thenDetail[2],
        ctx
      );
    } else if (
      fingersSelectedCoord.length !== 0 &&
      thenType === "audio" &&
      getDistance(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y
      ) < distance &&
      getDistance(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y
      ) !== 0
    ) {
      audio(thenDetail[0]);
    } else if (
      fingersSelectedCoord.length !== 0 &&
      thenType === "trace" &&
      getDistance(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y
      ) < distance
    ) {
      let midX = (fingersSelectedCoord[0].x + fingersSelectedCoord[1].x) / 2;
      let midY = (fingersSelectedCoord[0].y + fingersSelectedCoord[1].y) / 2;
      setTrigger(true);
      trace(midX, midY, thenDetail[0], ctx);
    } else if (
      fingersSelectedCoord.length !== 0 &&
      thenType === "trace" &&
      getDistance(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y
      ) > distance
    ) {
      setTrigger(false);
    } else if (
      fingersSelectedCoord.length !== 0 &&
      thenType === "shape" &&
      thenDetail[0] === "clipping" &&
      getDistance(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y
      ) < distance &&
      getDistance(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y
      ) !== 0
    ) {
      clipping(
        fingersSelectedCoord[0].x, //ax
        fingersSelectedCoord[0].y, //ay
        fingersSelectedCoord[1].x, //bx
        fingersSelectedCoord[1].y, //by
        thenDetail[1], // type of clipping shape
        thenDetail[2], // color
        videoWidth, // canvas width
        videoHeight, // cavans height
        ctx
      );
    } else if (
      fingersSelectedCoord.length !== 0 &&
      thenType === "stamp" &&
      getDistance(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y
      ) < distance &&
      getDistance(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y
      ) !== 0
    ) {
      stamp(
        fingersSelectedCoord[0].x, //ax
        fingersSelectedCoord[0].y, //ay
        fingersSelectedCoord[1].x, //bx
        fingersSelectedCoord[1].y, //by
        thenDetail[0], // type of stamping shape
        thenDetail[1], // color
        thenDetail[2], // fillType
        ctx
      );
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
