import { motion } from "framer-motion";
import { useControlsStore } from "../../lib/store";
import { useState, useEffect } from "react";

export default function LoadingSlider() {
  const handReady = useControlsStore((state) => state.handReady);
  const cameraAccess = useControlsStore((state) => state.cameraAccess);
  const [loading, setLoading] = useState(0);
  useEffect(() => {
    if (cameraAccess === false && handReady === false) {
      setLoading(20);
    } else if (cameraAccess === true && handReady === false) {
      setLoading(70);
    } else if (cameraAccess === true && handReady === true) {
      setLoading(100);
    }
  }, [handReady, cameraAccess]);
  return (
    <motion.div
      style={{
        width: 400,
        marginTop: 45,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      {/* line */}
      <motion.div
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.5)",
          height: 1,
          position: "relative",
        }}
      >
        <motion.div
          style={{ height: "100%", background: "white" }}
          initial={{ width: 0 }}
          animate={{ width: loading + "%" }}
          transition={{ duration: 2 }}
        ></motion.div>
        <motion.div
          style={{
            width: 20,
            height: 20,
            borderBottom: "1px solid white",
            position: "absolute",
            top: -10,
            right: 0,
            rotate: -45,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: loading === 100 ? 1 : 0,
          }}
          transition={{ delay: 2 }}
        ></motion.div>
        <motion.div
          style={{
            width: 20,
            height: 20,
            borderTop: "1px solid white",
            position: "absolute",
            top: -10,
            right: 0,
            rotate: 45,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: loading === 100 ? 1 : 0,
          }}
          transition={{ delay: 2 }}
        ></motion.div>
      </motion.div>

      {/* status message */}
      <p style={{ marginTop: 15, color: "white", fontSize: 10, width: "100%" }}>
        {cameraAccess !== true && "waiting for an access to camera"}
        {cameraAccess === true && handReady !== true && "waking up blah blah"}
        {cameraAccess === true &&
          handReady === true &&
          "all set! Two thumbs up to start"}
      </p>
    </motion.div>
  );
}
