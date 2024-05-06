import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function HandIllust05({
  initTop,
  initLeft,
  top,
  left,
  color = "white",
  pinch = false,
  scale = 1,
}) {
  const repeatTransition = {
    repeat: Infinity,
    repeatType: "reverse",
    duration: 1,
    // type: "spring",
    // bounce: 0.1,
    ease: "easeInOut",
    repeatDelay: 1,
  };

  const draw = {
    hidden: {
      opacity: 0,
      scale: 0.7,

      y: 15,
      //   rotate: 30,
    },
    visible: (i) => {
      const delay = 1 + i * 0.5;
      return {
        opacity: 1,
        scale: 1,
        // rotate: -30,

        y: 0,
        transition: {
          y: { delay, duration: 5, repeat: Infinity, repeatType: "reverse" },
          opacity: { delay, duration: 1.5, type: "spring" },
          scale: { delay, duration: 1.5, type: "spring" },
          //   rotate: { duration: 2, repeat: Infinity, repeatType: "reverse" },
        },
      };
    },
  };
  const thumbVariant = {
    right: {
      d: "M171.931 122.021C157.23 153.741 174.203 168.599 183.608 176.13C190.584 230.643 267.602 291.709 297.723 305.558L373.027 273.164C284.88 248.539 232.096 200.669 216.722 179.812C221.454 173.544 226.603 156.266 209.343 137.299C192.083 118.332 192.728 85.7289 195.208 71.7982C170.067 71.7825 181.5 101.376 171.931 122.021Z",
    },
    left: {
      d: "M137.99 154.39C138.147 189.35 159.822 195.597 171.534 198.423C200.995 244.817 296.653 267.406 329.804 267.157L384.232 205.857C293.969 220.986 225.854 200.054 203.079 187.697C204.702 180.013 202.029 162.183 178.349 152.339C153.5 131.5 128 128.5 108 128.5C101.001 143 117.5 139 137.99 154.39Z",
    },
  };
  const indexVariant = {
    right: {
      d: "M155.107 103.111C173.177 117.145 184.481 137.303 195.843 135.724C214.941 141.451 202.918 184.74 192.897 191.473C172.855 204.938 145.44 156.419 140.596 133.186C135.753 109.952 85.6689 80.0295 96.8973 69.5838C108.124 59.1394 132.52 85.5689 155.107 103.111Z",
    },
    left: {
      d: "M114.729 144.412C137.047 149.446 155.84 162.898 165.458 156.644C185.18 153.722 192.674 198.02 186.459 208.37C174.03 229.07 128.609 196.781 114.359 177.802C100.11 158.822 53.0005 178.5 48.5003 162.499C44.0001 146.499 86.8308 138.118 114.729 144.412Z",
    },
  };
  const middleVariant = {
    right: {
      d: "M131.131 114.542C151.362 125.227 165.993 143.118 176.909 139.591C211.795 123.67 211.076 186.795 202.376 195.164C184.974 211.904 130.862 168.719 122.06 146.679C113.258 124.638 58.7411 103.861 67.9864 91.6255C77.2305 79.3913 105.842 101.186 131.131 114.542Z",
    },
    left: {
      d: "M97.8743 164.941C120.728 166.026 141.57 176.012 149.956 168.184C174.783 138.958 200.932 196.416 196.608 207.688C187.96 230.231 120.632 214.107 103.305 197.888C85.978 181.669 29.3242 204.503 32.5 189.5C35.6754 174.498 69.3075 163.584 97.8743 164.941Z",
    },
  };
  const ringVariant = {
    right: {
      d: "M129.583 136.381C151.006 144.41 158.26 138.182 168.639 133.298C201.889 146 209.456 181.095 201.889 190.501C186.754 209.314 125.17 181.981 113.64 161.236C102.111 140.492 56.4222 134.979 64.0389 121.668C71.6546 108.359 102.803 126.344 129.583 136.381Z",
    },
    left: {
      d: "M105.744 185.371C128.55 183.545 132.473 174.827 139.797 165.998C175.294 163.382 197.045 191.944 194.187 203.673C188.472 227.132 121.109 228.531 101.863 214.644C82.6162 200.757 39.7559 226.286 41.0008 211.001C42.2455 195.717 77.2362 187.654 105.744 185.371Z",
    },
  };
  const pinkyVariant = {
    right: {
      d: "M74.5219 151.106C80.1711 141.234 103.276 154.575 123.141 162.02C129.935 164.566 151.947 162.168 178.489 182.805C214.037 210.443 298.646 300.947 299.5 304C295.595 317.119 282.889 350.96 256.175 332C236.513 318.045 174.71 233.993 170.5 224.5C160.571 202.107 133.066 182.2 113.5 174.5C93.9345 166.8 68.8719 160.98 74.5219 151.106Z",
    },
    left: {
      d: "M74 224.712C74.9233 213.375 89.6503 213.012 110.797 211.319C118.029 210.74 136.941 199.223 169.734 206.639C213.652 216.57 328.682 262.591 330.751 264.992C332.786 278.528 335.649 314.562 303.412 308.738C279.686 304.451 188.044 254.59 180.202 247.781C161.706 231.722 128.35 225.377 107.366 226.712C86.3826 228.047 73.0766 236.05 74 224.712Z",
    },
  };

  return (
    <motion.div
      style={{
        width: "fit-contnet",
        height: "fit-content",
        position: "absolute",
        scale: scale,
        originX: 0,
        originY: 0,
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
        variants={draw}
      >
        <motion.g variants={draw}>
          <motion.path
            //thumb
            id="thumb"
            fill="url(#paint0_linear_2439_226)"
            variants={thumbVariant}
            initial={"left"}
            animate={pinch === false ? "left" : "right"}
            transition={repeatTransition}
          />
          <motion.path
            //ring
            id="ring"
            //   d="M129.583 136.381C151.006 144.41 158.26 138.182 168.639 133.298C201.889 146 209.456 181.095 201.889 190.501C186.754 209.314 125.17 181.981 113.64 161.236C102.111 140.492 56.4222 134.979 64.0389 121.668C71.6546 108.359 102.803 126.344 129.583 136.381Z"
            fill="url(#paint1_linear_2439_226)"
            //   variants={draw}
            variants={ringVariant}
            initial={"left"}
            animate={pinch === false ? "left" : "right"}
            transition={repeatTransition}
          />
          <motion.path
            //middle
            id="middle"
            //   d="M131.131 114.542C151.362 125.227 165.993 143.118 176.909 139.591C211.795 123.67 211.076 186.795 202.376 195.164C184.974 211.904 130.862 168.719 122.06 146.679C113.258 124.638 58.7411 103.861 67.9864 91.6255C77.2305 79.3913 105.842 101.186 131.131 114.542Z"
            fill="url(#paint2_linear_2439_226)"
            //   variants={draw}
            variants={middleVariant}
            initial={"left"}
            animate={pinch === false ? "left" : "right"}
            transition={repeatTransition}
          />
          <motion.path
            //index
            id="index"
            //   d="M155.107 103.111C173.177 117.145 184.481 137.303 195.843 135.724C214.941 141.451 202.918 184.74 192.897 191.473C172.855 204.938 145.44 156.419 140.596 133.186C135.753 109.952 85.6689 80.0295 96.8973 69.5838C108.124 59.1394 132.52 85.5689 155.107 103.111Z"
            fill="url(#paint3_linear_2439_226)"
            //   variants={draw}
            variants={indexVariant}
            initial={"left"}
            animate={pinch === false ? "left" : "right"}
            transition={repeatTransition}
          />
          <motion.path
            //pinky
            id="pinky"
            fill="url(#paint4_linear_2439_226)"
            variants={pinkyVariant}
            initial={"left"}
            animate={pinch === false ? "left" : "right"}
            transition={repeatTransition}
          />
        </motion.g>
        <motion.g clip-path="url(#bodyClip)" variants={draw}>
          <rect
            x="20"
            y="20"
            width={"100%"}
            height={"100%"}
            fill="url(#paint5_linear_2439_226)"
          />
        </motion.g>

        <defs>
          <clipPath id="bodyClip">
            <motion.path
              //thumb
              id="thumb"
              variants={thumbVariant}
              initial={"left"}
              animate={pinch === false ? "left" : "right"}
              transition={repeatTransition}
            />
            <motion.path
              //ring
              id="ring"
              variants={ringVariant}
              initial={"left"}
              animate={pinch === false ? "left" : "right"}
              transition={repeatTransition}
            />
            <motion.path
              //middle
              id="middle"
              variants={middleVariant}
              initial={"left"}
              animate={pinch === false ? "left" : "right"}
              transition={repeatTransition}
            />
            <motion.path
              //index
              id="index"
              variants={indexVariant}
              initial={"left"}
              animate={pinch === false ? "left" : "right"}
              transition={repeatTransition}
            />
            <motion.path
              //pinky
              id="pinky"
              variants={pinkyVariant}
              initial={"left"}
              animate={pinch === false ? "left" : "right"}
              transition={repeatTransition}
            />
          </clipPath>
          <motion.linearGradient
            id="paint0_linear_2439_226"
            x1="186"
            y1="69"
            x2="128.553"
            y2="136.106"
            initial={{ x1: 124, y1: 127.5, x2: 110.98, y2: 197.451 }}
            animate={{ x1: 186, y1: 69, x2: 128.553, y2: 136.106 }}
            transition={repeatTransition}
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop
              offset="0.713542"
              stop-color="white"
              stop-opacity="0.255208"
            />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </motion.linearGradient>
          <motion.linearGradient
            id="paint1_linear_2439_226"
            // x1="93"
            // y1="119.5"
            // x2="104.135"
            // y2="152.96"

            initial={{ x1: 65.4546, y1: 185.619, x2: 89.7422, y2: 211.186 }}
            animate={{ x1: 93, y1: 119.5, x2: 104.135, y2: 152.96 }}
            transition={repeatTransition}
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop
              offset="0.713542"
              stop-color="white"
              stop-opacity="0.255208"
            />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </motion.linearGradient>
          <motion.linearGradient
            id="paint2_linear_2439_226"
            // x1="117.5"
            // y1="101"
            // x2="115.054"
            // y2="128.668"
            // x1="50.5"
            // y1="166.5"
            // x2="71.9549"
            // y2="190.142"
            initial={{ x1: 50.5, y1: 166.5, x2: 71.9549, y2: 190.142 }}
            animate={{ x1: 117.5, y1: 101, x2: 115.054, y2: 128.668 }}
            transition={repeatTransition}
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop
              offset="0.713542"
              stop-color="white"
              stop-opacity="0.255208"
            />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </motion.linearGradient>
          <motion.linearGradient
            id="paint3_linear_2439_226"
            // x1="127.5"
            // y1="74"
            // x2="120.19"
            // y2="103.996"
            // x1="75.5"
            // y1="141"
            // x2="89.2144"
            // y2="169.256"
            initial={{ x1: 75.5, y1: 141, x2: 89.2144, y2: 169.256 }}
            animate={{ x1: 127.5, y1: 74, x2: 120.19, y2: 103.996 }}
            transition={repeatTransition}
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop
              offset="0.713542"
              stop-color="white"
              stop-opacity="0.255208"
            />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </motion.linearGradient>
          <motion.linearGradient
            id="paint4_linear_2439_226"
            // x1="73"
            // y1="147"
            // x2="122.461"
            // y2="172.496"
            // x1="59.0229"
            // y1="219.008"
            // x2="114.629"
            // y2="221.093"
            initial={{ x1: 59.0229, y1: 219.008, x2: 114.629, y2: 221.093 }}
            animate={{ x1: 73, y1: 147, x2: 122.461, y2: 172.496 }}
            transition={repeatTransition}
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop
              offset="0.713542"
              stop-color="white"
              stop-opacity="0.255208"
            />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </motion.linearGradient>

          <motion.linearGradient
            id="paint5_linear_2439_226"
            // x1="162.5"
            // y1="72.0769"
            // x2="328.241"
            // y2="204.981"
            // x1="145.153"
            // y1="131.753"
            // x2="253.517"
            // y2="279.293"

            initial={{ x1: 145.153, y1: 131.753, x2: 253.517, y2: 279.293 }}
            animate={{ x1: 162.5, y1: 72.0769, x2: 328.241, y2: 204.981 }}
            transition={repeatTransition}
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" stop-opacity="0.4" />
            <stop
              offset="0.713542"
              stop-color="white"
              stop-opacity="0.255208"
            />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </motion.linearGradient>
        </defs>
      </motion.svg>
    </motion.div>
  );
}
