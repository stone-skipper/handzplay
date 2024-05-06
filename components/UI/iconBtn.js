import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { hexToRGBA } from "../utils";
import TextMotion from "./textmotion";

export const IconBtn = ({ title, bg = null, link, icon, fill, color }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        background: bg === null ? "transparent" : bg,
        position: "fixed",
        top: 4,
        right: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: "fit-content",
      }}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div
        style={{
          position: "absolute",

          display: hover === true ? "flex" : "none",
          height: "100%",
          width: 300,
          justifyContent: "flex-end",
          alignItems: "center",
          right: 70,
          textTransform: "uppercase",
          //   right: 0,
          //   top: 0,
        }}
      >
        <TextMotion
          font='"Gainsborough", sans-serif'
          content={title}
          fontSize={14}
          delay={0}
          color={color}
          letterSpacing="0.3rem"
        />
      </div>
      <motion.div
        style={{
          background: hexToRGBA(color, 0.1),
          padding: 10,
          borderRadius: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        whileHover={{ scale: 1.05 }}
      >
        <Link href={link}>{hover === true ? fill : icon}</Link>
      </motion.div>
    </div>
  );
};
