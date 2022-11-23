import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useControlsStore } from "../../lib/store";

export default function HoverClick({
  width,
  height,
  initialColor,
  hoverColor,
  content,
}) {
  const handColor = useControlsStore((state) => state.handColor);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {}, []);

  return (
    <motion.div
      style={{
        width: width,
        height: height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      animate={{}}
    >
      {content}
    </motion.div>
  );
}
