import DrawCvs from "../then/drawCvs";
import { useControlsStore } from "../../lib/store";
import { useEffect, useState } from "react";
import StampCvs from "../then/stampCvs";
import AudioCvs from "../then/audioCvs";
import TranscriptCvs from "../then/transcriptCvs";
import ShapeCvs from "../then/shapeCvs";

export default function Fingers({
  videoWidth,
  videoHeight,
  fingersSelected,
  distance,
  thenType,
  thenDetail,
}) {
  var fingersSelectedCoord = [];

  const fingersL = useControlsStore((state) => state.fingersL);
  const fingersR = useControlsStore((state) => state.fingersR);
  const [trigger, setTrigger] = useState(false);
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [points, setPoints] = useState([]);

  const getDistance = (ax, ay, bx, by) => {
    let xDistance = ax - bx;
    let yDistance = ay - by;
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  };

  const draw = () => {
    if (fingersSelectedCoord.length !== 0) {
      setPoint({
        x: (fingersSelectedCoord[0].x + fingersSelectedCoord[1].x) / 2,
        y: (fingersSelectedCoord[0].y + fingersSelectedCoord[1].y) / 2,
      });
      if (thenType === "shape") {
        setPoints([
          fingersSelectedCoord[0].x,
          fingersSelectedCoord[0].y,
          fingersSelectedCoord[1].x,
          fingersSelectedCoord[1].y,
        ]);
      }
    }

    if (
      fingersSelectedCoord.length !== 0 &&
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
      fingersSelectedCoord.length !== 0 &&
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
    draw();
  }, [fingersL, fingersR]);

  return (
    <>
      {thenType === "draw" && (
        <DrawCvs
          videoWidth={videoWidth}
          videoHeight={videoHeight}
          trigger={trigger}
          point={point}
          thenDetail={thenDetail}
        ></DrawCvs>
      )}
      {thenType === "stamp" && (
        <StampCvs
          videoWidth={videoWidth}
          videoHeight={videoHeight}
          trigger={trigger}
          point={point}
          thenDetail={thenDetail}
        />
      )}
      {thenType === "audio" && (
        <AudioCvs trigger={trigger} thenDetail={thenDetail} point={point} />
      )}
      {thenType === "transcript" && (
        <TranscriptCvs
          videoWidth={videoWidth}
          videoHeight={videoHeight}
          trigger={trigger}
          point={point}
          thenDetail={thenDetail}
        />
      )}
      {thenType === "shape" && (
        <ShapeCvs
          videoWidth={videoWidth}
          videoHeight={videoHeight}
          trigger={trigger}
          points={points}
          thenDetail={thenDetail}
        />
      )}
    </>
  );
}
