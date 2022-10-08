import React, { useRef, useState, useEffect } from "react";

import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-wasm";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import { drawHand, drawPoints, drawBlurred } from "./utils";
import * as fp from "fingerpose";

import {
  FiveGesture,
  FourGesture,
  ThreeGesture,
  PointerGesture,
  SpideyGesture,
  ThumbsUpGesture,
  VictoryGesture,
} from "../gestures";
import { useControlsStore, useRulesStore } from "../lib/store";
import RelationCvs from "./if/relationCvs";
import Pose from "./if/Pose";

export default function FriendsPose({
  handIndicatorType,
  cameraFeed,
  rules = [],
  handColor,
  videoRef,
  mirror = true,
}) {
  const canvasRef = useRef(null);

  // from store
  const fingersL = useControlsStore((state) => state.fingersL);
  const fingersR = useControlsStore((state) => state.fingersR);

  var handL, handR, hand;

  const [passHand, setPassHand] = useState(null);

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

  // detect gesture
  const GE = new fp.GestureEstimator([
    PointerGesture,
    VictoryGesture,
    ThumbsUpGesture,
    FiveGesture,
    FourGesture,
    ThreeGesture,
    SpideyGesture,
  ]);

  const gestureRecognition = async (hand, side) => {
    // create x,y,x array for each point
    if (hand !== undefined) {
      var keypointsArray = [];

      for (let i = 0; i < hand.keypoints.length; i++) {
        keypointsArray[i] = [
          hand.keypoints[i].x,
          hand.keypoints[i].y,
          hand.keypoints3D[i].z * 100,
        ];
      }
      const gesture = await GE.estimate(keypointsArray, 8);
      if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
        //   console.log(gesture.gestures);

        const confidence = gesture.gestures.map(
          (keypointsArray) => keypointsArray.confidence
        );

        let result = gesture.gestures.reduce((p, c) => {
          return p.score > c.score ? p : c;
        });

        if (result !== undefined && result.score > 9.8 && side === "left") {
          console.log(result.name);
          useControlsStore.setState({ currentPoseL: result.name });
        } else if (
          result !== undefined &&
          result.score > 9.8 &&
          side === "right"
        ) {
          console.log(result.name);
          useControlsStore.setState({ currentPoseR: result.name });
        } else {
          useControlsStore.setState({ currentPoseL: "" });
          useControlsStore.setState({ currentPoseR: "" });
        }
      }
    }
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof videoRef.current !== undefined &&
      typeof videoRef.current !== null &&
      videoRef.current.readyState === 4
    ) {
      // Get Video Properties
      const video = videoRef.current;
      videoWidth = videoRef.current.videoWidth;
      videoHeight = videoRef.current.videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      setvHeight(videoHeight);
      setvWidth(videoWidth);

      // Make Detections
      hand = await net.estimateHands(video);
      setPassHand(hand);

      // check which hand is present & store each fingertip positions

      handL = hand.find((e) => e.handedness === "Right");
      handR = hand.find((e) => e.handedness === "Left");

      if (hand.length === 1 && handL !== undefined) {
        useControlsStore.setState({ leftHand: true });
        useControlsStore.setState({ rightHand: false });
        handToFinger(handL, "left");
        gestureRecognition(handL, "left");
        useControlsStore.setState({
          fingersR: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
      } else if (hand.length === 1 && handR !== undefined) {
        useControlsStore.setState({ rightHand: true });
        useControlsStore.setState({ leftHand: false });
        handToFinger(handR, "right");
        gestureRecognition(handR, "right");

        useControlsStore.setState({
          fingersL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
      } else if (hand.length === 2) {
        useControlsStore.setState({ leftHand: true });
        useControlsStore.setState({ rightHand: true });
        handToFinger(handL, "left");
        handToFinger(handR, "right");
        gestureRecognition(handL, "left");
        gestureRecognition(handR, "right");
      } else {
        useControlsStore.setState({ leftHand: false });
        useControlsStore.setState({ rightHand: false });
      }

      if (hand.length > 0) {
      } else {
        // when there's no hand with the view, set things to 0
        useControlsStore.setState({ leftHand: false });
        useControlsStore.setState({ rightHand: false });
        useControlsStore.setState({ currentPoseL: "" });
        useControlsStore.setState({ currentPoseR: "" });
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

  useEffect(() => {
    if (passHand !== null) {
      const ctx = canvasRef.current.getContext("2d");
      var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
      canvasRef.current.width = Math.floor(vWidth * scale);
      canvasRef.current.height = Math.floor(vHeight * scale);
      ctx.scale(scale, scale);
      for (let i = 0; i < passHand.length; i++) {
        if (handIndicatorType === "skeleton") {
          drawHand(passHand[i].keypoints, handColor, ctx);
        } else if (handIndicatorType === "points") {
          drawPoints(passHand[i].keypoints, handColor, ctx);
        } else if (handIndicatorType === "blurred") {
          drawBlurred(passHand[i].keypoints, handColor, ctx);
        }
      }
    }
  }, [passHand]);

  return (
    <div className="App">
      <video
        playsInline
        ref={videoRef}
        autoPlay
        style={{
          transform: mirror === true ? "scaleX(-100%)" : "scaleX(100%)",
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
        id="hand"
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
          transform: mirror === true ? "scaleX(-100%)" : "scaleX(100%)",
          filter: handIndicatorType === "blurred" ? "blur(35px)" : "none",
        }}
      />
    </div>
  );
}
