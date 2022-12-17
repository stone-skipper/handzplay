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
  const tempRef = useRef(null);

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

    tempRef.current.width = Math.floor(videoWidth * scale);
    tempRef.current.height = Math.floor(videoHeight * scale);
    const tempCtx = tempRef.current.getContext("2d");
    tempCtx.scale(scale, scale);

    if (listening === true) {
      tempCtx.beginPath();
      tempCtx.fillStyle = thenDetail[0];
      tempCtx.rect(point.x, point.y - 150, 150, 150);
      tempCtx.fill();
      tempCtx.font = 20 + "px Manrope";
      tempCtx.textAlign = "center";
      tempCtx.scale(-1, 1);
      if (value === "") {
        tempCtx.fillStyle = "lightgrey";
      } else {
        tempCtx.fillStyle = "black";
      }
      tempCtx.fillText(
        value !== "" ? value : "listening",
        -(point.x + 75),
        point.y - 75
      );

      setTranscriptPoint([point.x + 150, point.y - 150, point.x, point.y]);
    } else {
      setTranscriptPoint([]);
    }

    if (transcriptArray.length !== 0) {
      ctx.scale(-1, 1);
      for (let i = 0; i < transcriptArray.length; i++) {
        if (transcriptArray[i].text !== "") {
          ctx.beginPath();
          ctx.fillStyle = thenDetail[0];
          ctx.rect(
            -(transcriptArray[i].x + 75),
            transcriptArray[i].y - 75,
            150,
            150
          );
          ctx.fill();

          ctx.font = 20 + "px Manrope";
          ctx.textAlign = "center";
          ctx.fillStyle = "black";
          ctx.fillText(
            transcriptArray[i].text,
            -transcriptArray[i].x,
            transcriptArray[i].y
          );
        }
      }
    }
  };

  useEffect(async () => {
    if (trigger === true && value !== "") {
      // console.log(transcriptArray);
    } else if (trigger === false && value !== "") {
      let midX = (transcriptPoint[0] + transcriptPoint[2]) / 2;
      let midY = (transcriptPoint[1] + transcriptPoint[3]) / 2;

      await setTranscriptArray([
        ...transcriptArray,
        { x: midX, y: midY, text: value },
      ]);
      setValue("");
    }
  }, [trigger]);

  useEffect(() => {
    console.log(transcriptArray);
  }, [transcriptArray]);

  // useEffect(() => {
  //   if (listening === false) {
  //     listen();
  //   } else if (trigger === false) {
  //     stop();
  //   }
  // }, [trigger]);

  useEffect(() => {
    drawInteraction();
  }, [point]);

  useEffect(() => {
    async function handleFetchMember() {
      try {
        if (trigger === true) {
          listen();
        } else {
          stop();
        }
      } catch (e) {
        console.log(e);
        stop();
      }
    }

    handleFetchMember();
  }, [trigger]);

  return (
    <>
      <canvas
        ref={tempRef}
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
