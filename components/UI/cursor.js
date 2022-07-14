import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursorStore } from "../../lib/store";

export default function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const motionCursorSize = useMotionValue(28);

  const springConfig = { damping: 30, stiffness: 150, mass: 0.6 };

  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const cursorSizeSpring = useSpring(motionCursorSize, springConfig);

  const hover = useCursorStore((state) => state.hover);

  let timer;
  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - motionCursorSize.current / 2);
      cursorY.set(e.clientY - motionCursorSize.current / 2);

      if (hover === "default") {
        motionCursorSize.set(14);
      } else if (hover === "button") {
        motionCursorSize.set(100);
      }

      clearTimeout(timer);
      timer = setTimeout(mouseStopped, 100);
    };

    const mouseStopped = () => {
      if (hover === "default") {
        motionCursorSize.set(28);
      } else if (hover === "button") {
        motionCursorSize.set(100);
      }
    };
    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [hover]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 20,
        width: cursorSizeSpring,
        height: cursorSizeSpring,
        borderRadius: 100,
        // mixBlendMode:
        //   hover === "default" || hover === "button" ? "difference" : "normal",
        background: "white",
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        pointerEvents: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></motion.div>
  );
}
