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

export default function Present() {
  const handIndicatorType = useControlsStore(
    (state) => state.handIndicatorType
  );
  const slideRef = useRef(null);
  const [urlInput, setUrlInput] = useState("");
  const [url, setUrl] = useState("");

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

  const playgroundBgColor = useControlsStore(
    (state) => state.playgroundBgColor
  );
  const [toggleModal, setToggleModal] = useState(true);
  const cameraFeed = useControlsStore((state) => state.cameraFeed);

  const [current, setCurrent] = useState(0);

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

  const simulateKeyPress = (key) => {
    // Check if the iframe and its contentWindow are accessible
    if (slideRef.current && slideRef.current.contentWindow) {
      // Creating a new event
      const event = new KeyboardEvent("keydown", {
        key: key,
        code: key,
        keyCode: key === "ArrowUp" ? 38 : 40,
        altKey: false,
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        bubbles: true, // Ensure the event bubbles
      });

      // Dispatching the event to the iframe's contentWindow
      slideRef.current.contentWindow.dispatchEvent(event);
    } else {
      console.error("Iframe is not loaded or has cross-origin content.");
    }
  };

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
    // slideRef.focus();
    if (
      (currentActionL === "left" || currentActionR === "left") &&
      swipe === ""
    ) {
      // alert("left!");
      // simulateKeyPress("ArrowDown");
      postMessageToIframe("ArrowDown");
      useControlsStore.setState({ handCursorType: ["●", 24] });
      setSwipe("left");

      // handCursorType: ["➤", 24],
    } else if (
      (currentActionL === "right" || currentActionR === "right") &&
      swipe === ""
    ) {
      // alert("right!");
      // simulateKeyPress("ArrowUp");
      postMessageToIframe("ArrowUp");
      useControlsStore.setState({ handCursorType: ["●", 24] });
      setSwipe("right");
    } else {
      useControlsStore.setState({ handCursorType: ["●", 10] });
    }
  }, [currentActionL, currentActionR]);
  useEffect(() => {
    if (swipe === "left" || swipe === "right") {
      setTimeout(() => {
        setSwipe("");
      }, 1000);
    }
  }, [swipe]);

  useEffect(() => {
    if (currentPoseL === "pointer" || currentPoseR === "pointer") {
      useControlsStore.setState({ handCursorType: ["➤", 24] });
    } else {
      useControlsStore.setState({ handCursorType: ["●", 10] });
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
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          pointerEvents: "none",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <motion.div
          style={{ width: "50vw", height: "100vh", background: "yellow" }}
          animate={{ opacity: swipe === "left" ? 1 : 0 }}
        ></motion.div>
        <motion.div
          style={{ width: "50vw", height: "100vh", background: "pink" }}
          animate={{ opacity: swipe === "right" ? 1 : 0 }}
        ></motion.div>
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
          }}
        >
          <h2 style={{ color: handColor }}>Swipe your slides</h2>
          <div style={{ width: 280, textAlign: "center", fontWeight: 500 }}>
            This is an experimental feature from Handzplay x Interactive Slides,
            that allows you to present your work with air-gesture.
            <br /> <br />
            It only supports the deck made with Framer template{" "}
            <a
              href={"https://interactive-slides.framer.website"}
              style={{ color: handColor }}
            >
              Interactive Slides
            </a>
            <br /> <br />
          </div>
          <input
            placeholder="url of Interactive Slides deck"
            style={{
              background: "rgba(0,0,0,0.1)",
              outline: "none",
              border: "none",
              // color: "white",
              borderRadius: 4,
              width: 300,
              padding: 10,
            }}
            onChange={(e) => {
              setUrlInput(e.target.value);
            }}
          />
          <div
            style={{
              width: 300,
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
            Start presenting
          </div>
          <div
            style={{
              width: 300,
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
              setUrl("https://pdf-sm.framer.website/dev/tips");
            }}
          >
            Try the sample deck
          </div>
        </div>
      </div>
    </div>
  );
}
