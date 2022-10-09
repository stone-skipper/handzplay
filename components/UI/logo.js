import TextMotion from "../UI/textmotion";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Logo({
  text = "HANDZPLAY",
  color,
  displayTag,
  fontSize,
  delay = 0,
}) {
  return (
    <Link href="/">
      <motion.div
        style={{
          position: "relative",
          width: "fit-content",
          height: "fit-content",
          color: color,
          display: "flex",
          flexDirection: "column",
          gap: 5,
          cursor: "pointer",
        }}
      >
        <TextMotion
          font='"Gainsborough", sans-serif'
          content={text}
          fontSize={fontSize}
          delay={delay}
          color={color}
          letterSpacing="1.2rem"
        />
        <motion.p
          style={{
            width: "100%",
            fontFamily: '"Manrope", sans-serif',
            fontSize: 12,
            letterSpacing: "0.2rem",
            textTransform: "uppercase",
            display: displayTag === true ? "block" : "none",
            margin: 0,
            padding: 0,
            lineHeight: 1.4,
            fontWeight: 400,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.5 }}
        >
          Playground for your hands, <br />
          instead of your mouse
        </motion.p>
      </motion.div>
    </Link>
  );
}
