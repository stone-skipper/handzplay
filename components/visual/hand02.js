import { motion } from "framer-motion";

export default function HandIllust02({ initTop, initLeft, top, left }) {
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
        width="426"
        height="438"
        viewBox="0 0 426 438"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
      >
        <motion.path
          d="M267.907 221.127C331.72 240.987 375.896 282.046 390.007 300.093L349.958 165.566C330.687 154.416 278.772 134.818 225.288 145.625C158.433 159.134 137.903 148.08 100.388 147.96C62.8731 147.84 33.6376 139.845 30 141.174C26.3624 142.502 15.9884 148.96 28.0768 163.461C40.1652 177.963 72.4627 177.079 88.6787 185.949C104.895 194.82 114.678 196.703 89.251 211.085C63.8243 225.466 68.4267 231.425 69.8811 234.41C71.3355 237.396 75.7875 240.62 88.2436 233.887C100.7 227.154 100.838 228.195 123.891 227.898C146.944 227.601 149.905 222.761 166.627 211.438L166.983 211.197C183.42 200.062 188.709 196.48 267.907 221.127Z"
          fill="url(#paint0_linear_959_334)"
          variants={draw}
        />
        <motion.path
          d="M61.6683 215.58C64.0077 207.643 76.6425 202.793 82.6674 201.361L75.7473 181.09C56.2304 184.097 46.5456 195.76 44.8001 206.584C43.0547 217.408 43.4158 231.343 51.3799 233.89C59.344 236.438 58.744 225.501 61.6683 215.58Z"
          fill="url(#paint1_linear_959_334)"
          variants={draw}
        />
        <motion.path
          d="M66.6395 254.754C58.9136 252.725 57.5191 242.402 57.7876 237.493L76.6769 237.748C76.5502 244.262 74.3654 256.782 66.6395 254.754Z"
          fill="url(#paint2_linear_959_334)"
          variants={draw}
        />
        <motion.path
          d="M96.7821 243.986C91.9832 257.672 84.7311 252.714 81.705 248.524L105.138 228.685C103.721 230.78 101.581 230.3 96.7821 243.986Z"
          fill="url(#paint3_linear_959_334)"
          variants={draw}
        />
        <defs>
          <linearGradient
            id="paint0_linear_959_334"
            x1="-5.80001"
            y1="146.677"
            x2="347.377"
            y2="213.983"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="0.99866" stop-color="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_959_334"
            x1="40.8677"
            y1="221.41"
            x2="83.5008"
            y2="192.541"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_959_334"
            x1="65.8484"
            y1="266.091"
            x2="68.7433"
            y2="236.418"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_959_334"
            x1="93.3496"
            y1="258.853"
            x2="86.8361"
            y2="244.379"
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
