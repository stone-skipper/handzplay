import React, { useRef, useState, useEffect } from "react";

export default function AudioCvs({ trigger, point, thenDetail }) {
  const drawInteraction = () => {
    if (trigger === true) {
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
    }
  };

  useEffect(() => {
    drawInteraction();
  }, [point]);

  return <></>;
}
