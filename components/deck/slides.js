import { motion } from "framer-motion";

export default function Slides({ current }) {
  const slideContent = [
    { text: "teest", background: "green" },
    { text: "teest", background: "green" },
    { text: "teest", background: "green" },
    { text: "teest", background: "green" },
    { text: "teest", background: "green" },
    { text: "teest", background: "green" },
    { text: "teest", background: "green" },
    { text: "teest", background: "green" },
    { text: "teest", background: "green" },
  ];
  const Slide = ({ text, index, background }) => {
    return (
      <motion.div
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          opacity: index === current ? 1 : 0,
          color: "white",
          background: background,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          zIndex: 0,
        }}
      >
        {index}
        <br />
        {text}
      </motion.div>
    );
  };
  return (
    <motion.div
      style={{
        position: "relative",
        width: "fit-content",
        height: "fit-content",
        display: "flex",
      }}
    >
      {slideContent.map((info, index) => {
        return (
          <Slide text={info.text} background={info.background} index={index} />
        );
      })}
    </motion.div>
  );
}
