import { motion } from "framer-motion";

export default function Auth({
  display = true,
  detectRaisedHand = false,
  triggerFace = false,
}) {
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
        background: "white",
      }}
    >
      <div
        style={{
          width: "80vw",
          height: "80vh",
          overflow: "hidden",
          borderRadius: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "#A4B8CD",
          gap: 50,
        }}
      >
        <img src="magicwall/smiley.png"></img>

        <div>
          <motion.div
            style={{
              fontSize: 60,
              width: "100%",
              textAlign: "center",
              originY: 1,
            }}
            initial={{ rotate: detectRaisedHand === true ? 0 : -20 }}
            animate={{
              opacity: detectRaisedHand === true ? 1 : 0.2,
              rotate: detectRaisedHand === true ? 0 : 20,
            }}
            transition={{
              rotate: {
                repeat: detectRaisedHand === true ? 0 : Infinity,
                duration: 0.4,
                repeatType: "reverse",
              },
            }}
          >
            ✋
          </motion.div>
          {detectRaisedHand === true
            ? "hold still for 1 sec"
            : "wave to sign in"}
        </div>
      </div>
    </div>
  );
}
