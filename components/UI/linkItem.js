import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { hexToRGBA } from "../utils";
export const LinkItem = ({ title, link, desc, icon, fill, color }) => {
  const [hover, setHover] = useState(false);
  return (
    <Link href={link}>
      <motion.div
        style={{
          background: "white",
          color: "black",
          width: 200,
          height: 200,
          borderRadius: 10,
          cursor: "pointer",
          padding: 30,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: 15,
        }}
        onMouseOver={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        // whileHover={{ scale: 1.02 }}
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
