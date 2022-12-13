import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SwipeNoti({ display = true, accept, decline }) {
  const [bg, setBg] = useState("white");
  const [type, setType] = useState(2);
  const type2variants = {
    default: { x: 0, background: "white" },
    decline: { x: 170, background: "#FFC3C9" },
    accept: { x: -170, background: "#C0DD78" },
  };

  useEffect(() => {
    if (accept === true) {
      setBg("#C0DD78");
    } else if (decline === true) {
      setBg("#FFC3C9");
    } else if (accept === false && decline === false) {
      setBg("white");
    }
  }, [accept, decline]);
  return (
    <>
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: "100%",
          left: 0,
          bottom: -50,
          justifyContent: "center",
          gap: 20,
          zIndex: 4,
          userSelect: "none",
        }}
      >
        <div
          onClick={() => {
            setType(0);
          }}
          style={{ cursor: "pointer" }}
        >
          type 0
        </div>
        <div
          onClick={() => {
            setType(1);
          }}
          style={{ cursor: "pointer" }}
        >
          type 1
        </div>
        <div
          onClick={() => {
            setType(2);
          }}
          style={{ cursor: "pointer" }}
        >
          type 2
        </div>
        <div
          onClick={() => {
            setType(3);
          }}
          style={{ cursor: "pointer" }}
        >
          type 3
        </div>
      </div>

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
                  background: "white",
                  padding: 20,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  scale: accept === true ? 1.1 : 1,
                  fontSize: 20,
                  scale: 0.9,
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
                  background: "white",
                  padding: 20,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  scale: decline === true ? 1.1 : 1,
                  fontSize: 20,
                  scale: 0.9,
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
            opacity: accept === true || decline === true ? 0 : 1,
            y: display === true ? 0 : 20,
          }}
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: 18,
            background: "white",
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
              <motion.div
                style={{
                  padding: 8,
                  width: 36,
                  height: 36,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                  boxShadow:
                    "0px 1.56449px 1.56449px rgba(0, 42, 88, 0.08), 0px 3.12899px 3.12899px rgba(0, 42, 88, 0.08), 0px 6.25798px 6.25798px rgba(0, 42, 88, 0.08), 0px 12.516px 12.516px rgba(0, 42, 88, 0.08)",
                }}
                variants={type2variants}
                initial={"default"}
                animate={
                  decline === true
                    ? "decline"
                    : accept === true
                    ? "accept"
                    : "default"
                }
              >
                <img
                  src="magicwall/hand.png"
                  style={{ width: "100%", height: "100%" }}
                />
              </motion.div>
              <div style={{ padding: 10 }}>decline</div>
            </div>
          </div>
        </motion.div>
      )}
      {type === 3 && (
        <motion.div
          style={{
            width: "fit-content",
            height: "fit-content",
            position: "relative",
          }}
          animate={{ opacity: accept === true || decline === true ? 0 : 1 }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "150%",
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "-25%",
              zIndex: 0,
            }}
          >
            <div
              style={{
                width: "30%",
                background:
                  "linear-gradient(270deg, #C0DD78 0%, rgba(192, 221, 120, 0) 100%)",
                height: "100%",
              }}
            ></div>
            <div
              style={{
                width: "30%",
                background:
                  "linear-gradient(270deg, rgba(254, 104, 115, 0) 0%, #FE6873 100%)",
                height: "100%",
              }}
            ></div>
          </div>
          <motion.div
            animate={{
              opacity: display === true ? 1 : 0,
              y: display === true ? 0 : 20,
            }}
            style={{
              width: "fit-content",
              height: "fit-content",
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
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 18,
                  background: "white",
                  borderRadius: 14,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "TTcommonsDemiBold",
                  boxShadow:
                    "0px 1.56449px 1.56449px rgba(0, 42, 88, 0.08), 0px 3.12899px 3.12899px rgba(0, 42, 88, 0.08), 0px 6.25798px 6.25798px rgba(0, 42, 88, 0.08), 0px 12.516px 12.516px rgba(0, 42, 88, 0.08)",
                  gap: 10,
                }}
                animate={{
                  x: accept === true ? -30 : decline === true ? 30 : 0,
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
                <div
                  style={{
                    width: "116%",
                    height: "100%",
                    position: "absolute",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <motion.img
                    style={{ width: 50, height: 50 }}
                    animate={{ scale: accept === true ? 1.2 : 1 }}
                    src="magicwall/accept.png"
                  />
                  <motion.img
                    style={{ width: 50, height: 50 }}
                    animate={{ scale: decline === true ? 1.2 : 1 }}
                    src="magicwall/decline.png"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
