import { useRulesStore, useControlsStore } from "../../lib/store";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./panels.module.scss";
import EnumSelect from "./enumSelect";
import ColorPicker from "./colorPicker";
import TextInput from "./textInput";

export default function NewInterface({}) {
  const ruleInProgress = useRulesStore((state) => state.ruleInProgress);
  const updateRuleInProgress = useRulesStore(
    (state) => state.updateRuleInProgress
  );

  useEffect(() => {
    updateRuleInProgress("ifType", "action");
    updateRuleInProgress("thenType", "interface");
    console.log(ruleInProgress);
  }, [ruleInProgress]);

  //   updateRuleInProgress(label, value, arrayIndex);

  const ReactionWrapper = ({ title, options, label }) => {
    const [add, setAdd] = useState(false);
    return (
      <div
        style={{
          padding: 10,
          opacity: add === true ? 1 : 0.4,
          display: "flex",
          background: "#F0F4FB",
          gap: 10,
          justifyContent: "space-between",
          borderRadius: 5,
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <motion.div
            className={styles.delete}
            style={{
              cursor: "pointer",
              userSelect: "none",
            }}
            animate={{
              rotate: add === true ? 45 : 0,
            }}
            onClick={() => {
              setAdd(!add);
            }}
          >
            +
          </motion.div>
          <div>{title}</div>
        </div>

        <EnumSelect title="" label={label} arrayIndex={0} options={options} />
      </div>
    );
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          flexDirection: "column",
          // padding: "12px 0",
          background: "white",
          borderRadius: 10,
          padding: "24px 16px",
          flexGrow: 0.5,
          boxShadow: "0px -10px 54px 0px #004DC014",
          boxSizing: "border-box",
          width: "fit-content",
          minWidth: "52.8vw",
          gap: 10,
          // borderBottom: "1px solid black",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            borderBottom: "1px solid black",
            paddingBottom: 10,
          }}
        >
          <div style={{ width: "40%" }}>initial status</div>
          <div style={{ width: "60%" }}>reaction</div>
        </div>
        <div style={{ width: "100%", display: "flex", gap: 5 }}>
          <div style={{ width: "40%", background: "#F0F4FB", borderRadius: 5 }}>
            <div
              style={{
                padding: 10,
                display: "flex",
                gap: 15,
                flexDirection: "column",
              }}
            >
              <EnumSelect
                title="Shape"
                label="thenDetail"
                arrayIndex={0}
                options={["rect", "circle", "text"]}
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                Color <ColorPicker label="thenDetail" arrayIndex={1} />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                Size{" "}
                <TextInput
                  label="thenDetail"
                  arrayIndex={2}
                  number={true}
                  placeholder={60}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                Text <TextInput label="thenDetail" arrayIndex={3} />
              </div>
            </div>
          </div>
          <div
            style={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <ReactionWrapper
              title="Swipe Left"
              options={["color", "size", "position", "text"]}
              label="left"
            />
            <ReactionWrapper
              title="Swipe Right"
              options={["color", "size", "position", "text"]}
              label="right"
            />
            <ReactionWrapper
              title="Swipe Up"
              options={["color", "size", "position", "text"]}
              label="up"
            />
            <ReactionWrapper
              title="Swipe Down"
              options={["color", "size", "position", "text"]}
              label="down"
            />
            <ReactionWrapper
              title="Hover"
              options={["color", "size", "position", "text"]}
              label="hover"
            />
            <ReactionWrapper
              title="Click"
              options={["okay", "pointer", "rock", "thumb"]}
              label="click"
            />
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          top: -200,
          height: 200,
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* preview */}
        {ruleInProgress.thenDetail !== undefined && (
          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            <p style={{ opacity: 0.5, textAlign: "center", fontSize: "0.8em" }}>
              preview
            </p>
            <motion.div
              style={{
                background:
                  ruleInProgress.thenDetail[0] === "text"
                    ? "transparent"
                    : ruleInProgress.thenDetail[1],
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius:
                  ruleInProgress.thenDetail[0] === "circle" ? 300 : 0,
                color: "white",
              }}
              animate={{
                width: ruleInProgress.thenDetail[2],
                height: ruleInProgress.thenDetail[2],
              }}
            >
              <span style={{ mixBlendMode: "difference" }}>
                {ruleInProgress.thenDetail[3]}
              </span>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}
