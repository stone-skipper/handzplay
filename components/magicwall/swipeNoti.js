import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SwipeNoti({
  display = true,
  type = 2,
  accept,
  decline,
}) {
  const [bg, setBg] = useState("white");

  useEffect(() => {
    if (accept === true) {
      setBg("#C0DD78");
    } else if (decline === true) {
      setBg("#FFC3C9");
    }
  }, [accept, decline]);
  return (
    <>
      {type === 0 && (
        <motion.div
          animate={{
            opacity: display === true ? 1 : 0,
            y: display === true ? 0 : 20,
          }}
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: 18,
            background: bg,
            borderRadius: 14,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "TTcommonsDemiBold",
            boxShadow:
              "0px 1.56449px 1.56449px rgba(0, 42, 88, 0.08), 0px 3.12899px 3.12899px rgba(0, 42, 88, 0.08), 0px 6.25798px 6.25798px rgba(0, 42, 88, 0.08), 0px 12.516px 12.516px rgba(0, 42, 88, 0.08)",
          }}
          transition={{ duration: 0.3 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "fit-content",
              height: "fit-content",
              position: "relative",
              gap: 15,
            }}
          >
            <img style={{ width: 50, height: 50 }} src="magicwall/avatar.png" />
            <div
              style={{
                width: 300,
                height: 60,
                display: "flex",
                alignItems: "center",
                fontSize: 20,
              }}
            >
              John Liu is inviting you for collaboration.
            </div>
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <motion.div
                style={{
                  background: "#C0DD78",
                  padding: 20,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  scale: accept === true ? 1.1 : 1,
                  fontSize: 20,
                }}
              >
                accept
              </motion.div>
              <motion.div
                style={{
                  background: "#FFC3C9",
                  padding: 20,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  scale: decline === true ? 1.1 : 1,
                  fontSize: 20,
                }}
              >
                decline
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {type === 1 && (
        <motion.div
          animate={{
            opacity: display === true ? 1 : 0,
            y: display === true ? 0 : 20,
          }}
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: 18,
            background: bg,
            borderRadius: 14,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "TTcommonsDemiBold",
            boxShadow:
              "0px 1.56449px 1.56449px rgba(0, 42, 88, 0.08), 0px 3.12899px 3.12899px rgba(0, 42, 88, 0.08), 0px 6.25798px 6.25798px rgba(0, 42, 88, 0.08), 0px 12.516px 12.516px rgba(0, 42, 88, 0.08)",
          }}
          transition={{ duration: 0.3 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "fit-content",
              height: "fit-content",
              position: "relative",
              gap: 15,
            }}
          >
            <motion.div
              style={{
                width: 200,
                height: "fit-content",
                background:
                  "linear-gradient(270deg, #C0DD78 0%, rgba(192, 221, 120, 0) 100%)",
                borderRadius: 10,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <motion.div
                style={{
                  background: "#C0DD78",
                  padding: 20,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  scale: accept === true ? 1.1 : 1,
                  fontSize: 20,
                }}
                initial={{ x: 0 }}
                animate={{ x: -40 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 1,
                }}
              >
                accept
              </motion.div>
            </motion.div>
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <img
                style={{ width: 50, height: 50 }}
                src="magicwall/avatar.png"
              />
              <div
                style={{
                  width: 300,
                  height: 60,
                  fontSize: 20,
                }}
              >
                John Liu is inviting you for collaboration.
              </div>
            </div>
            <motion.div
              style={{
                width: 200,
                height: "fit-content",
                background:
                  "linear-gradient(270deg, rgba(254, 104, 115, 0) 0%, #FE6873 100%)",
                borderRadius: 10,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <motion.div
                style={{
                  background: "#FFC3C9",
                  padding: 20,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  scale: decline === true ? 1.1 : 1,
                  fontSize: 20,
                }}
                initial={{ x: 0 }}
                animate={{ x: 40 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 1,
                }}
              >
                decline
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
      {type === 2 && (
        <motion.div
          animate={{
            opacity: display === true ? 1 : 0,
            y: display === true ? 0 : 20,
          }}
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: 18,
            background: bg,
            borderRadius: 14,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "TTcommonsDemiBold",
            boxShadow:
              "0px 1.56449px 1.56449px rgba(0, 42, 88, 0.08), 0px 3.12899px 3.12899px rgba(0, 42, 88, 0.08), 0px 6.25798px 6.25798px rgba(0, 42, 88, 0.08), 0px 12.516px 12.516px rgba(0, 42, 88, 0.08)",
          }}
          transition={{ duration: 0.3 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "fit-content",
              height: "fit-content",
              position: "relative",
              flexDirection: "column",
              gap: 35,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
              }}
            >
              <img
                style={{ width: 50, height: 50 }}
                src="magicwall/avatar.png"
              />
              <div
                style={{
                  width: 200,
                  fontSize: 20,
                }}
              >
                John Liu is inviting you for collaboration.
              </div>
            </div>
            <div
              style={{
                width: 400,
                height: 60,
                background:
                  "linear-gradient(90deg, #C0DD78 34.85%, #FFC3C9 63.09%)",
                borderRadius: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ padding: 10 }}>accept</div>
              <div
                style={{
                  padding: 8,
                  width: 36,
                  height: 36,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                  background: "white",
                  boxShadow:
                    "0px 1.56449px 1.56449px rgba(0, 42, 88, 0.08), 0px 3.12899px 3.12899px rgba(0, 42, 88, 0.08), 0px 6.25798px 6.25798px rgba(0, 42, 88, 0.08), 0px 12.516px 12.516px rgba(0, 42, 88, 0.08)",
                }}
              >
                <img
                  src="magicwall/hand.png"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div style={{ padding: 10 }}>decline</div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
