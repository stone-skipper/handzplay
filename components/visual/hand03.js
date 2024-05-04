import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function HandIllust03({
  initTop,
  initLeft,
  top,
  left,
  color = "white",
  pinch = false,
  scale = 1,
}) {
  const [pinchState, setPinchState] = useState("releaseInitial");
  const draw = {
    hidden: {
      opacity: 0,
      scale: 0.7,
      y: 15,
    },
    visible: (i) => {
      const delay = 1 + i * 0.5;
      return {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          y: { delay, duration: 5, repeat: Infinity, repeatType: "reverse" },
          opacity: { delay, duration: 1.5, type: "spring" },
          scale: { delay, duration: 1.5, type: "spring" },
        },
      };
    },
  };
  const pinchVariant = {
    releaseInitial: {
      d: "M232.222 217.074C197.757 229.439 169.144 276.788 159.146 298.916L71.7598 279.78L228.657 140.688C253.876 119.971 258 121 273 119C288 117 318.5 108.5 324 119C329.5 129.5 307.764 132.5 284 140.688C264.592 147.375 266.5 165.5 270.5 175.5C274.5 185.5 280.5 190.568 290.5 187.5C300.5 184.432 306.966 183.672 312 184C317.034 184.328 319.5 193 300 202.5C280.5 212 275.303 201.618 232.222 217.074Z",
    },
    tap: {
      d: "M232.222 217.073C197.757 229.438 169.144 276.787 159.146 298.915L71.7593 279.779L228.657 140.687C253.876 119.97 262.508 118.823 285.769 124.042C309.031 129.261 312.477 155.695 307.914 159.241C298.602 166.478 298.935 150.401 286.193 143.75C267.995 134.251 266.897 162.261 270.802 178.431C273.314 188.83 284.233 194.343 289.736 182.603C291.936 177.909 292.96 167.9 297.994 168.228C309.071 168.952 305.915 177.268 302.746 188.982C291.986 228.758 275.303 201.617 232.222 217.073Z",
    },
    release: {
      d: "M232.222 217.074C197.757 229.439 169.144 276.788 159.146 298.916L71.7598 279.78L228.657 140.688C253.876 119.971 258 121 273 119C288 117 318.5 108.5 324 119C329.5 129.5 307.764 132.5 284 140.688C264.592 147.375 266.5 165.5 270.5 175.5C274.5 185.5 280.5 190.568 290.5 187.5C300.5 184.432 306.966 183.672 312 184C317.034 184.328 319.5 193 300 202.5C280.5 212 275.303 201.618 232.222 217.074Z",
    },
    transition: { duration: 0.2 },
  };
  useEffect(() => {
    if (pinch === true) {
      // setPinchState("releaseInitial");
      // setTimeout;
      if (pinchState === "releaseInitial") {
        setTimeout(() => {
          setPinchState("tap");
        }, 2000);
      } else if (pinch === "tap") {
        setTimeout(() => {
          setPinchState("release");
        }, 300);
      }
    }
  }, [pinchState, pinch]);
  return (
    <motion.div
      style={{
        width: "fit-contnet",
        height: "fit-content",
        position: "absolute",
        scale: scale,
      }}
      initial={{
        top: initTop,
        left: initLeft,
      }}
      animate={{
        top: top,
        left: left,
      }}
      transition={{
        duration: 2,
        delay: 1,
      }}
    >
      <motion.svg
        width="402"
        height="374"
        viewBox="0 0 402 374"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
      >
        <motion.path
          fill-rule="evenodd"
          clipRule="evenodd"
          d="M242.074 129.777C246.359 113.813 258.783 77.2112 274.19 58.5144C293.449 35.1434 268.546 27.2371 253.034 46.2587C248.506 51.8102 243.983 57.9137 239.738 64.3992C241.574 54.6288 241.185 38.6512 225.255 50.5249C214.604 58.4637 205.156 75.233 198.883 92.5443C198.791 89.0159 197.157 83.533 190.948 83.1935C182.304 82.7208 172.389 127.08 173.339 145.163C174.103 159.689 162.619 167.341 152.367 174.172C149.856 175.846 147.418 177.47 145.253 179.134C144.052 180.056 142.48 181.143 140.602 182.44C125.268 193.034 89.5573 217.705 69.3735 282.329L73.11 280.07L159.146 298.911C169.144 276.782 197.757 229.433 232.222 217.068C249.293 210.944 262.219 211.508 272.274 211.946C287.594 212.615 296.249 212.992 302.746 188.978C302.97 188.148 303.195 187.335 303.414 186.541C306.291 176.123 308.286 168.896 297.994 168.224C294.372 167.987 292.826 173.101 291.425 177.737C290.878 179.546 290.353 181.282 289.736 182.599C284.233 194.339 273.314 188.826 270.802 178.427C266.897 162.256 267.995 134.247 286.193 143.745C291.747 146.644 294.817 151.335 297.284 155.104C300.477 159.983 302.661 163.319 307.914 159.237C312.477 155.691 309.031 129.257 285.769 124.038C266.825 119.787 257.584 119.759 241.184 131.086L242.074 129.777Z"
          fill="url(#paint0_linear_959_373)"
          variants={draw}
        />
        <g opacity="0.9">
          <motion.g variants={draw}>
            <motion.path
              //pinch
              variants={pinchVariant}
              initial={"tap"}
              animate={pinch === false ? "tap" : pinchState}
              fill="url(#paint1_linear_959_373)"
              onAnimationComplete={() => {
                setPinchState("releaseInitial");
              }}
            />
          </motion.g>
          <motion.path
            d="M274.19 58.5176C258.783 77.2144 246.359 113.817 242.073 129.781L191.649 203.947L217.664 115.93C222.059 90.785 237.521 65.2835 253.033 46.2619C268.546 27.2403 293.448 35.1466 274.19 58.5176Z"
            fill="url(#paint2_linear_959_373)"
            variants={draw}
          />
          <motion.path
            d="M225.255 50.5288C241.362 38.5229 241.58 54.9918 239.676 64.7271L206.259 202.134L191.075 134.228C189.283 112.101 205.121 65.5363 225.255 50.5288Z"
            fill="url(#paint3_linear_959_373)"
            variants={draw}
          />
          <motion.path
            d="M190.948 83.1989C197.863 83.577 199.104 90.3357 198.86 93.6677L200.453 203.093L69.3735 282.334C92.0294 209.795 134.248 187.595 145.253 179.139C156.257 170.683 174.29 163.252 173.339 145.169C172.389 127.086 182.304 82.7262 190.948 83.1989Z"
            fill="url(#paint4_linear_959_373)"
            variants={draw}
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_959_373"
            x1="90.0276"
            y1="191.364"
            x2="124.292"
            y2="236.406"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color={color} stopOpacity="0.34" />
            <stop offset="1" stop-color={color} stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_959_373"
            x1="280.13"
            y1="183.277"
            x2="190"
            y2="159.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color={color} />
            <stop offset="0.713542" stop-color={color} stopOpacity="0.255208" />
            <stop offset="1" stop-color={color} stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_959_373"
            x1="247.939"
            y1="56.7864"
            x2="279.283"
            y2="113.044"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color={color} />
            <stop offset="0.515625" stop-color={color} stopOpacity="0.338542" />
            <stop offset="1" stop-color={color} stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_959_373"
            x1="195.279"
            y1="77.3984"
            x2="224.254"
            y2="104.825"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color={color} />
            <stop offset="0.65625" stop-color={color} stopOpacity="0.34375" />
            <stop offset="1" stop-color={color} stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_959_373"
            x1="170.265"
            y1="110.151"
            x2="186.108"
            y2="123.044"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color={color} />
            <stop offset="0.421875" stop-color={color} stopOpacity="0.352001" />
            <stop offset="0.651043" stop-color={color} stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>
    </motion.div>
  );
}
