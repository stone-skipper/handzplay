import React, { useRef, useState, useEffect } from "react";
import { useControlsStore, useRulesStore } from "../../lib/store";
import { line, rect, circle, star, text, clipping, drawStar } from "./shape";
export default function ShapeCvs({
  videoWidth,
  videoHeight,
  trigger,
  points,
  thenDetail,
}) {
  const reactionRef = useRef(null);

  var scale = 2; // Change to 1 on retina screens to see blurry canvas.

  const drawInteraction = () => {
    reactionRef.current.width = Math.floor(videoWidth * scale);
    reactionRef.current.height = Math.floor(videoHeight * scale);
    const ctx = reactionRef.current.getContext("2d");
    ctx.scale(scale, scale);

    if (trigger === true) {
      if (thenDetail[0] === "line") {
        line(points[0], points[1], points[2], points[3], thenDetail[1], ctx);
      } else if (thenDetail[0] === "circle") {
        circle(
          points[0],
          points[1],
          points[2],
          points[3],
          thenDetail[1],
          thenDetail[2],
          ctx
        );
      } else if (thenDetail[0] === "rect") {
        rect(
          points[0],
          points[1],
          points[2],
          points[3],
          thenDetail[1],
          thenDetail[2],
          ctx
        );
      } else if (thenDetail[0] === "text") {
        text(
          points[0],
          points[1],
          points[2],
          points[3],
          thenDetail[1],
          thenDetail[2],
          thenDetail[3],
          ctx
        );
      } else if (thenDetail[0] === "star") {
        star(
          points[0],
          points[1],
          points[2],
          points[3],
          thenDetail[1],
          thenDetail[2],
          ctx
        );
      } else if (thenDetail[0] === "clipping") {
        star(
          points[0],
          points[1],
          points[2],
          points[3],
          thenDetail[1],
          thenDetail[2],
          videoWidth,
          videoHeight,
          ctx
        );
      }
    }
  };

  useEffect(() => {
    drawInteraction();
    // console.log(points);
  }, [points]);

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
