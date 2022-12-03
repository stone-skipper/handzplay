import { useRulesStore, useControlsStore } from "../../lib/store";
import shallow from "zustand/shallow";

import { useEffect, useState, useRef } from "react";
import styles from "./panels.module.scss";

import { motion } from "framer-motion";
import ScrollPicker from "./scrollPicker";
import EnumSelect from "./enumSelect";
import ColorPicker from "./colorPicker";
import TextInput from "./textInput";

export default function NewRule({ options, onScroll }) {
  const ruleInProgress = useRulesStore((state) => state.ruleInProgress);
  const handColor = useControlsStore((state) => state.handColor);
  const removeProperty = useRulesStore((state) => state.removeProperty);
  const [highlight, setHighlight] = useState(0);
  useEffect(() => {
    console.log(ruleInProgress);
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
          justifyContent: "center",
          alignItems: "center",
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
                "action",
              ]}
            />
          </span>
        </div>
        <div
          style={{
            background: "white",
            borderRadius: 10,
            padding: "24px 16px",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 0.5,
            border: highlight === 1 ? "2px solid #0066FF" : "2px solid white",
            boxShadow: "0px -10px 54px 0px #004DC014",
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
                ruleInProgress.ifType === "action"
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
          width: "fit-content",
          minWidth: "52.8vw",
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
              height: 65,
              zIndex: 2,
              pointerEvents: "none",

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
              height: 65,
              zIndex: 2,
              // background: "blue",
              pointerEvents: "none",
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
                  "thumb_up",
                  "spidey",
                  "pointer",
                  "three",
                  "four",
                  "five",
                  "okay",
                  "rock",
                ]}
              />
            </>
          )}
          {ruleInProgress.ifType === "action" &&
            ruleInProgress.thenType === "audio" && (
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
                  "thumbTapL",
                  "thumbTapR",
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
                  "thumbTapL",
                  "thumbTapR",
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
        {ruleInProgress.thenType === "interface" &&
        ruleInProgress.ifType === "action" ? null : (
          <div>{"->"}</div>
        )}

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
                options={["drum", "piano"]}
              />
              {ruleInProgress.thenDetail[0] === "drum" && (
                <ScrollPicker
                  label="thenDetail"
                  arrayIndex={1}
                  options={[
                    "Crash",
                    "FloorTom",
                    "Hihat",
                    "Kick",
                    "RackTom",
                    "Ride",
                    "Sidestick",
                    "Snare",
                  ]}
                />
              )}
              {ruleInProgress.thenDetail[0] === "piano" && (
                <ScrollPicker
                  label="thenDetail"
                  arrayIndex={1}
                  options={["C4", "D", "E", "F", "G", "A", "B", "C5"]}
                />
              )}

              <div className={styles.plainText}>sound </div>
            </>
          )}
          {ruleInProgress.thenType === "interface" &&
            ruleInProgress.ifType !== "action" && (
              <>
                <ScrollPicker
                  label="thenDetail"
                  arrayIndex={0}
                  options={["rect", "circle", "text"]}
                />
                <div className={styles.plainText}>to change</div>
                {ruleInProgress.thenDetail !== undefined &&
                  ruleInProgress.thenDetail[0] !== "text" && (
                    <ScrollPicker
                      label="thenDetail"
                      arrayIndex={1}
                      options={["color", "size", "opacity", "position"]}
                    />
                  )}
                {ruleInProgress.thenDetail !== undefined &&
                  ruleInProgress.thenDetail[0] === "text" && (
                    <ScrollPicker
                      label="thenDetail"
                      arrayIndex={1}
                      options={[
                        "color",
                        "size",
                        "opacity",
                        "position",
                        "content",
                      ]}
                    />
                  )}
                {ruleInProgress.thenDetail !== undefined &&
                  ruleInProgress.thenDetail[1] === "color" && (
                    <>
                      <div className={styles.plainText}>from</div>
                      <ColorPicker label="thenDetail" arrayIndex={2} />
                      <div className={styles.plainText}>to</div>
                      <ColorPicker label="thenDetail" arrayIndex={3} />
                    </>
                  )}
                {ruleInProgress.thenDetail !== undefined &&
                  ruleInProgress.thenDetail[1] === "size" && (
                    <>
                      <div className={styles.plainText}>from</div>
                      <ScrollPicker
                        label="thenDetail"
                        arrayIndex={2}
                        options={[10, 20, 30, 40, 50, 60, 70, 80]}
                      />
                      <div className={styles.plainText}>to</div>
                      <ScrollPicker
                        label="thenDetail"
                        arrayIndex={3}
                        options={[10, 20, 30, 40, 50, 60, 70, 80]}
                      />
                    </>
                  )}
                {ruleInProgress.thenDetail !== undefined &&
                  ruleInProgress.thenDetail[1] === "opacity" && (
                    <>
                      <div className={styles.plainText}>from</div>
                      <ScrollPicker
                        label="thenDetail"
                        arrayIndex={2}
                        options={[
                          0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
                        ]}
                      />
                      <div className={styles.plainText}>to</div>
                      <ScrollPicker
                        label="thenDetail"
                        arrayIndex={3}
                        options={[
                          0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
                        ]}
                      />
                    </>
                  )}
                {ruleInProgress.thenDetail !== undefined &&
                  ruleInProgress.thenDetail[1] === "position" && (
                    <>
                      <div className={styles.plainText}>by</div>
                      <ScrollPicker
                        label="thenDetail"
                        arrayIndex={2}
                        options={[10, 20, 30, 40, 50, 60, 70, 80]}
                      />
                      <div className={styles.plainText}>to</div>
                      <ScrollPicker
                        label="thenDetail"
                        arrayIndex={3}
                        options={["x", "y"]}
                      />
                      <div className={styles.plainText}>axis</div>
                    </>
                  )}
                {ruleInProgress.thenDetail !== undefined &&
                  ruleInProgress.thenDetail[1] === "content" && (
                    <>
                      <div className={styles.plainText}>from</div>
                      <TextInput label="thenDetail" arrayIndex={2} />
                      <div className={styles.plainText}>to</div>
                      <TextInput label="thenDetail" arrayIndex={3} />
                    </>
                  )}
              </>
            )}
          {ruleInProgress.thenType === "interface" &&
            ruleInProgress.ifType === "action" && (
              <>
                {/* initial status */}

                {/* type */}
                <ScrollPicker
                  label="thenDetail"
                  arrayIndex={0}
                  options={["rect", "circle", "text"]}
                />
                <div className={styles.plainText}>sized</div>
                <ScrollPicker
                  label="thenDetail"
                  arrayIndex={1}
                  options={[20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300]}
                />
                <ColorPicker label="thenDetail" arrayIndex={2} />
                <TextInput label="thenDetail" arrayIndex={3} />
                <div className={styles.plainText}>changes</div>
                <ScrollPicker
                  label="thenDetail"
                  arrayIndex={4}
                  options={["color", "size", "rotate", "text"]}
                />
                <div className={styles.plainText}>when hand swipes to </div>

                {ruleInProgress.thenDetail !== undefined &&
                  ruleInProgress.thenDetail[4] === "color" && (
                    <>
                      <div className={styles.plainText}>←</div>
                      <ColorPicker label="thenDetail" arrayIndex={5} />
                      <div className={styles.plainText}>→</div>
                      <ColorPicker label="thenDetail" arrayIndex={6} />
                      <div className={styles.plainText}>↑</div>
                      <ColorPicker label="thenDetail" arrayIndex={7} />
                      <div className={styles.plainText}>↓</div>
                      <ColorPicker label="thenDetail" arrayIndex={8} />
                    </>
                  )}
                {ruleInProgress.thenDetail !== undefined &&
                  ruleInProgress.thenDetail[4] === "size" && (
                    <>
                      <div className={styles.plainText}>←</div>
                      <ScrollPicker
                        label="thenDetail"
                        arrayIndex={5}
                        options={[-30, -20, -10, 0, 10, 20, 30, 40]}
                      />
                      <div className={styles.plainText}>→</div>
                      <ScrollPicker
                        label="thenDetail"
                        arrayIndex={6}
                        options={[-30, -20, -10, 0, 10, 20, 30, 40]}
                      />
                      <div className={styles.plainText}>↑</div>
                      <ScrollPicker
                        label="thenDetail"
                        arrayIndex={7}
                        options={[-30, -20, -10, 0, 10, 20, 30, 40]}
                      />
                      <div className={styles.plainText}>↓</div>
                      <ScrollPicker
                        label="thenDetail"
                        arrayIndex={8}
                        options={[-30, -20, -10, 0, 10, 20, 30, 40]}
                      />
                    </>
                  )}
                {ruleInProgress.thenDetail !== undefined &&
                  ruleInProgress.thenDetail[4] === "rotate" && (
                    <>
                      <div className={styles.plainText}>←</div>
                      <ScrollPicker
                        label="thenDetail"
                        arrayIndex={5}
                        options={[-30, -20, -10, 0, 10, 20, 30, 40]}
                      />
                      <div className={styles.plainText}>→</div>
                      <ScrollPicker
                        label="thenDetail"
                        arrayIndex={6}
                        options={[-30, -20, -10, 0, 10, 20, 30, 40]}
                      />
                      <div className={styles.plainText}>↑</div>
                      <ScrollPicker
                        label="thenDetail"
                        arrayIndex={7}
                        options={[-30, -20, -10, 0, 10, 20, 30, 40]}
                      />
                      <div className={styles.plainText}>↓</div>
                      <ScrollPicker
                        label="thenDetail"
                        arrayIndex={8}
                        options={[-30, -20, -10, 0, 10, 20, 30, 40]}
                      />
                    </>
                  )}
                {ruleInProgress.thenDetail !== undefined &&
                  ruleInProgress.thenDetail[4] === "text" && (
                    <>
                      <div className={styles.plainText}>←</div>
                      <TextInput label="thenDetail" arrayIndex={5} />
                      <div className={styles.plainText}>→</div>
                      <TextInput label="thenDetail" arrayIndex={6} />
                      <div className={styles.plainText}>↑</div>
                      <TextInput label="thenDetail" arrayIndex={7} />
                      <div className={styles.plainText}>↓</div>
                      <TextInput label="thenDetail" arrayIndex={8} />
                    </>
                  )}
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
