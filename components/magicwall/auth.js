import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Auth({
  display = true,
  detectRaisedHand = false,
  triggerFace = false,
}) {
  const [verified, setVerified] = useState(false);
  const [verificationTimer, setVerificationTimer] = useState(0);
  useEffect(() => {
    if (detectRaisedHand === true) {
      setTimeout(() => {
        setVerified(true);
      }, 1000);
      // setVerified(true);
      // const interval = setInterval(() => {
      //   setVerificationTimer(verificationTimer + 100);
      // }, 100);
      // return () => clearInterval(interval);
    } else {
      // setVerificationTimer(0);
    }
  }, [detectRaisedHand]);

  // useEffect(() => {
  //   if (verificationTimer > 1000) {
  //     setVerified(true);
  //   }
  // }, [verificationTimer]);

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
