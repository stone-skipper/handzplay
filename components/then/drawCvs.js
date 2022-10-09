import React, { useRef, useState, useEffect } from "react";
import { useControlsStore, useRulesStore } from "../../lib/store";

export default function DrawCvs({
  videoWidth,
  videoHeight,
  trigger,
  point,

  thenDetail,
}) {
  const reactionRef = useRef(null);

  var scale = 2; // Change to 1 on retina screens to see blurry canvas.
  const clearBtn = useControlsStore((state) => state.clearBtn);

  const [drawArray, setDrawArray] = useState([]);
  const [lineArray, setLineArray] = useState([]);

  useEffect(() => {
    if (lineArray.length !== 0 || drawArray.length !== 0) {
      useControlsStore.setState({ clearBtn: true });
    }
  }, [lineArray, drawArray]);
  useEffect(() => {
    if (clearBtn === false) {
      setLineArray([]);
      setDrawArray([]);
    }
  }, [clearBtn]);

  const drawInteraction = () => {
    reactionRef.current.width = Math.floor(videoWidth * scale);
    reactionRef.current.height = Math.floor(videoHeight * scale);
    const ctx = reactionRef.current.getContext("2d");
    ctx.scale(scale, scale);
    ctx.globalCompositeOperation = "destination-over";

    if (trigger === true) {
      setDrawArray([...drawArray, { x: point.x, y: point.y }]);
    }

    // for drawing. Reference at http://jsfiddle.net/NWBV4/10/
    if (lineArray.length !== 0) {
      console.log(lineArray);
      ctx.beginPath();

      for (let j = 0; j < lineArray.length; j++) {
        if (lineArray[j].length !== 0) {
          ctx.moveTo(lineArray[j][0].x, lineArray[j][0].y);

          for (let i = 1; i < lineArray[j].length - 2; i++) {
            var c = (lineArray[j][i].x + lineArray[j][i + 1].x) / 2,
              d = (lineArray[j][i].y + lineArray[j][i + 1].y) / 2;
            ctx.quadraticCurveTo(lineArray[j][i].x, lineArray[j][i].y, c, d);
          }
          ctx.lineJoin = "round";
          ctx.lineCap = "round";
          ctx.strokeStyle = thenDetail[0];
          ctx.lineWidth = thenDetail[1];
          ctx.stroke();
        }
      }
    }
  };

  useEffect(() => {
    drawInteraction();
  }, [point]);

  useEffect(() => {
    if (trigger === false) {
      setLineArray([...lineArray, drawArray]);
    }
  }, [trigger]);

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
