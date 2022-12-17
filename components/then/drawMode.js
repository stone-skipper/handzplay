import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useControlsStore } from "../../lib/store";
import DrawHover from "./drawHover";
import Cursor from "../UI/cursor";
import ColorSelect from "../UI/controls/color";

export default function DrawMode({}) {
  const clearBtn = useControlsStore((state) => state.clearBtn);
  const handColor = useControlsStore((state) => state.handColor);
  const drawMode = useControlsStore((state) => state.drawMode);

  const [hoverInfo, setHoverInfo] = useState([]);
  const [press, setPress] = useState(false);

  const [initialColor, setInitialColor] = useState("#ffffff");
  const [hoverColor, setHoverColor] = useState("#0066FF");
  const [hoverType, setHoverType] = useState("float");
  const [toggleTools, setToggleTools] = useState(true);

  useEffect(() => {
    if (hoverInfo.length !== 0) {
      useControlsStore.setState({ clearBtn: true });
    }
  }, [hoverInfo]);

  useEffect(() => {
    if (clearBtn === false) {
      setHoverInfo([]);
    }
  }, [clearBtn]);

  return (
    <motion.div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        cursor: "crosshair",
      }}
      onMouseDownCapture={(e) => {
        setPress(true);
        setHoverInfo([
          ...hoverInfo,
          {
            initialX: e.clientX,
            initialY: e.clientY,
            initialColor: initialColor,
            hoverColor: hoverColor,
            hoverType: hoverType,
          },
        ]);
      }}
      onMouseUpCapture={(e) => {
        console.log(e);
        setPress(false);
      }}
      onMouseMoveCapture={(e) => {
        if (press === true) {
          console.log(e.clientX, e.clientY);
          hoverInfo[hoverInfo.length - 1]["endX"] = e.clientX;
          hoverInfo[hoverInfo.length - 1]["endY"] = e.clientY;
        }
      }}
    >
      {hoverInfo.map((value, index) => {
        return (
          <DrawHover
            left={value.initialX}
            top={value.initialY}
            width={value.endX - value.initialX}
            height={value.endY - value.initialY}
            initialColor={value.initialColor}
            hoverColor={value.hoverColor}
            hoverType={value.hoverType}
            content=""
          />
        );
      })}
      <div
        style={{
          width: "100%",
          height: 200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          fontSize: "0.85em",
          fontWeight: 500,
          userSelect: "none",
        }}
      >
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 40,
            width: "fit-content",
            height: "fit-content",
            background: "white",
            padding: toggleTools === true ? "20px 50px" : "20px",
            borderRadius: 100,
          }}
          whileHover={{ scale: toggleTools === true ? 1 : 1.1 }}
        >
          {toggleTools === true && (
            <>
              <div>
                <ColorSelect
                  variable={initialColor}
                  onColorChange={(color) => {
                    setInitialColor(color.hex);
                  }}
                  border={true}
                />
                <p
                  style={{
                    fontSize: "0.8em",
                    textAlign: "center",
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  {" "}
                  initial color
                </p>
              </div>

              <div>
                <ColorSelect
                  variable={hoverColor}
                  onColorChange={(color) => {
                    setHoverColor(color.hex);
                  }}
                  border={true}
                />
                <p
                  style={{
                    fontSize: "0.8em",
                    textAlign: "center",
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  {" "}
                  hover color
                </p>
              </div>
              <div
                style={{
                  height: "100%",
                  width: "fit-content",
                  display: "flex",
                  alignItems: "stretch",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "stretch",
                    width: "100%",
                    gap: 10,
                    borderBottom: "1px solid grey",
                    padding: "7px 0",
                    textTransform: "uppercase",
                  }}
                >
                  <div
                    style={{
                      cursor: "pointer",
                      color: hoverType === "float" ? handColor : "lightgrey",
                      height: "100%",
                    }}
                    onClick={() => {
                      setHoverType("float");
                    }}
                  >
                    float
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                      color: hoverType === "color" ? handColor : "lightgrey",
                    }}
                    onClick={() => {
                      setHoverType("color");
                    }}
                  >
                    color
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "0.8em",
                    textAlign: "center",
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  {" "}
                  hover type
                </p>
              </div>

              <div
                style={{
                  opacity: hoverInfo.length !== 0 ? 1 : 0.4,
                  cursor: hoverInfo.length !== 0 ? "pointer" : "initial",
                  userSelect: "none",
                  height: "100%",
                }}
                onClick={() => {
                  useControlsStore.setState({ clearBtn: false });
                }}
              >
                clear
              </div>
            </>
          )}

          <div
            style={{
              cursor: "pointer",
              background: toggleTools === true ? "lightgrey" : "",
              borderRadius: 100,
              height: 30,
              width: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: toggleTools === true ? "1em" : "2em",
            }}
            onClick={() => {
              setToggleTools(!toggleTools);
            }}
          >
            {toggleTools === true ? "✕" : "🎨"}
          </div>
        </motion.div>
      </div>
      <Cursor />
    </motion.div>
  );
}
