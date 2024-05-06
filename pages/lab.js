import Logo from "../components/UI/logo";
import About from "../components/controlUI/about";
import Controls from "../components/controlUI/controls";
import Rules from "../components/controlUI/rules";
import Grid from "../components/grid";
import { useControlsStore, useRulesStore } from "../lib/store";
import styles from "../handsplay.module.scss";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Template from "../components/controlUI/template";
import { LinkItem } from "../components/UI/linkItem";
import { hexToRGBA } from "../components/utils";
import TextMotion from "../components/UI/textmotion";
import { Presentation, Footprints, Shapes } from "@phosphor-icons/react";

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

  return (
    <div
      className={styles.playground}
      style={{
        background: hexToRGBA(handColor, 0.1),
      }}
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
        {/* <Logo color={handColor} displayTag={false} fontSize={40} text="LAB" /> */}
        <TextMotion
          font='"Gainsborough", sans-serif'
          content={"LAB"}
          fontSize={300}
          delay={0}
          color={"white"}
          letterSpacing="1.2rem"
        />
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
          // background: hexToRGBA(handColor, 0.1),
          overflow: "scroll",
        }}
      >
        <LinkItem
          title={"present"}
          link={"/lab/present"}
          desc="text"
          icon={<Presentation color={"#111111"} size={24} weight="regular" />}
          fill={<Presentation color={handColor} size={24} weight="fill" />}
          color={handColor}
        />
        <LinkItem
          title={"walk"}
          link={"/lab/walk"}
          desc="text"
          icon={<Footprints color={"#111111"} size={24} weight="regular" />}
          fill={<Footprints color={handColor} size={24} weight="fill" />}
          color={handColor}
        />
        <LinkItem
          title={"Back to\nPlayground"}
          link={"/playground"}
          desc="text"
          icon={<Shapes color={"#111111"} size={24} weight="regular" />}
          fill={<Shapes color={handColor} size={24} weight="fill" />}
          color={handColor}
        />
      </div>
    </div>
  );
}
