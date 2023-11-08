import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
// import Tree from "./tree";
import { useGLTF, Instances, Instance, Detailed } from "@react-three/drei";

export default function Nature({ count = 500, temp = new THREE.Object3D() }) {
  const instancedMeshRef = useRef();
  const [data, setData] = useState([]);
  const { nodes, materials } = useGLTF("/model/stylize_tree_lowpoly.glb");

  const randomVector = (r) => [
    0,
    r / 2 - Math.random() * r,

    r / 2 - Math.random() * r,
  ];
  const randomEuler = () => [Math.random() * Math.PI, -Math.PI * 0.5, 0];

  useEffect(() => {
    setData(
      Array.from({ length: count }, (r = 100) => ({
        random: 0,
        position: randomVector(r),
        rotation: randomEuler(),
        scale: 0.1 + Math.random(),
      }))
    );
    // Set positions
    // for (let i = 0; i < count; i++) {
    //   temp.position.set(Math.random() * 100, Math.random() * 100, 0);
    //   temp.updateMatrix();
    //   instancedMeshRef.current.setMatrixAt(i, temp.matrix);
    // }
    // // Update the instance
    // instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  function Tree({ random, color = new THREE.Color(), ...props }) {
    const ref = useRef();
    // const [hovered, setHover] = useState(false);
    // useFrame((state) => {
    //   const t = state.clock.getElapsedTime() + random * 10000;
    //   ref.current.rotation.set(
    //     Math.cos(t / 4) / 2,
    //     Math.sin(t / 4) / 2,
    //     Math.cos(t / 1.5) / 2
    //   );
    //   ref.current.position.y = Math.sin(t / 1.5) / 2;
    //   ref.current.scale.x =
    //     ref.current.scale.y =
    //     ref.current.scale.z =
    //       THREE.MathUtils.lerp(ref.current.scale.z, hovered ? 1.4 : 1, 0.1);
    //   ref.current.color.lerp(
    //     color.set(hovered ? "red" : "white"),
    //     hovered ? 1 : 0.1
    //   );
    // });
    return (
      <group {...props}>
        <Instance
          ref={ref}
          //   onPointerOver={(e) => e.stopPropagation()}
          //   onPointerOut={(e) => setHover(false)}
        />
      </group>
    );
  }

  return (
    <Detailed distances={[0, 30, 60]}>
      <Instances
        ref={instancedMeshRef}
        range={count}
        // material={materials.Vertex_Shading_Material}
        // geometry={nodes.Object_4.geometry}
        geometry={nodes.Object_2.geometry}
        material={materials.tree}
        rotation={[0, Math.PI * 0.5, 0]}
        castShadow
        receiveShadow
      >
        <group position={[0, 0, 0]}>
          {data.map((props, i) => (
            <Tree key={i} {...props} />
          ))}
        </group>
      </Instances>
    </Detailed>
  );
}
useGLTF.preload("/model/stylize_tree_lowpoly.glb");
