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
        fontSize: 12,
        letterSpacing: "0.2rem",
        textTransform: "uppercase",
        display: "flex",
        justifyContent: "space-between",
        lineHeight: 1.8,
      }}
    >
      <div style={{ textAlign: "left" }}>
        created by{" "}
        <Link href="https://www.seungmee-lee.com" target="_blank">
          stone.skipper
        </Link>
        <br /> contact me via{" "}
        <Link href="https://www.seungmee-lee.com" target="_blank">
          instagram
        </Link>{" "}
        or <Link href="">email</Link> for any inquiry
      </div>
      <div style={{ textAlign: "right" }}>
        no data will be saved here
        <br />
        cuz I don't know how
      </div>
    </div>
  );
}
