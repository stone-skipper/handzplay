import TextMotion from "../UI/textmotion";

export default function Logo({ color, displayTag, fontSize }) {
  return (
    <div
      style={{
        position: "relative",
        width: "fit-content",
        height: "fit-content",
        color: color,
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <TextMotion
        font='"Gainsborough", sans-serif'
        content="HANDZPLAY"
        fontSize={fontSize}
        delay={0}
        color={color}
        letterSpacing="1.2rem"
      />
      <p
        style={{
          width: "100%",
          fontFamily: '"Manrope", sans-serif',
          fontSize: 12,
          letterSpacing: "0.2rem",
          textTransform: "uppercase",
          display: displayTag === true ? "block" : "none",
          margin: 0,
          padding: 0,
        }}
      >
        Playground for your hands, <br />
        instead of your mouse
      </p>
    </div>
  );
}
