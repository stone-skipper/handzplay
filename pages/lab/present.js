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
import HandIllust01 from "../../components/visual/hand01";
import HandIllust02 from "../../components/visual/hand02";
import HandIllust03 from "../../components/visual/hand03";
import HandIllust04 from "../../components/visual/hand04";
import HandIllust05 from "../../components/visual/hand05";

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
              fontFamily: '"Inter", sans-serif',
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
              fontFamily: '"Inter", sans-serif',
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
            display: "flex",
            flexDirection: "row",
            width: 900,
            height: 500,
            gap: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              width: "fit-content",
              height: "100%",
              padding: "20px 30px 20px 30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              borderRadius: "10px 0 0 10px",
              gap: 20,
              fontWeight: 500,
              width: "50%",
            }}
          >
            <h1
              style={{ color: handColor, textAlign: "center", lineHeight: 1.1 }}
            >
              Present with
              <br />
              gestures
            </h1>

            <div
              style={{
                textAlign: "center",

                fontSize: "0.9em",
              }}
            >
              This is an experimental feature from <br />
              Handzplay x Interactive Slides, <br />
              allowing you to control your slides with air-gesture.
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
              .
              <br /> <br />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 5,
                width: "100%",
              }}
            >
              <input
                placeholder="URL of your presentation"
                style={{
                  background: "rgba(0,0,0,0.1)",
                  outline: "none",
                  border: "none",
                  textAlign: "center",
                  borderRadius: 10,
                  width: "100%",
                  padding: 14,
                  fontSize: 16,
                }}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                }}
              />
              <motion.div
                style={{
                  width: "fit-content",
                  height: "fit-content",
                  background: handColor,
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "14px 20px 14px 20px",
                  cursor: "pointer",
                  borderRadius: 10,
                  textAlign: "center",
                  fontWeight: 500,
                  fontFamily: '"Inter", sans-serif',
                }}
                whileHover={{}}
                onClick={() => {
                  setUrl(urlInput);
                }}
              >
                →
              </motion.div>
            </div>

            <motion.div
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
                textDecoration: "underline",
              }}
              onClick={() => {
                // setUrl("https://pdf-sm.framer.website/dev/tips");
                setUrl("https://pdf-sm.framer.website/dev/dev");
              }}
            >
              Or try the sample
            </motion.div>
            <br />
          </div>
          <div
            //right box
            style={{
              background: hexToRGBA(handColor, 0.8),
              width: "50%",
              height: "100%",
              padding: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              borderRadius: "0 10px 10px 0",
              gap: 20,
              fontWeight: 500,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "50%",
                // background: "green",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 6,
                flexDirection: "column",
              }}
            >
              <div
                //laptop monitor
                style={{
                  width: 200,
                  height: 140,
                  background: hexToRGBA("#ffffff", 0.2),
                  border: `2px solid ${hexToRGBA("#ffffff", 0.5)}`,
                  borderRadius: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 10,
                    background: "white",
                    overflow: "visible",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 10,
                      filter: "blur(4px)",
                      background: "white",
                    }}
                  ></div>
                </div>
              </div>
              <div
                //laptop body
                style={{
                  width: 240,
                  height: 8,
                  background: hexToRGBA("#ffffff", 0.2),
                  border: `2px solid ${hexToRGBA("#ffffff", 0.5)}`,
                  borderRadius: "2px 2px 10px 10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              ></div>
              <div style={{ position: "relative" }}>
                {/* <HandIllust01 initTop="20%" initLeft="20%" top="20%" left="0" /> */}
                <motion.div
                  style={{
                    width: "fit-content",
                    height: "fit-content",
                    display: setting === "swipe" ? "block" : "none",
                    pointerEvents: "none",
                    originY: 1,
                  }}
                  initial={{ x: 20, y: -60, rotate: -25 }} // swiped to left
                  animate={{ x: 180, y: -10, rotate: 20 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    repeatDelay: 1,
                    duration: 1,
                    // type: "spring",
                    // bounce: 0.1,
                    ease: "easeInOut",
                  }}
                >
                  <HandIllust05
                    initTop={-150}
                    initLeft={-200}
                    top={-180}
                    left={-200}
                    pinch={true}
                    color={"white"}
                    scale={0.6}
                  />
                </motion.div>
                <motion.div
                  style={{
                    width: "fit-content",
                    height: "fit-content",
                    display: setting === "click" ? "block" : "none",
                    pointerEvents: "none",
                  }}
                  initial={{ x: -140, y: -66 }}
                  animate={{ x: 20 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    repeatDelay: 0.3,
                    duration: 2,
                    type: "spring",
                    bounce: 0.1,
                    // ease: "easeInOut",
                  }}
                >
                  <HandIllust03
                    initTop={-180}
                    initLeft={-200}
                    top={-180}
                    left={-200}
                    pinch={true}
                    color={"white"}
                    scale={0.6}
                  />
                </motion.div>
                {/* <HandIllust04 initTop="9%" initLeft="52%" top="6%" left="60%" /> */}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                gap: 10,
                justifyContent: "center",
                alignItems: "center",
                fontSize: "0.9em",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 5,
                  background: hexToRGBA("#ffffff", 0.2),
                  borderRadius: 10,

                  width: "fit-content",
                }}
              >
                <div
                  style={{
                    padding: 10,
                    cursor: "pointer",
                    background: setting === "click" ? "white" : "transparent",
                    color: setting === "click" ? handColor : "white",
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
                    background: setting === "swipe" ? "white" : "transparent",
                    color: setting === "swipe" ? handColor : "white",
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
              <span
                style={{
                  letterSpacing: "0.2rem",
                  textTransform: "uppercase",
                  color: "white",
                  fontSize: "0.7em",
                  display: "none",
                }}
              >
                Gesture Options
              </span>
            </div>
            <div
              style={{
                fontSize: "0.9em",
                color: "white",
                // textTransform: "uppercase",
                textAlign: "center",
                width: "60%",
              }}
            >
              {setting === "swipe"
                ? "Move your palm left/right\n in front of the camera"
                : "Do pinch gesture on \nthe right/left side of the screen"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
