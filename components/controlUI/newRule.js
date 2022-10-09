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
    console.log(ruleInProgress.ifType);
    if (
      ruleInProgress.ifType === undefined &&
      ruleInProgress.thenType === undefined
    ) {
      setHighlight(0);
    } else if (
      ruleInProgress.ifType !== undefined &&
      ruleInProgress.thenType === undefined
    ) {
      setHighlight(1);
    } else if (
      ruleInProgress.ifType !== undefined &&
      ruleInProgress.thenType !== undefined
    ) {
      setHighlight(2);
    }
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
            border: highlight === 0 ? "2px solid #0066FF" : "2px solid white",
            boxShadow: "0px -10px 54px 0px #004DC014",
          }}
          onClick={() => {
            setHighlight(0);
          }}
        >
          <span
            style={{
              opacity:
                ruleInProgress.ifType !== undefined || highlight === 0
                  ? 1
                  : 0.2,
            }}
          >
            <EnumSelect
              title="Trigger type"
              label="ifType"
              options={["fingers", "pose", "action"]}
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
            border: highlight === 1 ? "2px solid #0066FF" : "2px solid white",
            boxShadow: "0px -10px 54px 0px #004DC014",
            boxSizing: "border-box",
          }}
          onClick={() => {
            setHighlight(1);
          }}
        >
          <span
            style={{
              opacity:
                ruleInProgress.thenType !== undefined || highlight === 1
                  ? 1
                  : 0.2,
            }}
          >
            <EnumSelect
              title="Reaction type"
              label="thenType"
              options={[
                "shape",
                "draw",
                "audio",
                "stamp",
                "transcript",
                "interface",
              ]}
              relatedProperty={["thenDetail"]}
              inactive={
                ruleInProgress.ifType === "pose"
                  ? ["shape"]
                  : ruleInProgress.ifType === "action"
                  ? ["shape", "draw", "transcript", "stamp"]
                  : []
              }
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
          border: highlight === 2 ? "2px solid #0066FF" : "2px solid white",
          boxShadow: "0px -10px 54px 0px #004DC014",
          boxSizing: "border-box",
          // borderBottom: "1px solid black",
        }}
        onClick={() => {
          setHighlight(2);
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
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "98%",
              height: 60,
              zIndex: 2,
              background:
                "linear-gradient(rgba(255,255,255,1), rgba(255,255,255,0))",
            }}
          ></div>
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
          <div
            style={{
              width: "98%",
              height: 60,
              zIndex: 2,
              background:
                "linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1))",
            }}
          ></div>
        </div>
        <div className={styles.optionsWrapper}>
          {ruleInProgress.ifType === "pose" && (
            <>
              <div className={styles.plainText}>if</div>
              <ScrollPicker label="hand" options={["left", "right", "both"]} />
              <div className={styles.plainText}>
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
          {ruleInProgress.ifType === "action" && (
            <>
              <div className={styles.plainText}>if</div>
              <ScrollPicker label="hand" options={["left", "right"]} />
              <div className={styles.plainText}>hand swipes</div>
              <ScrollPicker
                label="action"
                options={["left", "right", "up", "down"]}
              />
            </>
          )}
          {ruleInProgress.ifType === "fingers" && (
            <>
              <div className={styles.plainText}>if</div>

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
              <div className={styles.plainText}>and</div>

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
              <div className={styles.plainText}>are within</div>
              <ScrollPicker
                label="distance"
                options={[10, 20, 30, 40, 50, 60, 70, 80]}
              />
              <div className={styles.plainText}>px</div>
            </>
          )}
          {ruleInProgress.ifType === undefined && (
            <div className={styles.placeholder}>If ...</div>
          )}
        </div>
        {/* arrow */}

        <div>{"->"}</div>

        <div className={styles.optionsWrapper}>
          {ruleInProgress.thenType === undefined && (
            <div className={styles.placeholder}>Then ...</div>
          )}
          {ruleInProgress.thenType === "shape" && (
            <div className={styles.optionsHolder}>
              <ScrollPicker
                label="thenDetail"
                arrayIndex={0}
                options={["rect", "line", "circle", "star", "text", "clipping"]}
              />
              {ruleInProgress.thenDetail !== undefined &&
                ruleInProgress.thenDetail[0] === "rect" && (
                  <div className={styles.optionsHolder}>
                    <ColorPicker label="thenDetail" arrayIndex={1} />
                    <ScrollPicker
                      label="thenDetail"
                      arrayIndex={2}
                      options={["fill", "stroke"]}
                    />
                  </div>
                )}
              {ruleInProgress.thenDetail !== undefined &&
                ruleInProgress.thenDetail[0] === "line" && (
                  <div className={styles.optionsHolder}>
                    <ColorPicker label="thenDetail" arrayIndex={1} />
                  </div>
                )}
              {ruleInProgress.thenDetail !== undefined &&
                ruleInProgress.thenDetail[0] === "circle" && (
                  <div>
                    <ColorPicker label="thenDetail" arrayIndex={1} />
                    <ScrollPicker
                      label="thenDetail"
                      arrayIndex={2}
                      options={["fill", "stroke"]}
                    />
                  </div>
                )}
              {ruleInProgress.thenDetail !== undefined &&
                ruleInProgress.thenDetail[0] === "star" && (
                  <div className={styles.optionsHolder}>
                    <ColorPicker label="thenDetail" arrayIndex={1} />
                    <ScrollPicker
                      label="thenDetail"
                      arrayIndex={2}
                      options={["fill", "stroke"]}
                    />
                  </div>
                )}
              {ruleInProgress.thenDetail !== undefined &&
                ruleInProgress.thenDetail[0] === "clipping" && (
                  <div className={styles.optionsHolder}>
                    <ScrollPicker
                      label="thenDetail"
                      arrayIndex={1}
                      options={["rect", "circ", "star"]}
                    />
                    <ColorPicker label="thenDetail" arrayIndex={2} />
                  </div>
                )}
              {ruleInProgress.thenDetail !== undefined &&
                ruleInProgress.thenDetail[0] === "text" && (
                  <div className={styles.optionsHolder}>
                    <ColorPicker label="thenDetail" arrayIndex={1} />
                    <TextInput label="thenDetail" arrayIndex={2} />
                    <ScrollPicker
                      label="thenDetail"
                      arrayIndex={3}
                      options={[30, 40, 50, 60, 70, 80, 90, 100]}
                    />
                  </div>
                )}
            </div>
          )}
          {ruleInProgress.thenType === "draw" && (
            <>
              <div className={styles.plainText}>draw</div>
              <ColorPicker label="thenDetail" arrayIndex={0} />
              <div className={styles.plainText}>color</div>
              <ScrollPicker
                label="thenDetail"
                arrayIndex={1}
                options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              />
              <div className={styles.plainText}>px line</div>
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
              <div className={styles.plainText}>play </div>
              <ScrollPicker
                label="thenDetail"
                arrayIndex={0}
                options={["drum", "cymbalB", "cymbalC"]}
              />
              <div className={styles.plainText}>sound </div>
            </>
          )}
          {ruleInProgress.thenType === "interface" && (
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
              <div className={styles.plainText}>transcribe on </div>
              <ColorPicker label="thenDetail" arrayIndex={1} />
              <div className={styles.plainText}>post-it </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
