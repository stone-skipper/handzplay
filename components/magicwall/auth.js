import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMagicWallStore } from "../../lib/store";

export default function Auth({ display = true, detectRaisedHand = false }) {
  const [verified, setVerified] = useState(false);
  const [verificationTimer, setVerificationTimer] = useState(0);
  const sequence = useMagicWallStore((state) => state.sequence);

  useEffect(() => {
    let timerId;
    if (display === true && detectRaisedHand === true) {
      timerId = setInterval(() => {
        setVerificationTimer((prev) => prev + 100);
      }, 100);
    } else if (display === true && detectRaisedHand === false) {
      setVerificationTimer(0);
    }

    return function cleanup() {
      clearInterval(timerId);
    };
  }, [detectRaisedHand]);

  useEffect(() => {
    if (verificationTimer > 1000) {
      setVerified(true);
    }
  }, [verificationTimer]);

  useEffect(() => {
    if (verified === true) {
      setTimeout(() => {
        useMagicWallStore.setState({ sequence: sequence + 1 });
      }, 1000);
    }
  }, [verified]);

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
        <motion.div
          style={{
            display: verified === true ? "none" : "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 83,
            height: 83,
            borderRadius: 80,
            overflow: detectRaisedHand === true ? "hidden" : "visible",
            strokeLinecap: "round",
          }}
          animate={{
            borderTop: detectRaisedHand === true ? "5px solid #A4B8CD" : "none",
            borderRight:
              detectRaisedHand === true ? "5px solid #A4B8CD" : "none",
            borderBottom:
              detectRaisedHand === true ? "5px solid #A4B8CD" : "none",
            borderLeft:
              detectRaisedHand === true ? "5px solid #A4B8CD" : "none",
          }}
          transition={{
            borderTop: { duration: 0.2, delay: 0 },
            borderRight: { duration: 0.2, delay: 0.2 },
            borderBottom: { duration: 0.2, delay: 0.4 },
            borderLeft: { duration: 0.2, delay: 0.6 },
          }}
        >
          <img src="magicwall/smiley.png"></img>
        </motion.div>

        <div style={{ display: verified === true ? "none" : "block" }}>
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
            : "wave to sign in"}{" "}
          {verificationTimer}
        </div>
        <motion.div
          style={{ fontSize: 35 }}
          animate={{
            opacity: verified === true ? 1 : 0,
            y: verified === true ? 0 : 40,
          }}
        >
          Hello Sam
        </motion.div>
      </div>
    </div>
  );
}
