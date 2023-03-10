import { motion } from "framer-motion";
import HoverClick from "../then/hoverClick";

export default function DockUI({ open = false }) {
  return (
    <motion.div
      style={{
        width: "fit-content",
        height: "fit-content",
        borderRadius: 40,
        background: "black",
        display: "flex",
        flexDirection: "row",
        padding: 20,
        gap: 10,
        position: "absolute",
        bottom: 200,
        left: 600,
      }}
    >
      <HoverClick
        width={open === true ? 50 : 20}
        height={open === true ? 50 : 20}
        initialColor="#EBF1F6"
        hoverColor="#7B61FF"
        content=""
        display={true}
        id="photo"
        gesture="okay"
      />
      <HoverClick
        width={open === true ? 50 : 20}
        height={open === true ? 50 : 20}
        initialColor="#EBF1F6"
        hoverColor="#7B61FF"
        content=""
        display={true}
        id="photo"
        gesture="okay"
      />
      <HoverClick
        width={open === true ? 50 : 20}
        height={open === true ? 50 : 20}
        initialColor="#EBF1F6"
        hoverColor="#7B61FF"
        content=""
        display={true}
        id="photo"
        gesture="okay"
      />
      <HoverClick
        width={open === true ? 50 : 20}
        height={open === true ? 50 : 20}
        initialColor="#EBF1F6"
        hoverColor="#7B61FF"
        content=""
        display={true}
        id="photo"
        gesture="okay"
      />
      <HoverClick
        width={open === true ? 50 : 20}
        height={open === true ? 50 : 20}
        initialColor="#EBF1F6"
        hoverColor="#7B61FF"
        content=""
        display={true}
        id="photo"
        gesture="okay"
      />
    </motion.div>
  );
}
