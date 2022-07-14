import Link from "next/link";

export default function Footer() {
  return (
    <div
      style={{
        width: "100vw",
        position: "absolute",
        bottom: 20,
        right: 20,
        height: "fit-content",
        color: "white",
        zIndex: 30,
        fontFamily: '"Manrope", sans-serif',
        fontSize: 10,
        letterSpacing: "0.2rem",
        textAlign: "right",
        textTransform: "uppercase",
      }}
    >
      created by{" "}
      <Link href="https://www.seungmee-lee.com" target="_blank">
        stone.skipper
      </Link>
      <br /> contact me via{" "}
      <Link href="https://www.seungmee-lee.com" target="_blank">
        instagram
      </Link>{" "}
      for any inquiry
      <br />
      <br />
      no data will be saved here - cuz I don't know how
    </div>
  );
}
