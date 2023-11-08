import React, { useRef } from "react";
import { useGLTF, Instance } from "@react-three/drei";

export default function Tree(props) {
  const { nodes, materials } = useGLTF("/model/cartoon_tree.glb");

  //   nodes.Object_4.geometry.computeBoundingSphere();

  return (
    <group {...props}>
      <Instance
        ref={ref}
        onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
        onPointerOut={(e) => setHover(false)}
      />
    </group>
    // <group {...props} dispose={null}>
    //   <mesh
    //     castShadow
    //     receiveShadow
    //     geometry={nodes.Object_4.geometry}
    //     material={materials.Vertex_Shading_Material}
    //     rotation={[Math.PI / 2, 0, 0]}
    //     scale={0.4}
    //   />
    // </group>
  );
}

useGLTF.preload("/model/cartoon_tree.glb");
