import React, { useRef, useState, useEffect } from "react";
import { useControlsStore, useRulesStore } from "../../lib/store";
import { useSpeechRecognition } from "react-speech-kit";

export default function TranscriptCvs({
  videoWidth,
  videoHeight,
  trigger,
  point,
  thenDetail,
}) {
  const reactionRef = useRef(null);

  var scale = 2; // Change to 1 on retina screens to see blurry canvas.
  const clearBtn = useControlsStore((state) => state.clearBtn);
  const [transcriptArray, setTranscriptArray] = useState([]);
  const [transcriptPoint, setTranscriptPoint] = useState([]);

  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });

  useEffect(() => {
    console.log(value);
  }, [value]);

  useEffect(() => {
    if (transcriptArray.length !== 0) {
      useControlsStore.setState({ clearBtn: true });
    }
  }, [transcriptArray]);
  useEffect(() => {
    if (clearBtn === false) {
      setTranscriptArray([]);
    }
  }, [clearBtn]);

  const drawInteraction = () => {
    reactionRef.current.width = Math.floor(videoWidth * scale);
    reactionRef.current.height = Math.floor(videoHeight * scale);
    const ctx = reactionRef.current.getContext("2d");
    ctx.scale(scale, scale);

    if (trigger === true && listening === false) {
      listen();
    } else if (trigger === false) {
      stop();
    }

    if (listening === true) {
      //   ctx.beginPath();
      //   ctx.fillStyle = thenDetail[2];
      //   ctx.rect(point.x, point.y - 150, 150, 150);
      //   ctx.fill();
      setTranscriptPoint([point.x + 150, point.y - 150, point.x, point.y]);
    }
    if (transcriptArray.length !== 0) {
      for (let i = 0; i < transcriptArray.length; i++) {
        if (transcriptArray.text !== "") {
          ctx.beginPath();
          ctx.fillStyle = thenDetail[2];
          ctx.rect(
            transcriptArray[i].x - 75,
            transcriptArray[i].y - 75,
            150,
            150
          );
          ctx.fill();

          ctx.font = thenDetail[3] + "px Manrope";
          ctx.textAlign = "center";
          ctx.scale(-1, 1);
          ctx.fillStyle = thenDetail[1];
          ctx.fillText(
            transcriptArray[i].text,
            -transcriptArray[i].x,
            transcriptArray[i].y
          );
        }
      }
    }
  };

  useEffect(() => {
    console.log(listening);
    if (listening === true && value !== "") {
      let midX = (transcriptPoint[0] + transcriptPoint[2]) / 2;
      let midY = (transcriptPoint[1] + transcriptPoint[3]) / 2;

      setTranscriptArray([
        ...transcriptArray,
        { x: midX, y: midY, text: value },
      ]);
      console.log(transcriptArray);
    } else if (listening === false) {
      setValue("");
    }
  }, [listening, trigger]);

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
