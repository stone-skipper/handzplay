import Logo from "../components/UI/logo";
import About from "../components/controlUI/about";
import Controls from "../components/controlUI/controls";
import Rules from "../components/controlUI/rules";
import Grid from "../components/grid";
import { useControlsStore, useRulesStore } from "../lib/store";
import styles from "../handsplay.module.scss";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Template from "../components/controlUI/template";
import { hexToRGBA } from "../components/utils";

export default function Playground() {
  const handIndicatorType = useControlsStore(
    (state) => state.handIndicatorType
  );
  const rules = useRulesStore((state) => state.rules);
  const handColor = useControlsStore((state) => state.handColor);
  const playgroundBgColor = useControlsStore(
    (state) => state.playgroundBgColor
  );

  const cameraFeed = useControlsStore((state) => state.cameraFeed);

  useEffect(() => {
    useControlsStore.setState({ toggleTemplate: true });
    useControlsStore.setState({ currentTab: "none" });
  }, []);

  useEffect(() => {
    console.log(rules);
  }, [rules]);

  const LinkItem = ({ title, link }) => {
    return (
      <Link href={link}>
        <motion.div
          style={{
            background: handColor,
            color: "white",
            width: 100,
            height: 100,
            borderRadius: 10,
            cursor: "pointer",
            padding: 20,
          }}
          whileHover={{ scale: 1.02 }}
        >
          {title}
        </motion.div>
      </Link>
    );
  };
  return (
    <div
      className={styles.playground}
      style={{ background: playgroundBgColor }}
    >
      <div
        style={{
          width: "30vw",
          height: "100%",
          // background: playgroundBgColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 10,
          position: "fixed",
          left: 0,
          top: 0,
        }}
      >
        <Logo
          color={hexToRGBA(handColor, 0.5)}
          displayTag={false}
          fontSize={40}
          text="HANDZPLAY"
        />
        <Logo color={handColor} displayTag={false} fontSize={40} text="LAB" />
        <div style={{ textAlign: "center", width: "70%", fontWeight: 500 }}>
          <br />
          If playground is a space to create some interactions infinitely, this
          space is more 'use-case' driven.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          color: "black",
          width: "70vw",
          height: "100%",
          position: "absolute",
          right: 0,
          top: 0,
          background: hexToRGBA(handColor, 0.1),
          overflow: "scroll",
        }}
      >
        <LinkItem title={"walk"} link={"/lab/walk"} />
        <LinkItem title={"present"} link={"/lab/present"} />
      </div>
    </div>
  );
}
