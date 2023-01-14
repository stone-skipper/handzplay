import Link from "next/link";
import StyledLink from "./styledLink";
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
        fontSize: 10,
        letterSpacing: "0.2rem",
        textTransform: "uppercase",
        display: "flex",
        justifyContent: "space-between",
        lineHeight: 2.2,
      }}
    >
      <div style={{ textAlign: "left" }}>
        created by{" "}
        <StyledLink link="https://www.seungmee-lee.com" title="stone.skipper" />
        <br /> get in touch via{" "}
        <StyledLink
          link="https://www.instagram.com/stone.skipper/"
          title="instagram"
        />{" "}
        or <StyledLink link="mailto:iam.seungmee.lee@gmail.com" title="email" />
      </div>
      <div style={{ textAlign: "right" }}>
        no data will be saved here
        <br />
        cuz I don't know how
      </div>
    </div>
  );
}
