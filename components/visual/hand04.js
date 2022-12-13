import { motion } from "framer-motion";

export default function HandIllust04({ initTop, initLeft, top, left }) {
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
  return (
    <motion.div
      style={{
        width: "fit-contnet",
        height: "fit-content",
        position: "absolute",
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
        width="399"
        height="316"
        viewBox="0 0 399 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
      >
        <motion.path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.4501 180.477C16.5976 172.992 35.376 191.111 47.2959 204.367C47.3187 195.112 55.4728 193.799 59.3592 194.087C58.9069 193.483 58.4692 192.879 58.0475 192.278C49.8479 180.581 68.933 175.805 77.6762 179.03C70.6503 170.37 52.967 145.497 56.7162 139.164C60.4654 132.831 67.798 137.172 80.8366 151.643C93.8752 166.115 100.48 170.925 111.86 174.512C121.577 177.574 122.133 158.185 122.516 144.829C122.582 142.543 122.642 140.433 122.743 138.643C123.253 129.565 143.172 120.777 142.069 170.538C140.967 220.3 192.028 236.552 267.472 169.412C327.098 116.35 336.177 84.146 344.625 54.1832L344.626 54.1803C345.471 51.1853 346.309 48.2127 347.191 45.2438L374.749 215.93L374.764 215.932L374.752 215.948L374.758 215.986L374.712 216C345.327 254.443 295.504 277.865 230.113 289.536C164.683 301.213 82.9012 254.596 63.0257 241.029C43.1503 227.461 5.87695 192.34 12.4501 180.477Z"
          fill="url(#paint0_radial_959_339)"
          variants={draw}
        />
        <g filter="url(#filter0_f_959_339)">
          <motion.ellipse
            rx="24.2626"
            ry="40.5288"
            transform="matrix(-0.690615 0.723222 0.723222 0.690615 72.3672 200.881)"
            fill="##0066ff"
            fill-opacity="0.8"
            // variants={draw}
          />
        </g>
        <motion.path
          d="M47.4768 206.927C45.7933 194.64 56.3156 193.62 60.0753 194.166C60.0753 194.166 64.2788 206.913 73.3998 212.842C82.5209 218.771 94.3988 227.402 89.094 234.395C79.2752 247.339 48.8023 216.6 47.4768 206.927Z"
          fill="url(#paint1_linear_959_339)"
          variants={draw}
        />
        <motion.path
          d="M58.0458 192.278C49.8462 180.582 68.9314 175.805 77.6746 179.031L84.2577 191.481C85.384 193.228 95.0245 201.222 99.2054 204.298C106.107 210.634 106.508 221.44 98.2741 221.967C87.9815 222.625 68.2953 206.898 58.0458 192.278Z"
          fill="url(#paint2_linear_959_339)"
          variants={draw}
        />
        <defs>
          <filter
            id="filter0_f_959_339"
            x="21.5986"
            y="150.842"
            width="101.537"
            height="100.078"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="8.5"
              result="effect1_foregroundBlur_959_339"
            />
          </filter>
          <radialGradient
            id="paint0_radial_959_339"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(4.54034 152.954) rotate(5.97085) scale(286.672 208.839)"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </radialGradient>
          <linearGradient
            id="paint1_linear_959_339"
            x1="47.4754"
            y1="227.991"
            x2="90.5742"
            y2="221.474"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="0.427083" stop-color="white" stop-opacity="0.2" />
            <stop offset="0.640625" stop-color="white" stop-opacity="0.2" />
            <stop offset="1" stop-color="white" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_959_339"
            x1="108.504"
            y1="204.57"
            x2="70.9654"
            y2="220.073"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="0.385417" stop-color="white" stop-opacity="0.3" />
            <stop offset="0.697917" stop-color="white" stop-opacity="0.3" />
            <stop offset="1" stop-color="white" />
          </linearGradient>
        </defs>
      </motion.svg>
    </motion.div>
  );
}
