import { motion } from "framer-motion";

export default function HandIllust01({
  initTop,
  initLeft,
  top,
  left,
  color = "white",
}) {
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
          y: { delay, duration: 6, repeat: Infinity, repeatType: "reverse" },
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
        width="487"
        height="461"
        viewBox="0 0 487 461"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
      >
        <motion.path
          d="M424.666 155.264C416.08 148.461 404.367 145.346 390.247 149.16L374.36 184.253C390.268 177.457 404.787 167.386 415.948 179.8L428.905 195.823C433.255 200.709 438.929 209.11 445.846 203.493C458.89 192.902 437.804 165.674 424.666 155.264Z"
          fill="url(#paint0_linear_959_328)"
          variants={draw}
        />
        <motion.path
          d="M405.455 171.494C398.284 163.213 387.355 157.974 372.771 159.096L350.636 190.623C367.53 186.903 383.669 179.708 392.327 193.981L402.078 212.134C405.443 217.743 409.456 227.053 417.298 222.82C432.084 214.839 416.428 184.166 405.455 171.494Z"
          fill="url(#paint1_linear_959_328)"
          variants={draw}
        />
        <g filter="url(#filter0_f_959_328)">
          <motion.ellipse
            cx="394.499"
            cy="196.391"
            rx="11.9033"
            ry="20.1421"
            transform="rotate(-43.7058 394.499 196.391)"
            fill="##0066ff"
            variants={draw}
          />
        </g>
        <motion.path
          d="M206.945 255.422C185.032 300.505 186.082 312.458 187.942 359.855L44.7751 340.564C69.9636 183.384 152.825 156.463 257.864 119.957C362.903 83.4499 425.865 127.391 456.523 143.294C487.18 159.197 462.96 169.828 447.106 164.165C431.252 158.503 407.213 143.155 385.726 149.016C364.239 154.878 376.921 162.607 385.712 173.009C394.503 183.412 439.95 233.548 365.267 190.289C290.583 147.03 234.335 199.068 206.945 255.422Z"
          fill="url(#paint2_linear_959_328)"
          variants={draw}
        />
        <motion.path
          d="M390.754 205.084C385.242 223.206 369.616 219.725 372.129 200.321L390.754 205.084Z"
          fill="url(#paint3_linear_959_328)"
          variants={draw}
        />
        <defs>
          <filter
            id="filter0_f_959_328"
            x="371.134"
            y="172.664"
            width="46.73"
            height="47.4531"
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
              stdDeviation="3.5"
              result="effect1_foregroundBlur_959_328"
            />
          </filter>
          <linearGradient
            id="paint0_linear_959_328"
            x1="433.511"
            y1="206.986"
            x2="392.258"
            y2="167.905"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_959_328"
            x1="426.423"
            y1="225.618"
            x2="398.192"
            y2="188.869"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_959_328"
            x1="448.192"
            y1="118.602"
            x2="130.477"
            y2="193.869"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="0.95132" stop-color="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_959_328"
            x1="374.492"
            y1="213.867"
            x2="377.418"
            y2="205.28"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>
    </motion.div>
  );
}
