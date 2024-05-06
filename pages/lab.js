import Logo from "../components/UI/logo";
import About from "../components/controlUI/about";
import Controls from "../components/controlUI/controls";
import Rules from "../components/controlUI/rules";
import Grid from "../components/grid";
import { useControlsStore, useRulesStore } from "../lib/store";
import styles from "../handsplay.module.scss";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";
import Template from "../components/controlUI/template";
import { LinkItem } from "../components/UI/linkItem";
import { hexToRGBA } from "../components/utils";
import TextMotion from "../components/UI/textmotion";
import { Presentation, Footprints, Shapes } from "@phosphor-icons/react";
import { IconBtn } from "../components/UI/iconBtn";
import BottomText from "../components/UI/bottomText";

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
          width: "100vw",
          position: "absolute",
          top: 18,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          gap: 40,
        }}
      >
        <Logo color={handColor} displayTag={false} fontSize={40} />
        <div
          style={{
            fontWeight: 500,
            color: "black",
            opacity: 0.8,
            textAlign: "center",
            fontSize: "0.9em",
            fontWeight: 500,
          }}
        >
          Some prototypes <br />
          with gesture interactions <br />
          for specific use-cases.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
          color: "black",
          width: "100vw",
          height: "85vh",
          position: "absolute",
          right: 0,
          bottom: 0,
          // background: hexToRGBA(handColor, 0.1),
          overflow: "scroll",
        }}
      >
        <LinkItem
          title={"present"}
          link={"/lab/present"}
          desc={`Control your slides\nwith gestures.\nOnly for Interactive Slides`}
          icon={<Presentation color={"#111111"} size={24} weight="regular" />}
          fill={<Presentation color={handColor} size={24} weight="fill" />}
          color={handColor}
        />
        <LinkItem
          title={"walk"}
          link={"/lab/walk"}
          desc={`Game control with gestures!\nComing soon.`}
          icon={<Footprints color={"#111111"} size={24} weight="regular" />}
          fill={<Footprints color={handColor} size={24} weight="fill" />}
          color={handColor}
          active={false}
        />
        {/* <LinkItem
          title={"what else?"}
          link={"/lab"}
          desc={`Control your slides\nwith gestures.\nOnly for Interactive Slides`}
          icon={<Footprints color={"#111111"} size={24} weight="regular" />}
          fill={<Footprints color={handColor} size={24} weight="fill" />}
          color={handColor}
          active={false}
        /> */}
      </div>
      <IconBtn
        link={"/playground"}
        title={"playground"}
        color={handColor}
        icon={<Shapes weight="regular" size={20} color={"#111111"} />}
        fill={<Shapes weight="fill" size={20} color={handColor} />}
      />
      <BottomText />
    </div>
  );
}
