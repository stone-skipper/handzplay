import Head from "next/head";
import Handpose from "../components/handpose";
import Logo from "../components/UI/logo";
import About from "../components/controlUI/about";
import Controls from "../components/controlUI/controls";
import Rules from "../components/controlUI/rules";
import Grid from "../components/grid";
import { useControlsStore, useRulesStore } from "../lib/store";
import styles from "../handsplay.module.scss";
import { useEffect } from "react";
import Template from "../components/controlUI/template";
import { Flask } from "@phosphor-icons/react";
import { hexToRGBA } from "../components/utils";
import { IconBtn } from "../components/UI/iconBtn";

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
      style={{ background: playgroundBgColor }}
    >
      <Grid color={handColor} />
      <Handpose
        handIndicatorType={handIndicatorType}
        cameraFeed={cameraFeed}
        rules={rules}
        handColor={handColor}
      />
      <div
        style={{
          display: "flex",
          width: "100vw",
          position: "absolute",
          bottom: 4,
          gap: 4,
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <About />
        <Rules />
        <Controls />
      </div>

      <div
        style={{
          width: "100vw",
          position: "absolute",
          top: 18,
          display: "flex",
          justifyContent: "center",
          zIndex: 51,
        }}
      >
        <div
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "0 5px",
            background: playgroundBgColor,
          }}
        >
          <Logo color={handColor} displayTag={false} fontSize={40} />
          <IconBtn
            link={"/lab"}
            color={handColor}
            bg={playgroundBgColor}
            title={"lab"}
            icon={<Flask weight="regular" size={20} color={"#111111"} />}
            fill={<Flask weight="fill" size={20} color={handColor} />}
          />
          {/* <div
            style={{
              background: playgroundBgColor,
              position: "fixed",
              top: 4,
              right: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <div
              style={{
                background: hexToRGBA(handColor, 0.1),
                padding: 10,
                borderRadius: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Link href={"/lab"}>
                <Flask weight="regular" size={20} color={"#111111"} />
              </Link>
            </div>
          </div> */}
        </div>
      </div>
      <Template />
    </div>
  );
}
