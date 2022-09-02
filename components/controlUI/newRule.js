import { useRulesStore } from "../../lib/store";
import shallow from "zustand/shallow";

import { useEffect, useState, useRef } from "react";
import styles from "./panels.module.scss";

import { motion } from "framer-motion";
import ScrollPicker from "./scrollPicker";
import EnumSelect from "./enumSelect";
import ColorPicker from "./colorPicker";

export default function NewRule({ options, onScroll }) {
  const ruleInProgress = useRulesStore((state) => state.ruleInProgress);

  useEffect(() => {
    console.log(ruleInProgress);
  }, [ruleInProgress]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <EnumSelect
          title="Trigger"
          label="ifType"
          options={["pose", "finger"]}
        />
        <EnumSelect
          title="Result"
          label="thenType"
          options={["shape", "draw", "audio", "element", "stamp"]}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {(ruleInProgress.ifType !== undefined ||
          ruleInProgress.thenType !== undefined) && (
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
                width: "90%",
                height: 36,
                border: "2px solid blue",
                borderRadius: 10,
              }}
            ></div>
          </div>
        )}

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
        {ruleInProgress.ifType === "finger" && (
          <>
            <div>if</div>

            <ScrollPicker
              label="fingerA"
              options={[
                "left thumb",
                "left index",
                "left middle",
                "left ring",
                "left pinky",
                "right thumb",
                "right index",
                "right middle",
                "right ring",
                "right pinky",
              ]}
            />
            <div>and</div>

            <ScrollPicker
              label="fingerB"
              options={[
                "left thumb",
                "left index",
                "left middle",
                "left ring",
                "left pinky",
                "right thumb",
                "right index",
                "right middle",
                "right ring",
                "right pinky",
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
        <div>{"->"}</div>
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
          </>
        )}
      </div>
    </>
  );
}
