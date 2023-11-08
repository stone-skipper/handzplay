import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import TextMotion from "../UI/textmotion";
import Model from "./model";
import {
  OrbitControls,
  SoftShadows,
  Environment,
  Cloud,
} from "@react-three/drei";
import { PerspectiveCamera } from "three";
import Tree from "./tree";
import Nature from "./nature";

import { Grass } from "./grass";
import { PlaneGeometry } from "./plane";

// import { EffectComposer, DepthOfField } from "@react-three/postprocessing";

// function Rig() {
//   return useFrame((state, delta) => {
//     easing.damp3(
//       state.camera.position,
//       [1 + state.mouse.x / 4, 1.5 + state.mouse.y / 4, 2.5],
//       0.2,
//       delta
//     );
//   });
// }

const fov = 60;
const aspect = 1920 / 1080;
const near = 1.0;
const far = 3000.0;
const camera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.set(1, 3, 2.5);

export default function Scene(props) {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          zIndex: 100,
          userSelect: "none",
        }}
      >
        <TextMotion
          font='"Gainsborough", sans-serif'
          content={"WALK"}
          fontSize={300}
          delay={0}
          color={"white"}
          letterSpacing="1.2rem"
        />
      </div>
      <Canvas
        shadows
        camera={camera}
        // camera={{ position: [1, 1.5, 2.5], fov: 60 }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <color attach="background" args={[0xa0cbd4]} />
        <fog attach="fog" args={[0xa0cbd4, 10, 60]} />
        <SoftShadows size={10} focus={1} samples={25} enabled={true} />
        <ambientLight />
        <Environment preset="sunset" />

        {/* <directionalLight
          position={[5, 5, 5]}
          castShadow
          shadow-mapSize={1024}
        /> */}
        <directionalLight
          castShadow
          position={[-5, 8, 15]}
          intensity={1.5}
          shadow-mapSize={2048}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-10, 10, -10, 10, 0.1, 50]}
          />
        </directionalLight>
        {/* <group position={[0, -1, 0]}> */}
        <Suspense fallback={null}>
          <perspectiveCamera {...camera} />
          {/* <Clouds /> */}

          <Model
            click={props.click}
            fly={props.fly}
            angle={props.angle}
            camera={camera}
          />
          {/* <Grass>
            <PlaneGeometry />
          </Grass> */}
        </Suspense>
        {/* </group> */}
        <mesh
          position={[0, 0, 0]}
          rotation={[-(Math.PI * 1) / 2, 0, 0]}
          receiveShadow
          castShadow
        >
          {/* <Tree /> */}
          {/* <Nature /> */}
          {/* <planeGeometry args={[1000, 1000, 1, 1]} />
          <shadowMaterial transparent opacity={0.4} /> */}
        </mesh>
        {/* <Rig /> */}
        <OrbitControls />
        {/* <EffectComposer multisampling={0}>
          <DepthOfField
            target={[0, 0, 60]}
            focalLength={0.4}
            bokehScale={14}
            height={700}
          />
        </EffectComposer> */}
      </Canvas>
    </>
  );
}

function Clouds() {
  return (
    <group>
      {/* <Cloud position={[-10, -6, -10]} speed={0.2} opacity={0.4} /> */}
      <Cloud position={[10, 6, 15]} speed={0.2} opacity={0.25} />
      <Cloud position={[0, 10, 0]} speed={0.2} opacity={0.2} />
      {/* <Cloud position={[0, -10, 0]} speed={0.2} opacity={0.2} /> */}
      {/* <Cloud position={[-10, -6, 15]} speed={0.2} opacity={0.3} /> */}
      <Cloud position={[10, 6, 10]} speed={0.2} opacity={0.25} />
    </group>
  );
}
