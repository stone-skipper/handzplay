import { useEffect, useLayoutEffect, useState } from "react";
import styles from "../handsplay.module.scss";
import { key } from "../components/utils";

const Grid = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [col, setCol] = useState(0);
  const [row, setRow] = useState(0);

  const gap = 36;

  var rowArray = [];
  var colArray = [];

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
    setCol(Math.floor(windowWidth / gap));
    setRow(Math.floor(windowHeight / gap));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
      }}
    >
      <svg width={windowWidth - gap * 2} height={windowHeight - gap * 2}>
        <pattern
          id="pattern-circles"
          x="0"
          y="0"
          width={gap}
          height={gap}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle id="pattern-circle" cx="14" cy="14" r="1" fill={key}></circle>
        </pattern>

        <rect
          id="rect"
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#pattern-circles)"
        ></rect>
      </svg>
    </div>
  );
};

export default Grid;
