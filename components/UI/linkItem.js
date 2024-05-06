import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { hexToRGBA } from "../utils";
export const LinkItem = ({
  title,
  link,
  desc,
  icon,
  fill,
  color,
  active = true,
}) => {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={link}
      aria-disabled={!active}
      style={{ pointerEvents: active === true ? "auto" : "none" }}
    >
      <motion.div
        style={{
          background: "white",
          color: "black",
          width: 200,
          height: 300,
          borderRadius: 10,
          cursor: active === true ? "pointer" : "default",
          padding: 30,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: 15,
          opacity: active === true ? 1 : 0.5,
          userSelect: "none",
          position: "relative",
        }}
        onMouseOver={() => {
          if (active === true) {
            setHover(true);
          }
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        whileHover={{ scale: active === true ? 1.02 : 1 }}
      >
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            borderRadius: 100,
            background: hexToRGBA(color, 0.1),
          }}
          animate={{ scale: hover === true ? 1.1 : 1 }}
        >
          {hover === true ? fill : icon}
        </motion.div>

        <motion.span
          style={{
            fontFamily: '"Gainsborough", sans-serif',
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            whiteSpace: "pre-wrap",
          }}
          animate={{ color: hover === true ? color : "black" }}
        >
          {title}
        </motion.span>
        <div style={{ height: "100%" }}></div>
        {active === false && (
          <div
            style={{
              background: hexToRGBA(color, 0.2),
              //   position: "absolute",
              color: color,
              padding: "5px 8px",
              borderRadius: 5,
              fontSize: "0.7em",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Coming Soon
          </div>
        )}
        <span
          style={{
            fontWeight: 500,
            fontSize: "0.9em",
            whiteSpace: "pre-wrap",
          }}
        >
          {desc}
        </span>
      </motion.div>
    </Link>
  );
};
