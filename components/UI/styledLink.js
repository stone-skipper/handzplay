import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function StyledLink({
  title,
  link,
  copyToClipboard = false,
  color = "white",
  underline = true,
}) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      style={{
        color: color,
        display: "inline-flex",
        width: "fit-content",
        height: "fit-content",
        borderBottom: underline === true ? "1px solid " + color : "none",
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
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: color }}
        >
          {title}
        </a>
      )}
      {copyToClipboard === true && title}

      <motion.div
        style={{
          fontFamily: "'Inter', sans-serif",
          //   fontSize: "1em",
          height: 15,
          width: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: color,
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
