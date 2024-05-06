export default function BottomText() {
  const linkStyle = {
    color: "black",
    textDecoration: "underline",
    cursor: "pointer",
  };
  return (
    <div
      style={{
        width: "100vw",
        position: "fixed",
        left: 0,
        bottom: 30,
        height: "fit-content",
        color: "black",
        fontFamily: '"Manrope", sans-serif',
        fontSize: 14,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // letterSpacing: "0.1em",
        fontWeight: 500,
        opacity: 0.3,
      }}
    >
      <div>
        For any inquiry - contact Seungmee via <a style={linkStyle}>Twitter</a>{" "}
        / <a style={linkStyle}>Instagram</a>
        <br />
        Or check out my works from <a style={linkStyle}>my website</a> /{" "}
        <a style={linkStyle}>read.cv</a>
      </div>
    </div>
  );
}
