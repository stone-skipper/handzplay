import React, { useRef, useState, useEffect } from "react";
import { useControlsStore, useRulesStore } from "../../lib/store";

export default function StampCvs({
  videoWidth,
  videoHeight,
  trigger,
  point,
  thenDetail,
}) {
  const reactionRef = useRef(null);

  var scale = 2; // Change to 1 on retina screens to see blurry canvas.
  const clearBtn = useControlsStore((state) => state.clearBtn);

  const [stampArray, setStampArray] = useState([]);
  const [stampPoint, setStampPoint] = useState([]);

  useEffect(() => {
    if (stampArray.length !== 0) {
      useControlsStore.setState({ clearBtn: true });
    }
  }, [stampArray]);
  useEffect(() => {
    if (clearBtn === false) {
      setStampArray([]);
    }
  }, [clearBtn]);

  const drawInteraction = () => {
    reactionRef.current.width = Math.floor(videoWidth * scale);
    reactionRef.current.height = Math.floor(videoHeight * scale);
    const ctx = reactionRef.current.getContext("2d");
    ctx.scale(scale, scale);

    if (trigger === true) {
      setStampArray([...stampArray, { x: point.x, y: point.y }]);

      // setStampPoint(point);
    }

    if (stampArray.length !== 0) {
      for (let i = 0; i < stampArray.length; i++) {
        ctx.beginPath();

        if (thenDetail[0] === "circle") {
          ctx.arc(
            stampArray[i].x,
            stampArray[i].y,
            thenDetail[3] / 2,
            0,
            Math.PI * 2
          );
        } else if (thenDetail[0] === "rect") {
          ctx.rect(
            stampArray[i].x - thenDetail[3] / 2,
            stampArray[i].y - thenDetail[3] / 2,
            thenDetail[3],
            thenDetail[3]
          );
        } else if (thenDetail[0] === "text") {
          ctx.font = thenDetail[3] + "px Manrope";
          ctx.textAlign = "center";

          ctx.fillStyle = thenDetail[1];
          ctx.scale(-1, 1);

          ctx.fillText(thenDetail[2], -stampArray[i].x, stampArray[i].y);
          // ctx.translate(stampArray[i].x, stampArray[i].y);
        } else if (thenDetail[0] === "star") {
          drawStar(
            stampArray[i].x,
            stampArray[i].y,
            5,
            thenDetail[3] / 2,
            thenDetail[3] / 4,
            ctx
          );
        }

        if (thenDetail[2] === "fill") {
          ctx.fillStyle = thenDetail[1];
          ctx.fill();
        } else if (thenDetail[2] === "stroke") {
          ctx.strokeStyle = thenDetail[1];
          ctx.stroke();
        }
      }
    }
  };

  // useEffect(() => {
  //   if (trigger === true) {
  //     let midX = (stampPoint[0] + stampPoint[2]) / 2;
  //     let midY = (stampPoint[1] + stampPoint[3]) / 2;
  //   }
  // }, [trigger]);

  useEffect(() => {
    drawInteraction();
  }, [point]);

  return (
    <>
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
    </>
  );
}
