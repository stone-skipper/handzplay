import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const letterContainerVariants = {
  before: { transition: { staggerChildren: 0.015 } },
  after: { transition: { staggerChildren: 0.03 } },
};

const letterVariants = {
  before: {
    opacity: 0,
    y: 20,
    rotate: -10,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
  },
  after: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
  },
};

export default function TextMotion({
  fontSize,
  color,
  content,
  delay = 0,
  width = null,
  font = null,
  letterSpacing = "normal",
  textCenter = false,
}) {
  //   const splitted = referer?.split('/') || []
  const [ref, inView] = useInView();
  const controls = useAnimation();
  const [activePresetInView, setActivePresetInView] = useState(false);
  useEffect(() => {
    if (inView) {
      controls.start("after");
    } else {
      controls.start("before");
    }
  }, [controls, inView]);

  setTimeout(() => {
    setActivePresetInView(true);
  }, delay * 1000);
  return (
    <AnimatePresence>
      {activePresetInView && (
        <motion.div
          style={{
            position: "relative",
            wordBreak: "break-word",
            width: width,
          }}
        >
          <motion.h1
            variants={letterContainerVariants}
            ref={ref}
            initial={"before"}
            animate={controls}
            style={{ margin: 0, padding: 0 }}
          >
            <motion.div
              style={{
                textAlign: "left",
                color: color,
                fontFamily: font,
                fontWeight: 400,
                fontSize: fontSize,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              {content.split(" ").map((word, wordI) => (
                <div
                  key={`word-${word}-${wordI}`}
                  style={{
                    display: "inline-block",
                  }}
                >
                  {Array.from(word).map((letter, index) => (
                    <motion.span
                      key={`${index}-${letter}`}
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "auto",
                        letterSpacing:
                          index === word.length - 1 ? 0 : letterSpacing,
                      }} // Position elements
                      variants={letterVariants}
                      transition={{ duration: 0.5 }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                  {/* remove the last spacing */}
                  {wordI !== content.split(" ").length - 1 ? "\u00A0" : null}
                </div>
              ))}
            </motion.div>
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
