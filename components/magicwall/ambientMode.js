export default function AmbientMode({ display = true }) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: display === true ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          width: "80vw",
          height: "80vh",
          background: "#EBF1F6",
          overflow: "hidden",
          borderRadius: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
        }}
      >
        some sort of ambient video here
      </div>
    </div>
  );
}
