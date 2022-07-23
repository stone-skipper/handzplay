import Link from "next/link";

export default function Footer() {
  return (
    <div
      style={{
        width: "calc(100vw - 40px)",
        position: "absolute",
        left: 20,
        bottom: 20,
        height: "fit-content",
        color: "white",
        zIndex: 30,
        fontFamily: '"Manrope", sans-serif',
        fontSize: 9,
        letterSpacing: "0.2rem",
        textTransform: "uppercase",
        display: "flex",
        justifyContent: "space-between",
        lineHeight: 2,
      }}
    >
      <div style={{ textAlign: "left" }}>
        created by{" "}
        <a
          href="https://www.seungmee-lee.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          stone.skipper
        </a>
        <br /> get in touch via{" "}
        <a href="https://www.instagram.com/stone.skipper/" target="_blank">
          instagram
        </a>{" "}
        or <a href="mailto:iam.seungmee.lee@gmail.com">email</a>
      </div>
      <div style={{ textAlign: "right" }}>
        no data will be saved here
        <br />
        cuz I don't know how
      </div>
    </div>
  );
}
