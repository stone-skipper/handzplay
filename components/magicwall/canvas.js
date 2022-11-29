import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useControlsStore } from "../../lib/store";

export default function Canvas({ display = true, notification = true }) {
  const currentActionL = useControlsStore((state) => state.currentActionL);
  const currentActionR = useControlsStore((state) => state.currentActionR);
  useEffect(() => {
    if (currentActionL === "left" || currentActionR === "left") {
      setAccept(true);
    } else if (currentActionL === "right" || currentActionR === "right") {
      setDecline(true);
    } else {
    }
  }, [currentActionL, currentActionR]);

  const [accept, setAccept] = useState(false);
  const [decline, setDecline] = useState(false);

  useEffect(() => {
    if (accept === true) {
      setTimeout(() => {
        setAccept(false);
      }, 1000);
    } else if (decline === true) {
      setTimeout(() => {
        setDecline(false);
      }, 1000);
    }
  }, [accept, decline]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#EBF1F6",
        display: display === true ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        gap: 40,
      }}
    >
      static canvas comes here
      <div
        style={{
          width: "100vw",
          height: "fit-content",
          position: "absolute",
          bottom: 130,
          display: "flex",
          justifyContent: "center",
          display: notification === true ? "flex" : "none",
        }}
      >
        <motion.div
          animate={{
            opacity: notification === true ? 1 : 0,
            y: notification === true ? 0 : 20,
          }}
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: 10,
            background: decline === true ? "red" : "white",
            borderRadius: 4,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 60,
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
            }}
          >
            {/* <HoverClick
              width={800}
              height={50}
              content="John Liu is inviting you for collaboration"
              initialColor={"transparent"}
              hoverColor={"grey"}
              display={true}
            /> */}
            <div
              style={{
                width: 800,
                height: 60,
                display: "flex",
                alignItems: "center",
              }}
            >
              John Liu is inviting you for collaboration
            </div>
            <div
              style={{
                position: "absolute",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                right: 0,
                gap: 5,
              }}
            >
              <motion.div
                style={{
                  background: "green",
                  padding: 20,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  scale: accept === true ? 1.1 : 1,
                }}
              >
                accept
              </motion.div>
              <motion.div
                style={{
                  background: "red",
                  padding: 20,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  scale: decline === true ? 1.1 : 1,
                }}
              >
                decline
              </motion.div>
            </div>
          </div>
          {/* <div style={{ position: "absolute", bottom: -40, opacity: 0.5 }}>
            gesture guidance here
          </div> */}
        </motion.div>
      </div>
    </div>
  );
}
