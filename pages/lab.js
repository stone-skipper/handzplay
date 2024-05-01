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
          width: "100%",
          height: "fit-content",

          background: playgroundBgColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Logo
          color={handColor}
          displayTag={false}
          fontSize={20}
          text="HANDZPLAY"
        />
        <Logo color={handColor} displayTag={false} fontSize={40} text="LAB" />
        {/* <div style={{ color: handColor, fontWeight: 800 }}>FROM</div> */}
      </div>

      <div style={{ display: "flex", flexDirection: "row", color: "black" }}>
        <LinkItem title={"walk"} link={"/lab/walk"} />
        <LinkItem title={"present"} link={"/lab/present"} />
      </div>
    </div>
  );
}
