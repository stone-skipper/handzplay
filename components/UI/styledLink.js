import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function StyledLink({ title, link, copyToClipboard = false }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      style={{
        color: "white",
        display: "inline-flex",
        width: "fit-content",
        height: "fit-content",
        borderBottom: "1px solid white",
        cursor: "pointer",
        userSelect: "none",
      }}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={() => {
        if (copyToClipboard === true) {
          navigator.clipboard.writeText(link);
        } else {
        }
      }}
    >
      {copyToClipboard === false && (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      )}
      {copyToClipboard === true && title}

      <motion.div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.2em",
          height: 15,
          width: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        animate={{
          rotate: hover === true ? 0 : -45,
        }}
      >
        {hover === true ? "👋" : "→"}
      </motion.div>
    </motion.div>
  );
}
