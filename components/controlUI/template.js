import { useState, useEffect, useRef } from "react";
import { useRulesStore, useControlsStore } from "../../lib/store";
import styles from "./panels.module.scss";
import { motion } from "framer-motion";
import {
  gestureSet,
  drumSet,
  moveSet,
  whiteboardSet,
  swipeSet,
  hoverClickSet,
  spideySet,
} from "../../lib/rulePreset";
import { useOnClickOutside } from "../../lib/hook";

export default function Template() {
  const toggleTemplate = useControlsStore((state) => state.toggleTemplate);
  const rules = useRulesStore((state) => state.rules);
  const addRule = useRulesStore((state) => state.addRule);
  const ref = useRef();

  // useOnClickOutside(ref, () =>
  //   useControlsStore.setState({ toggleTemplate: false })
  // );

  const Items = ({ title, onClick, description }) => {
    return (
      <motion.div
        className={styles.templateItems}
        onClick={() => {
          useRulesStore.setState({ rules: [] });
          onClick();
          useControlsStore.setState({ toggleTemplate: false });
        }}
        whileHover={{
          background: "rgba(227, 238, 255, 1)",
          color: "rgb(0, 102, 255)",
        }}
        style={{
          background: "rgba(227, 238, 255, 0)",
          color: "rgb(80,80,80)",
        }}
      >
        <span
          style={{
            fontFamily: "Gainsborough",
            textTransform: "uppercase",
            letterSpacing: 1.8,
            marginBottom: 8,
          }}
        >
          {title}
        </span>

        <span className={styles.templateDesc}> {description}</span>
      </motion.div>
    );
  };
  return (
    <div
      className={styles.templateBg}
      style={{ display: toggleTemplate === true ? "flex" : "none" }}
      ref={ref}
    >
      <motion.div
        className={styles.templateModal}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            cursor: "pointer",
            margin: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 20,
            height: 20,
            borderRadius: 20,
          }}
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            useControlsStore.setState({ toggleTemplate: false });
          }}
        >
          ⨉
        </motion.div>
        <div
          style={{
            textAlign: "center",
            fontFamily: "Gainsborough",
            textTransform: "uppercase",
            letterSpacing: 4,
            fontSize: 26,
            marginBottom: 8,
          }}
        >
          Welcome!{" "}
        </div>
        <div style={{ textAlign: "center", fontSize: 14, marginBottom: 25 }}>
          Choose a template to start with
        </div>
        <div className={styles.templateGrid}>
          <Items
            title="blank"
            onClick={() => {
              useControlsStore.setState({ handIndicatorType: "skeleton" });
              useControlsStore.setState({ handColor: "#0066FF" });
            }}
            description="start from a scratch"
          />
          <Items
            title="hover & click"
            onClick={() => {
              useControlsStore.setState({ handIndicatorType: "cursor" });
              useControlsStore.setState({ handColor: "#0066FF" });

              for (let i = 0; i < hoverClickSet.length; i++) {
                addRule(hoverClickSet[i]);
              }
            }}
            description="use your hand like a mouse"
          />

          <Items
            title="gestures"
            onClick={() => {
              useControlsStore.setState({ handIndicatorType: "skeleton" });
              useControlsStore.setState({ handColor: "#0066FF" });

              for (let i = 0; i < gestureSet.length; i++) {
                addRule(gestureSet[i]);
              }
            }}
            description="see hand gestures detected"
          />
          <Items
            title="draw mode"
            onClick={() => {
              useControlsStore.setState({ drawMode: true });
            }}
            description="draw interfaces like on a canvas"
          />
          <Items
            title="drumkit"
            onClick={() => {
              useControlsStore.setState({ handIndicatorType: "skeleton" });
              useControlsStore.setState({ handColor: "#0066FF" });

              for (let i = 0; i < drumSet.length; i++) {
                addRule(drumSet[i]);
              }
            }}
            description="use fingers to play your rhythm"
          />
          <Items
            title="spidey"
            onClick={() => {
              useControlsStore.setState({ handIndicatorType: "blurred" });
              useControlsStore.setState({ handColor: "red" });

              for (let i = 0; i < spideySet.length; i++) {
                addRule(spideySet[i]);
              }
            }}
            description="leave your traces with gestures"
          />
          <Items
            title="swipe"
            onClick={() => {
              useControlsStore.setState({ handIndicatorType: "blurred" });
              useControlsStore.setState({ handColor: "#0066FF" });

              for (let i = 0; i < swipeSet.length; i++) {
                addRule(swipeSet[i]);
              }
            }}
            description="swipe gestures over the air "
          />
          <Items
            title="whiteboard"
            onClick={() => {
              useControlsStore.setState({ handIndicatorType: "cursor" });
              useControlsStore.setState({ handColor: "#0066FF" });

              for (let i = 0; i < whiteboardSet.length; i++) {
                addRule(whiteboardSet[i]);
              }
            }}
            description="point, draw, and add notes"
          />
        </div>
      </motion.div>
    </div>
  );
}
