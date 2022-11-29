import { useEffect, useRef } from "react";
import { useControlsStore, useMagicWallStore } from "../../lib/store";
import Auth from "./auth";
import { motion } from "framer-motion";

export default function AmbientMode({ display = true }) {
  // const currentActionL = useControlsStore((state) => state.currentActionL);
  // const currentActionR = useControlsStore((state) => state.currentActionR);
  const currentPoseR = useControlsStore((state) => state.currentPoseR);
  const currentPoseL = useControlsStore((state) => state.currentPoseL);
  const videoRef = useRef();
  const sequence = useMagicWallStore((state) => state.sequence);

  useEffect(() => {
    if (videoRef.current !== undefined) {
      videoRef.current.play();
      videoRef.current.playbackRate = 0.5;
    }
  }, [videoRef.current]);
  // useEffect(() => {
  //   if (
  //     sequence === 0 &&
  //     (currentActionL === "left" || currentActionR === "left")
  //   ) {
  //     useMagicWallStore.setState({ sequence: 1 });
  //   }
  // }, [currentActionL, currentActionR]);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: display === true ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <motion.div
        style={{
          width: "80vw",
          height: "80vh",
          background: "#EBF1F6",
          overflow: "hidden",
          borderRadius: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
        }}
        animate={{ opacity: sequence === 0 ? 1 : 0.4 }}
      >
        <video width="100%" autoplay muted controls={true} loop ref={videoRef}>
          <source src="magicwall/landscape.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <Auth
        display={sequence === 1 ? true : false}
        detectRaisedHand={
          currentPoseL === "five" || currentPoseR === "five" ? true : false
        }
      />
    </div>
  );
}
