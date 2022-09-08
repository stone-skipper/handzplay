import React, { useRef, useState, useEffect } from "react";
import { useControlsStore, useRulesStore } from "../../lib/store";
import {
  line,
  rect,
  circle,
  star,
  text,
  clipping,
  drawStar,
} from "../then/shape";
import { useSpeechRecognition } from "react-speech-kit";
// import { audio } from "../then/audio";

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
  const [drawArray, setDrawArray] = useState([]);

  const [stampArray, setStampArray] = useState([]);
  const [stampPoint, setStampPoint] = useState([]);

  const [transcriptArray, setTranscriptArray] = useState([]);
  const [transcriptPoint, setTranscriptPoint] = useState([]);

  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });
  useEffect(() => {
    console.log(listening);
    // if (listening === false) {
    //   setValue("");
    // }
  }, [listening]);

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
      setTrigger(true);
    } else if (
      (fingersSelectedCoord.length !== 0 &&
        thenType === "audio" &&
        getDistance(
          fingersSelectedCoord[0].x,
          fingersSelectedCoord[0].y,
          fingersSelectedCoord[1].x,
          fingersSelectedCoord[1].y
        ) > distance) ||
      getDistance(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y
      ) === 0
    ) {
      setTrigger(false);
    } else if (
      fingersSelectedCoord.length !== 0 &&
      thenType === "transcript" &&
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
      setTrigger(true);
      let midX = (fingersSelectedCoord[0].x + fingersSelectedCoord[1].x) / 2;
      let midY = (fingersSelectedCoord[0].y + fingersSelectedCoord[1].y) / 2;
      rect(midX + 150, midY - 150, midX, midY, "yellow", "fill", ctx);
      text(
        midX + 150,
        midY - 150,
        midX,
        midY,
        thenDetail[1],
        value,
        thenDetail[3],
        ctx
      );
    } else if (
      fingersSelectedCoord.length !== 0 &&
      thenType === "transcript" &&
      value !== "" &&
      (getDistance(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y
      ) > distance ||
        getDistance(
          fingersSelectedCoord[0].x,
          fingersSelectedCoord[0].y,
          fingersSelectedCoord[1].x,
          fingersSelectedCoord[1].y
        ) === 0)
    ) {
      setTrigger(false);
      let midX = (fingersSelectedCoord[0].x + fingersSelectedCoord[1].x) / 2;
      let midY = (fingersSelectedCoord[0].y + fingersSelectedCoord[1].y) / 2;
      setTranscriptPoint([midX + 150, midY - 150, midX, midY]);
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
      setTrigger(true);
      setStampPoint([
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y,
      ]);
    } else if (
      (fingersSelectedCoord.length !== 0 &&
        thenType === "stamp" &&
        getDistance(
          fingersSelectedCoord[0].x,
          fingersSelectedCoord[0].y,
          fingersSelectedCoord[1].x,
          fingersSelectedCoord[1].y
        ) > distance) ||
      getDistance(
        fingersSelectedCoord[0].x,
        fingersSelectedCoord[0].y,
        fingersSelectedCoord[1].x,
        fingersSelectedCoord[1].y
      ) === 0
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
      thenType === "draw" &&
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
      let midPointX =
        (fingersSelectedCoord[0].x + fingersSelectedCoord[1].x) / 2;
      let midPointY =
        (fingersSelectedCoord[0].y + fingersSelectedCoord[1].y) / 2;
      setDrawArray([...drawArray, { x: midPointX, y: midPointY }]);
    }

    // for drawing. Reference at http://jsfiddle.net/NWBV4/10/
    if (drawArray.length !== 0 && thenType === "draw") {
      ctx.beginPath(), ctx.moveTo(drawArray[0].x, drawArray[0].y);

      for (let i = 1; i < drawArray.length - 2; i++) {
        var c = (drawArray[i].x + drawArray[i + 1].x) / 2,
          d = (drawArray[i].y + drawArray[i + 1].y) / 2;
        ctx.quadraticCurveTo(drawArray[i].x, drawArray[i].y, c, d);
      }
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = thenDetail[0];
      ctx.lineWidth = thenDetail[1];
      ctx.stroke();
    }

    // for stamping

    if (stampArray.length !== 0 && thenType === "stamp") {
      for (let i = 0; i < stampArray.length; i++) {
        ctx.beginPath();

        // what if reusing the shape functions here?

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

    if (transcriptArray.length !== 0 && thenType === "transcript") {
      for (let i = 0; i < transcriptArray.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.rect(
          transcriptArray[i].x - 75,
          transcriptArray[i].y - 75,
          150,
          150
        );
        ctx.fill();

        ctx.font = thenDetail[3] + "px Manrope";
        ctx.textAlign = "center";
        ctx.translate(transcriptArray[i].x, transcriptArray[i].y);
        ctx.scale(-1, 1);
        ctx.fillStyle = "black";
        ctx.fillText(transcriptArray[i].text, 0, 0);
      }
    }
  };

  useEffect(() => {
    // for stamping
    if (thenType === "stamp" && trigger === true) {
      let midX = (stampPoint[0] + stampPoint[2]) / 2;
      let midY = (stampPoint[1] + stampPoint[3]) / 2;
      setStampArray([...stampArray, { x: midX, y: midY }]);
    } else if (thenType === "audio" && trigger === true) {
      var audioSrc;
      if (thenDetail[0] === "drum") {
        audioSrc = "../../media/drum01.mp3";
        var audio = new Audio(audioSrc);
      } else if (thenDetail[0] === "cymbalB") {
        audioSrc = "../../media/cymbal-b.mp3";
        var audio = new Audio(audioSrc);
      } else if (thenDetail[0] === "cymbalC") {
        audioSrc = "../../media/cymbal-c.mp3";
        var audio = new Audio(audioSrc);
      }
      audio.play();
    } else if (
      thenType === "transcript" &&
      trigger === true &&
      listening === false
    ) {
      listen();
    } else if (
      thenType === "transcript" &&
      trigger === false &&
      listening === true
    ) {
      let midX = (transcriptPoint[0] + transcriptPoint[2]) / 2;
      let midY = (transcriptPoint[1] + transcriptPoint[3]) / 2;
      setTranscriptArray([
        ...transcriptArray,
        { x: midX, y: midY, text: value },
      ]);
      console.log(transcriptArray);
      stop();
    }
  }, [trigger]);

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
