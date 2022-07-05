///////// NEW STUFF ADDED USE STATE
import React, { useRef, useState, useEffect } from "react";
import Controls from "./controlUI/controls";
import Rules from "./rulesUI/rules";
import { useControlsStore } from "../lib/store";
///////// NEW STUFF ADDED USE STATE

import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";

import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";

import Webcam from "react-webcam";
import { drawHand } from "./utils";

import * as fp from "fingerpose";
import { PointerGesture, ThumbsUpGesture, VictoryGesture } from "../gestures";

export default function Handpose() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // from store
  const cameraFeed = useControlsStore((state) => state.cameraFeed);
  const handReady = useControlsStore((state) => state.handReady);
  const leftHand = useControlsStore((state) => state.leftHand);
  const rightHand = useControlsStore((state) => state.rightHand);

  const model = handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorConfig = {
    runtime: "mediapipe", // or 'tfjs',
    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands",
    modelType: "full",
    flipHorizontal: true,
  };

  const runHandpose = async () => {
    const detector = await handPoseDetection.createDetector(
      model,
      detectorConfig
    );

    console.log("Handpose model loaded.");
    if (detector !== undefined) {
      useControlsStore.setState({ handReady: true });
    }
    // const net = await handpose.load(); // for handpose

    //  Loop and detect hands
    setInterval(() => {
      detect(detector);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);

      const ctx = canvasRef.current.getContext("2d");

      if (hand.length > 0) {
        for (let i = 0; i < hand.length; i++) {
          if (hand[i].handedness === "Left") {
            // flip
            useControlsStore.setState({ rightHand: true });
          } else {
            useControlsStore.setState({ rightHand: false });
          }
          if (hand[i].handedness === "Right") {
            // flip
            useControlsStore.setState({ leftHand: true });
          } else {
            useControlsStore.setState({ leftHand: false });
          }
          //   Draw mesh
          drawHand(hand[i].keypoints, ctx);
        }
        console.log(hand[0]);

        const GE = new fp.GestureEstimator([
          PointerGesture,
          VictoryGesture,
          ThumbsUpGesture,
        ]);

        // create x,y,x array for each point
        var keypointsArray = [];
        for (let i = 0; i < hand[0].keypoints.length; i++) {
          keypointsArray[i] = [
            hand[0].keypoints[i].x,
            hand[0].keypoints[i].y,
            hand[0].keypoints3D[i].z * 100,
          ];
        }
        const gesture = await GE.estimate(keypointsArray, 8);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          //   console.log(gesture.gestures);

          const confidence = gesture.gestures.map(
            (keypointsArray) => keypointsArray.confidence
          );

          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );

          let result = gesture.gestures.reduce((p, c) => {
            return p.score > c.score ? p : c;
          });
          if (result !== undefined && result.score > 9.8) {
            console.log(result.name);
            useControlsStore.setState({ currentPose: result.name });
          } else {
            useControlsStore.setState({ currentPose: "" });
          }
          //   console.log(gesture.gestures[maxConfidence].name);
        }
      }
    }
  };

  useEffect(() => {
    runHandpose();
  }, []);

  return (
    <div className="App">
      <Controls />
      <Rules />
      <Webcam
        ref={webcamRef}
        mirrored={true}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          opacity: cameraFeed === true ? 1 : 0,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          transform: "scaleX(-1)",
        }}
      />
    </div>
  );
}
