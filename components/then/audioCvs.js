import React, { useEffect } from "react";

export default function AudioCvs({ trigger, point, thenDetail }) {
  const drawInteraction = () => {
    if (trigger === true) {
      var audioSrc;
      if (thenDetail[0] === "drum") {
        audioSrc = "../../media/" + thenDetail[1] + ".wav";
      } else if (thenDetail[0] === "piano") {
        audioSrc = "../../media/" + thenDetail[1] + ".mp3";
      }
      let audio = new Audio(audioSrc);
      audio.play();
    }
  };

  useEffect(() => {
    drawInteraction();
  }, [trigger]);

  return <></>;
}
