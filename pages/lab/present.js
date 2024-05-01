import Handpose from "../../components/handpose";
import Logo from "../../components/UI/logo";
import About from "../../components/controlUI/about";
import Controls from "../../components/controlUI/controls";
import Rules from "../../components/controlUI/rules";
import Grid from "../../components/grid";
import { useControlsStore, useRulesStore } from "../../lib/store";
import styles from "../../handsplay.module.scss";
import { useEffect, useState, useRef } from "react";
import Template from "../../components/controlUI/template";
import Slides from "../../components/deck/slides";
import { motion } from "framer-motion";
import { hexToRGBA } from "../../components/utils";

export default function Present() {
  const handIndicatorType = useControlsStore(
    (state) => state.handIndicatorType
  );
  const slideRef = useRef(null);
  const [urlInput, setUrlInput] = useState("");
  const [url, setUrl] = useState("");
  const cameraSize = useControlsStore((state) => state.cameraSize);

  const currentPoseL = useControlsStore((state) => state.currentPoseL);
  const currentPoseR = useControlsStore((state) => state.currentPoseR);
  //   useEffect(() => {
  //     if (handIndicatorType === "blurred") {
  //       useControlsStore.setState({ handBlur: 35 });
  //     } else if (handIndicatorType === "cursor") {
  //       useControlsStore.setState({ handBlur: 0 });
  //     } else {
  //       useControlsStore.setState({ handBlur: 0 });
  //     }
  //   }, [handIndicatorType]);

  const rules = useRulesStore((state) => state.rules);
  const handColor = useControlsStore((state) => state.handColor);
  const currentActionL = useControlsStore((state) => state.currentActionL);
  const currentActionR = useControlsStore((state) => state.currentActionR);
  const fingersL = useControlsStore((state) => state.fingersL);
  const fingersR = useControlsStore((state) => state.fingersR);

  const [toggleModal, setToggleModal] = useState(true);
  const cameraFeed = useControlsStore((state) => state.cameraFeed);
  const [setting, setSetting] = useState("click"); // swipe, click

  useEffect(() => {
    // useControlsStore.setState({ toggleTemplate: true });
    useControlsStore.setState({ currentTab: "none" });
    useControlsStore.setState({ handIndicatorType: "cursor" });

    // useRulesStore.setState({
    //   rules: [
    //     {
    //       ifType: "fingers",
    //       fingerA: "thumbR",
    //       fingerB: "indexR",
    //       distance: 30,
    //       thenType: "draw",
    //       thenDetail: ["white", 2], // color and linewidth
    //     },
    //   ],
    // });
  }, []);

  const postMessageToIframe = (key) => {
    if (slideRef.current && slideRef.current.contentWindow) {
      // Sending a message to the iframe
      console.log(key);

      // console.log(slideRef);
      slideRef.current.contentWindow.postMessage({ key: key }, "*");
    }
  };
  const [swipe, setSwipe] = useState("");

  useEffect(() => {
    if (
      (currentActionL === "left" || currentActionR === "left") &&
      swipe === "" &&
      setting === "swipe"
    ) {
      postMessageToIframe("ArrowUp");
      useControlsStore.setState({ handCursorType: ["●", 24] });
      setSwipe("right");
    } else if (
      (currentActionL === "right" || currentActionR === "right") &&
      swipe === "" &&
      setting === "swipe"
    ) {
      postMessageToIframe("ArrowDown");
      useControlsStore.setState({ handCursorType: ["●", 24] });
      setSwipe("left");
    } else {
      useControlsStore.setState({ handCursorType: ["●", 10] });
    }
  }, [currentActionL, currentActionR]);

  useEffect(() => {
    if (swipe === "left" || swipe === "right") {
      setTimeout(() => {
        setSwipe("");
      }, 100);
    }
  }, [swipe]);

  useEffect(() => {
    if (currentPoseL === "pointer" || currentPoseR === "pointer") {
      useControlsStore.setState({ handCursorType: ["➤", 24] });
    } else {
      useControlsStore.setState({ handCursorType: ["●", 10] });
    }

    if (
      ((currentPoseR === "okay" &&
        ((cameraSize[0] - fingersR[2]) / cameraSize[0]) * 100 > 50) ||
        (currentPoseL === "okay" &&
          ((cameraSize[0] - fingersL[2]) / cameraSize[0]) * 100 > 50)) &&
      setting === "click"
    ) {
      postMessageToIframe("ArrowDown");
      useControlsStore.setState({ handCursorType: ["●", 24] });
      setSwipe("left");
    } else if (
      ((currentPoseR === "okay" &&
        ((cameraSize[0] - fingersR[2]) / cameraSize[0]) * 100 <= 50) ||
        (currentPoseL === "okay" &&
          ((cameraSize[0] - fingersL[2]) / cameraSize[0]) * 100 <= 50)) &&
      setting === "click"
    ) {
      postMessageToIframe("ArrowUp");
      useControlsStore.setState({ handCursorType: ["●", 24] });
      setSwipe("right");
    }
  }, [currentPoseL, currentPoseR]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <iframe
        src={url}
        style={{
          width: "100vw",
          height: "100vh",
          outline: "none",
          border: "none",
          position: "absolute",
          top: 0,
          left: 0,
          display: url === "" ? "none" : "block",
        }}
        id="targetIframe"
        ref={slideRef}
      ></iframe>
      <div
        style={{
          position: "fixed",
          background: "yellow",
          color: "black",
          display: "none",
        }}
      >
        {fingersL[2]} {fingersL[3]}
        <br />
        {fingersR[2]} {fingersR[3]}
        <br />
        {cameraSize[0]} {cameraSize[1]}
        <br />
        {((cameraSize[0] - fingersR[2]) / cameraSize[0]) * 100}{" "}
        {(fingersR[3] / cameraSize[1]) * 100}
      </div>
      <span
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
      >
        <Handpose
          handIndicatorType={handIndicatorType}
          cameraFeed={cameraFeed}
          rules={rules}
          handColor={handColor}
        />
      </span>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          pointerEvents: "none",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <motion.div
          style={{
            width: "30vw",
            height: "100vh",
            // background: "yellow",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          animate={{ opacity: swipe === "right" ? 1 : 0 }}
        >
          <div
            style={{
              background: "rgba(0,0,0,0.2)",
              color: "white",
              borderRadius: 300,
              width: 200,
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 80,
            }}
          >
            ←
          </div>
        </motion.div>
        <motion.div
          style={{
            width: "30vw",
            height: "100vh",
            // background: "pink",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          animate={{ opacity: swipe === "left" ? 1 : 0 }}
        >
          <div
            style={{
              background: "rgba(0,0,0,0.2)",
              color: "white",
              borderRadius: 300,
              width: 200,
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 80,
            }}
          >
            →
          </div>
        </motion.div>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: url === "" ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          background: "rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            background: "white",
            width: "fit-content",
            height: "fit-content",
            padding: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderRadius: 10,
            gap: 20,
            fontWeight: 500,
          }}
        >
          <h2 style={{ color: handColor }}>Present hands-free</h2>
          <div
            style={{
              width: 440,
              textAlign: "center",

              fontSize: "0.9em",
            }}
          >
            This is an experimental feature from Handzplay x Interactive Slides,
            that allows you to control your slides with air-gesture.
            <br /> <br />
            It only supports the deck <br />
            made with the{" "}
            <motion.a
              href={"https://interactive-slides.framer.website"}
              target="_blank"
              style={{ textDecoration: "underline", color: "black" }}
              whileHover={{ color: handColor }}
            >
              Interactive Slides Framer Template
            </motion.a>
            <br /> <br />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              textAlign: "center",
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
              fontSize: "0.9em",
            }}
          >
            Gesture Setting
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                padding: 5,
                background: hexToRGBA(handColor, 0.1),
                borderRadius: 5,

                width: "fit-content",
              }}
            >
              <div
                style={{
                  padding: 10,
                  cursor: "pointer",
                  background: setting === "click" ? handColor : "transparent",
                  color: setting === "click" ? "white" : "black",
                  borderRadius: 5,
                  userSelect: "none",
                  width: 60,
                }}
                onClick={() => {
                  setSetting("click");
                }}
              >
                Click
              </div>
              <div
                style={{
                  padding: 10,
                  cursor: "pointer",
                  background: setting === "swipe" ? handColor : "transparent",
                  color: setting === "swipe" ? "white" : "black",
                  borderRadius: 5,
                  userSelect: "none",
                  width: 60,
                }}
                onClick={() => {
                  setSetting("swipe");
                }}
              >
                Swipe
              </div>
            </div>
          </div>
          <div style={{ fontSize: "0.8em", color: handColor }}>
            {setting === "swipe"
              ? "Move ✋ toward left/right in front of the screen"
              : "Do 👌 gesture on the right/left side of the screen"}
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
            <input
              placeholder="URL of your deck"
              style={{
                background: "rgba(0,0,0,0.1)",
                outline: "none",
                border: "none",
                textAlign: "center",
                borderRadius: 4,
                width: 350,
                padding: 10,
                fontSize: 16,
              }}
              onChange={(e) => {
                setUrlInput(e.target.value);
              }}
            />
            <div
              style={{
                width: "fit-content",
                height: "fit-content",
                background: handColor,
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                cursor: "pointer",
                borderRadius: 4,
                textAlign: "center",
                fontWeight: 500,
              }}
              onClick={() => {
                setUrl(urlInput);
              }}
            >
              →
            </div>
          </div>

          <div
            style={{
              background: "transparent",
              color: handColor,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: 4,
              textAlign: "center",
              fontWeight: 500,
              fontSize: "0.9em",
            }}
            onClick={() => {
              setUrl("https://pdf-sm.framer.website/dev/tips");
            }}
          >
            Or try the sample deck
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}
