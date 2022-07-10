import React, { useRef, useState, useEffect } from "react";
import Controls from "./controlUI/controls";
import Rules from "./rulesUI/rules";
import { useControlsStore, useRulesStore } from "../lib/store";
import RelationCvs from "./if/relationCvs";

import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";

import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";

import Webcam from "react-webcam";
import { drawHand, drawPoints } from "./utils";

import * as fp from "fingerpose";
import { PointerGesture, ThumbsUpGesture, VictoryGesture } from "../gestures";

export default function Handpose() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const reactionRef = useRef(null);

  // from store
  const cameraFeed = useControlsStore((state) => state.cameraFeed);
  const fingersL = useControlsStore((state) => state.fingersL);
  const fingersR = useControlsStore((state) => state.fingersR);
  const rules = useRulesStore((state) => state.rules);

  const handIndicatorType = useControlsStore(
    (state) => state.handIndicatorType
  );
  var handL, handR;

  const [vWidth, setvWidth] = useState(0);
  const [vHeight, setvHeight] = useState(0);

  // handpose model related
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

  var videoWidth, videoHeight;
  const fingerX = (hand, index) => {
    if (hand !== undefined) {
      return Math.round(hand.keypoints[index].x);
    }
  };
  const fingerY = (hand, index) => {
    if (hand !== undefined) {
      return Math.round(hand.keypoints[index].y);
    }
  };

  const handToFinger = (hand, side) => {
    if (side === "left") {
      useControlsStore.setState({
        fingersL: [
          fingerX(hand, 4),
          fingerY(hand, 4),
          fingerX(hand, 8),
          fingerY(hand, 8),
          fingerX(hand, 12),
          fingerY(hand, 12),
          fingerX(hand, 16),
          fingerY(hand, 16),
          fingerX(hand, 20),
          fingerY(hand, 20),
        ],
      });
    } else if (side === "right") {
      useControlsStore.setState({
        fingersR: [
          fingerX(hand, 4),
          fingerY(hand, 4),
          fingerX(hand, 8),
          fingerY(hand, 8),
          fingerX(hand, 12),
          fingerY(hand, 12),
          fingerX(hand, 16),
          fingerY(hand, 16),
          fingerX(hand, 20),
          fingerY(hand, 20),
        ],
      });
    }
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
      videoWidth = webcamRef.current.video.videoWidth;
      videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      setvHeight(videoHeight);
      setvWidth(videoWidth);

      // Make Detections
      const hand = await net.estimateHands(video);

      const ctx = canvasRef.current.getContext("2d");
      var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
      canvasRef.current.width = Math.floor(videoWidth * scale);
      canvasRef.current.height = Math.floor(videoHeight * scale);
      ctx.scale(scale, scale);

      // check which hand is present & store each fingertip positions

      handL = hand.find((e) => e.handedness === "Right");
      handR = hand.find((e) => e.handedness === "Left");

      if (hand.length === 1 && handL !== undefined) {
        useControlsStore.setState({ leftHand: true });
        useControlsStore.setState({ rightHand: false });
        handToFinger(handL, "left");
        useControlsStore.setState({
          fingersR: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
      } else if (hand.length === 1 && handR !== undefined) {
        useControlsStore.setState({ rightHand: true });
        useControlsStore.setState({ leftHand: false });
        handToFinger(handR, "right");
        useControlsStore.setState({
          fingersL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
      } else if (hand.length === 2) {
        useControlsStore.setState({ leftHand: true });
        useControlsStore.setState({ rightHand: true });
        handToFinger(handL, "left");
        handToFinger(handR, "right");
      } else {
        useControlsStore.setState({ leftHand: false });
        useControlsStore.setState({ rightHand: false });
      }

      if (hand.length > 0) {
        for (let i = 0; i < hand.length; i++) {
          if (handIndicatorType === "skeleton") {
            drawHand(hand[i].keypoints, ctx);
          } else if (handIndicatorType === "points") {
            drawPoints(hand[i].keypoints, ctx);
          }
        }

        // detect gesture
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

          // const maxConfidence = confidence.indexOf(
          //   Math.max.apply(null, confidence)
          // );

          let result = gesture.gestures.reduce((p, c) => {
            return p.score > c.score ? p : c;
          });
          if (result !== undefined && result.score > 9.8) {
            console.log(result.name);
            useControlsStore.setState({ currentPose: result.name });
          } else {
            useControlsStore.setState({ currentPose: "" });
          }
        }
      } else {
        useControlsStore.setState({ leftHand: false });
        useControlsStore.setState({ rightHand: false });
        useControlsStore.setState({
          fingersL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
        useControlsStore.setState({
          fingersR: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
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
      {rules !== undefined &&
        rules.map((value, index) => {
          return (
            <RelationCvs
              key={index}
              videoWidth={vWidth}
              videoHeight={vHeight}
              fingersSelected={[value.fingerA, value.fingerB]}
              distance={value.distance}
              thenType={value.thenType}
              thenDetail={value.thenDetail}
            />
          );
        })}
    </div>
  );
}
