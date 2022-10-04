import { useRulesStore, useControlsStore } from "../../lib/store";
import shallow from "zustand/shallow";

import { useEffect, useState, useRef } from "react";
import styles from "./panels.module.scss";

import { motion } from "framer-motion";
import ScrollPicker from "./scrollPicker";
import EnumSelect from "./enumSelect";
import ColorPicker from "./colorPicker";
import TextInput from "./textInput";
import Divider from "../UI/controls/divider";

export default function NewRule({ options, onScroll }) {
  const ruleInProgress = useRulesStore((state) => state.ruleInProgress);
  const handColor = useControlsStore((state) => state.handColor);
  const removeProperty = useRulesStore((state) => state.removeProperty);
  const [highlight, setHighlight] = useState(0);
  useEffect(() => {
    console.log(ruleInProgress);
    // if (ruleInProgress.ifType !== null) {
    //   setHighlight(1);
    // }
  }, [ruleInProgress]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: 10,
            padding: "24px 16px",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 0.5,
            border: highlight === 0 ? "2px solid #0066FF" : "none",
            boxShadow: "0px -10px 54px 0px #004DC014",
          }}
        >
          <span style={{ opacity: highlight !== 0 ? 0.2 : 1 }}>
            <EnumSelect
              title="Trigger type"
              label="ifType"
              options={["fingers", "pose"]}
              relatedProperty={[
                "fingerA",
                "fingerB",
                "distance",
                "pose",
                "hand",
              ]}
            />
          </span>
        </div>
        <div
          style={{
            background: "white",
            borderRadius: 10,
            padding: "24px 16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 0.5,
            border: highlight === 1 ? "2px solid #0066FF" : "none",
            boxShadow: "0px -10px 54px 0px #004DC014",
          }}
        >
          <span style={{ opacity: highlight !== 1 ? 0.2 : 1 }}>
            <EnumSelect
              title="Reaction type"
              label="thenType"
              options={[
                "shape",
                "draw",
                "audio",
                "stamp",
                "transcript",
                "element",
              ]}
              relatedProperty={["thenDetail"]}
            />
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          // padding: "12px 0",
          background: "white",
          borderRadius: 10,
          padding: "24px 16px",
          flexGrow: 0.5,
          border: highlight === 2 ? "2px solid #0066FF" : "none",
          boxShadow: "0px -10px 54px 0px #004DC014",

          // borderBottom: "1px solid black",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "98%",
              height: 36,
              background: "#EAF2FF",
              opacity: 0.5,
              // border: "2px solid " + handColor,
              borderRadius: 10,
            }}
          ></div>
        </div>

        {ruleInProgress.ifType === "pose" && (
          <>
            <div>if</div>
            <ScrollPicker label="hand" options={["left", "right", "both"]} />
            <div>
              {ruleInProgress.hand === "both" ? "hands are" : "hand is"}
            </div>
            <ScrollPicker
              label="pose"
              options={[
                "victory",
                "thumb-up",
                "spidey",
                "pointer",
                "two",
                "three",
                "four",
                "five",
              ]}
            />
          </>
        )}
        {ruleInProgress.ifType === "fingers" && (
          <>
            <div>if</div>

            <ScrollPicker
              label="fingerA"
              options={[
                // "left thumb",
                // "left index",
                // "left middle",
                // "left ring",
                // "left pinky",
                // "right thumb",
                // "right index",
                // "right middle",
                // "right ring",
                // "right pinky",
                "thumbL",
                "indexL",
                "middleL",
                "ringL",
                "pinkyL",
                "thumbR",
                "indexR",
                "middleR",
                "ringR",
                "pinkyR",
              ]}
            />
            <div>and</div>

            <ScrollPicker
              label="fingerB"
              options={[
                // "left thumb",
                // "left index",
                // "left middle",
                // "left ring",
                // "left pinky",
                // "right thumb",
                // "right index",
                // "right middle",
                // "right ring",
                // "right pinky",
                "thumbL",
                "indexL",
                "middleL",
                "ringL",
                "pinkyL",
                "thumbR",
                "indexR",
                "middleR",
                "ringR",
                "pinkyR",
              ]}
            />
            <div>are within</div>
            <ScrollPicker
              label="distance"
              options={[10, 20, 30, 40, 50, 60, 70, 80]}
            />
            <div>px</div>
          </>
        )}
        {/* arrow */}
        {ruleInProgress.ifType === undefined && (
          <div className={styles.placeholder}>If ...</div>
        )}
        <div>{"->"}</div>
        {ruleInProgress.thenType === undefined && (
          <div className={styles.placeholder}>Then ...</div>
        )}

        {ruleInProgress.thenType === "shape" && (
          <>
            <ScrollPicker
              label="thenDetail"
              arrayIndex={0}
              options={["rect", "line", "circle", "star", "text", "clipping"]}
            />
            {ruleInProgress.thenDetail !== undefined &&
              ruleInProgress.thenDetail[0] === "rect" && (
                <>
                  <ColorPicker label="thenDetail" arrayIndex={1} />
                  <ScrollPicker
                    label="thenDetail"
                    arrayIndex={2}
                    options={["fill", "stroke"]}
                  />
                </>
              )}
            {ruleInProgress.thenDetail !== undefined &&
              ruleInProgress.thenDetail[0] === "line" && (
                <>
                  <ColorPicker label="thenDetail" arrayIndex={1} />
                </>
              )}
            {ruleInProgress.thenDetail !== undefined &&
              ruleInProgress.thenDetail[0] === "circle" && (
                <>
                  <ColorPicker label="thenDetail" arrayIndex={1} />
                  <ScrollPicker
                    label="thenDetail"
                    arrayIndex={2}
                    options={["fill", "stroke"]}
                  />
                </>
              )}
            {ruleInProgress.thenDetail !== undefined &&
              ruleInProgress.thenDetail[0] === "star" && (
                <>
                  <ColorPicker label="thenDetail" arrayIndex={1} />
                  <ScrollPicker
                    label="thenDetail"
                    arrayIndex={2}
                    options={["fill", "stroke"]}
                  />
                </>
              )}
            {ruleInProgress.thenDetail !== undefined &&
              ruleInProgress.thenDetail[0] === "clipping" && (
                <>
                  <ScrollPicker
                    label="thenDetail"
                    arrayIndex={1}
                    options={["rect", "circ", "star"]}
                  />
                  <ColorPicker label="thenDetail" arrayIndex={2} />
                </>
              )}
            {ruleInProgress.thenDetail !== undefined &&
              ruleInProgress.thenDetail[0] === "text" && (
                <>
                  <ColorPicker label="thenDetail" arrayIndex={1} />
                  <TextInput label="thenDetail" arrayIndex={2} />
                  <ScrollPicker
                    label="thenDetail"
                    arrayIndex={3}
                    options={[30, 40, 50, 60, 70, 80, 90, 100]}
                  />
                </>
              )}
          </>
        )}
        {ruleInProgress.thenType === "draw" && (
          <>
            <div>draw a</div>
            <ColorPicker label="thenDetail" arrayIndex={0} />
            <div>line with</div>
            <ScrollPicker
              label="thenDetail"
              arrayIndex={1}
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            />{" "}
            <div>thickness </div>
          </>
        )}
        {ruleInProgress.thenType === "stamp" && (
          <>
            <ScrollPicker
              label="thenDetail"
              arrayIndex={0}
              options={["rect", "circle", "star", "text"]}
            />
            {ruleInProgress.thenDetail !== undefined &&
              ruleInProgress.thenDetail[0] === "rect" && (
                <>
                  <ColorPicker label="thenDetail" arrayIndex={1} />
                  <ScrollPicker
                    label="thenDetail"
                    arrayIndex={2}
                    options={["fill", "stroke"]}
                  />
                  <ScrollPicker
                    label="thenDetail"
                    arrayIndex={3}
                    options={[10, 20, 30, 40, 50, 60, 70, 80]}
                  />
                </>
              )}
            {ruleInProgress.thenDetail !== undefined &&
              ruleInProgress.thenDetail[0] === "circle" && (
                <>
                  <ColorPicker label="thenDetail" arrayIndex={1} />
                  <ScrollPicker
                    label="thenDetail"
                    arrayIndex={2}
                    options={["fill", "stroke"]}
                  />
                  <ScrollPicker
                    label="thenDetail"
                    arrayIndex={3}
                    options={[10, 20, 30, 40, 50, 60, 70, 80]}
                  />
                </>
              )}
            {ruleInProgress.thenDetail !== undefined &&
              ruleInProgress.thenDetail[0] === "star" && (
                <>
                  <ColorPicker label="thenDetail" arrayIndex={1} />
                  <ScrollPicker
                    label="thenDetail"
                    arrayIndex={2}
                    options={["fill", "stroke"]}
                  />
                  <ScrollPicker
                    label="thenDetail"
                    arrayIndex={3}
                    options={[10, 20, 30, 40, 50, 60, 70, 80]}
                  />
                </>
              )}
            {ruleInProgress.thenDetail !== undefined &&
              ruleInProgress.thenDetail[0] === "text" && (
                <>
                  <ColorPicker label="thenDetail" arrayIndex={1} />
                  <TextInput label="thenDetail" arrayIndex={2} />
                  <ScrollPicker
                    label="thenDetail"
                    arrayIndex={3}
                    options={[10, 20, 30, 40, 50, 60, 70, 80]}
                  />
                </>
              )}
          </>
        )}
        {ruleInProgress.thenType === "audio" && (
          <>
            <div>play </div>
            <ScrollPicker
              label="thenDetail"
              arrayIndex={0}
              options={["drum", "cymbalB", "cymbalC"]}
            />{" "}
            <div>sound </div>
          </>
        )}
        {ruleInProgress.thenType === "element" && (
          <>
            <ScrollPicker
              label="thenDetail"
              arrayIndex={0}
              options={["rect"]}
            />
            <ScrollPicker
              label="thenDetail"
              arrayIndex={1}
              options={["rect"]}
            />
          </>
        )}
        {ruleInProgress.thenType === "transcript" && (
          <>
            <div>transcribe on </div>
            <ColorPicker label="thenDetail" arrayIndex={1} />
            <div>post-it </div>
          </>
        )}
      </div>
    </>
  );
}
