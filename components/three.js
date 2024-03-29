import React, { useRef, useState, useEffect } from "react";

import { useControlsStore, useRulesStore } from "../lib/store";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-wasm";

import { Canvas, useFrame } from "@react-three/fiber";
// import Model from "./three/model";
import { Suspense } from "react";

import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";

import Webcam from "react-webcam";
import { drawHand, drawPoints, drawBlurred, drawCursor } from "./utils";

import * as fp from "fingerpose";
import {
  FiveGesture,
  FourGesture,
  ThreeGesture,
  PointerGesture,
  SpideyGesture,
  ThumbsUpGesture,
  VictoryGesture,
  OkayGesture,
  RockGesture,
  ClickedPointer,
} from "../gestures";
import Pose from "./if/pose";
import Fingers from "./if/fingers";
import Action from "./if/action";
import DrawMode from "./then/drawMode";
import Scene from "./three/scene";

export default function ThreeScene({
  handIndicatorType,
  cameraFeed,
  rules = [],
  handColor,
}) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // from store
  const fingersL = useControlsStore((state) => state.fingersL);
  const fingersR = useControlsStore((state) => state.fingersR);
  const drawMode = useControlsStore((state) => state.drawMode);
  const handCursorType = useControlsStore((state) => state.handCursorType);
  const handBlur = useControlsStore((state) => state.handBlur);
  // const rules = useRulesStore((state) => state.rules);
  // const handColor = useControlsStore((state) => state.handColor);

  var handL, handR, hand;

  const currentPoseL = useControlsStore((state) => state.currentPoseL);
  const currentPoseR = useControlsStore((state) => state.currentPoseR);

  useEffect(() => {
    if (handIndicatorType === "blurred") {
      useControlsStore.setState({ handBlur: 35 });
    } else if (handIndicatorType === "cursor") {
      useControlsStore.setState({ handBlur: 0 });
    } else {
      useControlsStore.setState({ handBlur: 0 });
    }
  }, [handIndicatorType]);

  useEffect(() => {
    if (handIndicatorType === "blurred") {
      useControlsStore.setState({ handBlur: 35 });
    } else if (handIndicatorType === "cursor") {
      useControlsStore.setState({ handBlur: 0 });
    } else {
      useControlsStore.setState({ handBlur: 0 });
    }
  }, [handIndicatorType]);

  const [passHand, setPassHand] = useState(null);
  const [palmPos, setPalmPos] = useState({ lx: 0, ly: 0, rx: 0, ry: 0 });
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

  useEffect(() => {
    useControlsStore.setState({ cameraSize: [vWidth, vHeight] });
  }, [vWidth, vHeight]);

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

  const removeProperty = (propKey, { [propKey]: propValue, ...rest }) => rest;
  const removeProperties = (object, ...keys) =>
    keys.length
      ? removeProperties(removeProperty(keys.pop(), object), ...keys)
      : object;

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

  const fingerZ = (hand, index) => {
    if (hand !== undefined) {
      return hand.keypoints3D[index].z * 100;
    }
  };
  // action detector
  var leftMovementArray = [];
  var rightMovementArray = [];
  var leftMovement;
  var rightMovement;

  const actionDirection = (motion) => {
    let motionX = motion[1].x - motion[0].x;
    let travelX = Math.abs(motion[1].x - motion[0].x);
    let motionY = motion[1].y - motion[0].y;
    let travelY = Math.abs(motion[1].y - motion[0].y);
    if (travelX > travelY && motionX < 0) {
      return "right";
    } else if (travelX > travelY && motionX > 0) {
      return "left";
    } else if (travelX < travelY && motionY < 0) {
      return "up";
    } else if (travelX < travelY && motionY > 0) {
      return "down";
    }
  };

  const handToFinger = (hand, side) => {
    if (side === "left") {
      useControlsStore.setState({
        fingersL: [
          fingerX(hand, 4),
          fingerY(hand, 4),
          fingerZ(hand, 4),
          fingerX(hand, 8),
          fingerY(hand, 8),
          fingerZ(hand, 8),
          fingerX(hand, 12),
          fingerY(hand, 12),
          fingerX(hand, 16),
          fingerY(hand, 16),
          fingerX(hand, 20),
          fingerY(hand, 20),
          fingerX(hand, 6), // testing purpose
          fingerY(hand, 6), // testing purpose
        ],
      });
    } else if (side === "right") {
      useControlsStore.setState({
        fingersR: [
          fingerX(hand, 4),
          fingerY(hand, 4),
          fingerZ(hand, 4),
          fingerX(hand, 8),
          fingerY(hand, 8),
          fingerZ(hand, 8),
          fingerX(hand, 12),
          fingerY(hand, 12),
          fingerX(hand, 16),
          fingerY(hand, 16),
          fingerX(hand, 20),
          fingerY(hand, 20),
          fingerX(hand, 6), // testing purpose
          fingerY(hand, 6), // testing purpose
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
    OkayGesture,
    RockGesture,
    ClickedPointer,
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
        // console.log(gesture.poseData);
        const confidence = gesture.gestures.map(
          (keypointsArray) => keypointsArray.confidence
        );

        let result = gesture.gestures.reduce((p, c) => {
          return p.score > c.score ? p : c;
        });

        if (result !== undefined && result.score > 9.8 && side === "left") {
          // console.log(result.name);
          useControlsStore.setState({ currentPoseL: result.name });
        } else if (
          result !== undefined &&
          result.score > 9.8 &&
          side === "right"
        ) {
          // console.log(result.name);
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
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;

      useControlsStore.setState({ cameraAccess: true });
      videoWidth = webcamRef.current.video.videoWidth;
      videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
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
          fingersR: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
        setPalmPos({
          lx: (handL.keypoints[0].x + handL.keypoints[9].x) / 2,
          ly: (handL.keypoints[0].y + handL.keypoints[9].y) / 2,
          rx: 0,
          ry: 0,
        });

        leftMovementArray.push({
          x: handL.keypoints[8].x,
          y: handL.keypoints[8].y,
        });
        if (leftMovementArray.length > 2) {
          leftMovementArray.splice(0, 1);
          var movementX = Math.abs(
            leftMovementArray[1].x - leftMovementArray[0].x
          );
          var movementY = Math.abs(
            leftMovementArray[1].y - leftMovementArray[0].y
          );
          leftMovement = Math.sqrt(
            movementX * movementX + movementY * movementY
          );
        }
        if (leftMovement > 220) {
          useControlsStore.setState({
            currentActionL: actionDirection(leftMovementArray),
          });

          // console.log("action!", leftMovementArray, leftMovement);
          // console.log(actionDirection(leftMovementArray));
        } else {
          useControlsStore.setState({ currentActionL: "" });
        }
      } else if (hand.length === 1 && handR !== undefined) {
        useControlsStore.setState({ rightHand: true });
        useControlsStore.setState({ leftHand: false });
        handToFinger(handR, "right");
        gestureRecognition(handR, "right");
        useControlsStore.setState({
          fingersL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
        setPalmPos({
          lx: 0,
          ly: 0,
          rx: (handR.keypoints[0].x + handR.keypoints[9].x) / 2,
          ry: (handR.keypoints[0].y + handR.keypoints[9].y) / 2,
        });

        rightMovementArray.push({
          x: handR.keypoints[8].x,
          y: handR.keypoints[8].y,
        });
        if (rightMovementArray.length > 2) {
          rightMovementArray.splice(0, 1);
          var movementX = Math.abs(
            rightMovementArray[1].x - rightMovementArray[0].x
          );
          var movementY = Math.abs(
            rightMovementArray[1].y - rightMovementArray[0].y
          );
          rightMovement = Math.sqrt(
            movementX * movementX + movementY * movementY
          );
        }
        if (rightMovement > 220) {
          useControlsStore.setState({
            currentActionR: actionDirection(rightMovementArray),
          });

          // console.log("action!", rightMovementArray, rightMovement);
          // console.log(actionDirection(rightMovementArray));
        } else {
          useControlsStore.setState({ currentActionR: "" });
        }
      } else if (
        hand.length === 2 &&
        handR !== undefined &&
        handL !== undefined
      ) {
        useControlsStore.setState({ leftHand: true });
        useControlsStore.setState({ rightHand: true });
        handToFinger(handL, "left");
        handToFinger(handR, "right");
        gestureRecognition(handL, "left");
        gestureRecognition(handR, "right");
        setPalmPos({
          lx: (handL.keypoints[0].x + handL.keypoints[9].x) / 2,
          ly: (handL.keypoints[0].y + handL.keypoints[9].y) / 2,
          rx: (handR.keypoints[0].x + handR.keypoints[9].x) / 2,
          ry: (handR.keypoints[0].y + handR.keypoints[9].y) / 2,
        });
        useControlsStore.setState({ currentPoseL: "" });
        useControlsStore.setState({ currentPoseR: "" });
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
        useControlsStore.setState({ currentActionL: "" });
        useControlsStore.setState({ currentActionR: "" });
        useControlsStore.setState({
          fingersL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
        useControlsStore.setState({
          fingersR: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
        setPalmPos({ lx: 0, ly: 0, rx: 0, ry: 0 });
      }
    }
  };

  useEffect(() => {
    runHandpose();
  }, []);

  useEffect(() => {
    if (passHand !== null) {
      // console.log(passHand);
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
        } else if (handIndicatorType === "cursor") {
          drawCursor(
            passHand[i].keypoints,
            handColor,
            passHand[i].handedness,
            handCursorType[0],
            handCursorType[1],
            ctx
          );
        }
      }
    }
  }, [passHand]);

  const [click, setClick] = useState(false);
  const [both, setBoth] = useState(false);
  const [angle, setAngle] = useState(0);

  const getDistance = (ax, ay, bx, by) => {
    let xDistance = ax - bx;
    let yDistance = ay - by;
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  };

  const checkClick = (ax, ay, bx, by) => {
    let distance = 20;
    if (
      getDistance(ax, ay, bx, by) < distance &&
      getDistance(ax, ay, bx, by) !== 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  function calculateAngleBetweenVectors(Ax, Az, Bx, Bz) {
    const dotProduct = Ax * Bx + Az * Bz;
    const magnitudeA = Math.sqrt(Ax ** 2 + Az ** 2);
    const magnitudeB = Math.sqrt(Bx ** 2 + Bz ** 2);

    // if (magnitudeA === 0 || magnitudeB === 0) {
    //   throw new Error("Vector magnitudes must be non-zero");
    // }

    const angle = Math.acos(dotProduct / (magnitudeA * magnitudeB));
    return (angle * 180) / Math.PI; // Convert to degrees
  }

  useEffect(() => {
    if (fingersL[0] !== 0 || fingersR[0] !== 0) {
      //   console.log("zvalue", fingersL[5], fingersR[5]);
      //   console.log(
      //     calculateAngleBetweenVectors(
      //       fingersL[3],
      //       fingersL[5],
      //       fingersR[3],
      //       fingersR[5]
      //     )
      //   );
      setAngle(
        calculateAngleBetweenVectors(
          fingersL[3],
          fingersL[5],
          fingersR[3],
          fingersR[5]
        ).toFixed(1)
      );
      if (
        (checkClick(fingersL[0], fingersL[1], fingersL[3], fingersL[4]) ===
          true &&
          checkClick(fingersR[0], fingersR[1], fingersR[3], fingersR[4]) ===
            false) ||
        (checkClick(fingersR[0], fingersR[1], fingersR[3], fingersR[4]) ===
          true &&
          checkClick(fingersL[0], fingersL[1], fingersL[3], fingersL[4]) ===
            false)
      ) {
        setClick(true);
        setBoth(false);
        console.log("walk");
      } else if (
        checkClick(fingersL[0], fingersL[1], fingersL[3], fingersL[4]) ===
          true &&
        checkClick(fingersR[0], fingersR[1], fingersR[3], fingersR[4]) === true
      ) {
        setClick(false);
        setBoth(true);
        console.log("fly");
      } else {
        setClick(false);
        setBoth(false);
      }
    }
  }, [fingersL, fingersR]);

  return (
    <div className="App">
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
          // zindex: 1,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
          zIndex: fingersL[0] !== 0 || fingersR[0] !== 0 ? 2 : 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          transform: "scaleX(-1)",
          transition: "0.3s",
          filter: "blur(" + handBlur + "px)",
        }}
      />
      <Scene click={click} fly={both} angle={angle} />
    </div>
  );
}
