/*
This file was generated by https://github.com/pmndrs/gltfjsx and then
customized manually. It uses drei's new useAnimations hook which extracts
all actions and sets up a THREE.AnimationMixer for it so that you don't have to.
All of the assets actions, action-names and clips are available in its output. 
*/

import { useEffect, useState, useRef } from "react";
import { act, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, useAnimations } from "@react-three/drei";
// import { Vector3, Quaternion, PlaneBufferGeometry } from "three";
import * as THREE from "three";
// import { Grass } from "./grass";
// import { PlaneGeometry } from "./plane";
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Omabuarts Studio (https://sketchfab.com/omabuarts)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/quirky-series-free-animals-pack-19e91ef86cd0448f9cbb5d6c538dade2
Title: Quirky Series - FREE Animals Pack
*/

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/model/LavenderWaxbill_Animations.glb"
  );
  const { actions } = useAnimations(animations, group);

  const currentPosition = new THREE.Vector3();
  const currentLookAt = new THREE.Vector3();
  const decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
  const acceleration = new THREE.Vector3(1, 0.125, 100.0);
  const velocity = new THREE.Vector3(0, 0, 0);

  //   https://codesandbox.io/s/vkgi6?file=/src/Player.js:661-1802
  //https://codesandbox.io/p/github/sliktrik/r3f-world-with-character/main?file=%2FREADME.md&workspace=%257B%2522activeFileId%2522%253A%2522clez6ybn4000gg9ghhqm11iya%2522%252C%2522openFiles%2522%253A%255B%2522%252FREADME.md%2522%255D%252C%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522gitSidebarPanel%2522%253A%2522COMMIT%2522%252C%2522spaces%2522%253A%257B%2522clezdlos7000x3b6hfohnsuty%2522%253A%257B%2522key%2522%253A%2522clezdlos7000x3b6hfohnsuty%2522%252C%2522name%2522%253A%2522Default%2522%252C%2522devtools%2522%253A%255B%257B%2522key%2522%253A%2522clezdlos7000y3b6hn30qwah1%2522%252C%2522type%2522%253A%2522PROJECT_SETUP%2522%252C%2522isMinimized%2522%253Afalse%257D%252C%257B%2522type%2522%253A%2522PREVIEW%2522%252C%2522taskId%2522%253A%2522start%2522%252C%2522port%2522%253A3000%252C%2522key%2522%253A%2522clezdlos7000z3b6ha9izsakt%2522%252C%2522isMinimized%2522%253Afalse%257D%255D%257D%257D%252C%2522currentSpace%2522%253A%2522clezdlos7000x3b6hfohnsuty%2522%252C%2522spacesOrder%2522%253A%255B%2522clezdlos7000x3b6hfohnsuty%2522%255D%252C%2522hideCodeEditor%2522%253Afalse%257D
  //https://github.com/Louis3797/r3f-world-with-character/blob/main/src/components/Character.tsx

  const calculateIdealOffset = () => {
    const idealOffset = new THREE.Vector3(0, 20, -50);
    idealOffset.applyQuaternion(group.current.quaternion);
    idealOffset.add(group.current.position);
    return idealOffset;
  };

  const calculateIdealLookat = () => {
    const idealLookat = new THREE.Vector3(0, 0, 0);
    idealLookat.applyQuaternion(group.current.quaternion);
    idealLookat.add(group.current.position);
    return idealLookat;
  };

  function updateCameraTarget(delta) {
    const idealOffset = calculateIdealOffset();
    const idealLookat = calculateIdealLookat();

    // const t = 1.0 - Math.pow(0.001, delta);

    currentPosition.lerp(idealOffset, 0.05);
    currentLookAt.lerp(idealLookat, 0.05);

    const distance = new THREE.Vector3(0, 2, -4);

    props.camera.position.copy(group.current.position);
    props.camera.position.add(distance);
  }

  const characterState = (delta) => {
    const newVelocity = velocity;
    const frameDecceleration = new THREE.Vector3(
      newVelocity.x * decceleration.x,
      newVelocity.y * decceleration.y,
      newVelocity.z * decceleration.z
    );
    frameDecceleration.multiplyScalar(delta);
    frameDecceleration.z =
      Math.sign(frameDecceleration.z) *
      Math.min(Math.abs(frameDecceleration.z), Math.abs(newVelocity.z));

    newVelocity.add(frameDecceleration);

    const controlObject = group.current;
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion.clone();

    const acc = acceleration.clone();
    // if (activeAnimation.run) {
    //   acc.multiplyScalar(2.0);
    // }

    // if (currAction === animations["dance"].clip) {
    //   acc.multiplyScalar(0.0);
    // }

    if (props.click === true) {
      newVelocity.z += acc.z * delta;
      _Q.setFromAxisAngle(_A, 4.0 * Math.PI * delta * acceleration.y);
      _R.multiply(_Q);
    }
    // if (activeAnimation.backward) {
    //   newVelocity.z -= acc.z * delta;
    // }
    // if (activeAnimation.left) {
    //   _A.set(0, 1, 0);
    //   _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * delta * acceleration.y);
    //   _R.multiply(_Q);
    // }
    // if (activeAnimation.right) {
    //   _A.set(0, 1, 0);
    //   _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * delta * acceleration.y);
    //   _R.multiply(_Q);
    // }

    controlObject.quaternion.copy(_R);

    const oldPosition = new THREE.Vector3();
    oldPosition.copy(controlObject.position);

    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyQuaternion(controlObject.quaternion);
    forward.normalize();

    const sideways = new THREE.Vector3(1, 0, 0);
    sideways.applyQuaternion(controlObject.quaternion);
    sideways.normalize();

    sideways.multiplyScalar(newVelocity.x * delta);
    forward.multiplyScalar(newVelocity.z * delta);

    controlObject.position.add(forward);
    controlObject.position.add(sideways);

    group.current.position.copy(controlObject.position);
    updateCameraTarget(delta);
  };

  useFrame((state, delta) => {
    // prevAction = currAction;

    // if (activeAnimation.forward) {
    //   if (activeAnimation.run) {
    //     currAction = animations["run"].clip;
    //   } else {
    //     currAction = animations["walk"].clip;
    //   }
    // } else if (activeAnimation.left) {
    //   if (activeAnimation.run) {
    //     currAction = animations["run"].clip;
    //   } else {
    //     currAction = animations["walk"].clip;
    //   }
    // } else if (activeAnimation.right) {
    //   if (activeAnimation.run) {
    //     currAction = animations["run"].clip;
    //   } else {
    //     currAction = animations["walk"].clip;
    //   }
    // } else if (activeAnimation.backward) {
    //   if (activeAnimation.run) {
    //     currAction = animations["run"].clip;
    //   } else {
    //     currAction = animations["walk"].clip;
    //   }
    // } else if (activeAnimation.dance) {
    //   currAction = animations["dance"].clip;
    // } else {
    //   currAction = animations["idle"].clip;
    // }

    // if (prevAction !== currAction) {
    //   prevAction.fadeOut(0.2);

    //   if (prevAction === animations["walk"].clip) {
    //     const ratio =
    //       currAction.getClip().duration / prevAction.getClip().duration;
    //     currAction.time = prevAction.time * ratio;
    //   }

    //   currAction.reset().play();
    // } else {
    //   currAction.play();
    // }

    characterState(delta);
    const idealLookat = calculateIdealLookat();

    state.camera.lookAt(idealLookat);
    state.camera.updateProjectionMatrix();
    // mixer?.update(delta);
  });

  useEffect(() => {
    if (actions !== undefined) {
      console.log(props.fly);
      console.log(props.click);

      if (props.click === true && props.fly === false) {
        actions.Walk.play();
        actions.Fly.stop();
        actions.Idle_A.stop();
      } else if (props.fly === true) {
        actions.Fly.play();
        actions.Walk.stop();
        actions.Idle_A.stop();
      } else {
        actions.Fly.stop();
        actions.Idle_A.play();
        actions.Walk.stop();
      }

      //   for (const actionName in actions) {
      //     actions[actionName].play();
      //     console.log(actionName);
      //   }
    }
  }, [actions, props.click]);

  // const planeBufferGeometry = new THREE.PlaneBufferGeometry();

  return (
    <group {...props} dispose={null} ref={group} position={[0, 0, 0]}>
      <group
        name="Scene"
        // rotation={[0, -Math.PI * -props.angle + 0.5 * Math.PI, 0]}
        rotation={[0, 0, 0]}
      >
        <mesh name="Rig" scale={0.4} castShadow receiveShadow>
          <skinnedMesh
            name="Mesh"
            geometry={nodes.Mesh.geometry}
            material={materials.M_LavenderWaxbill}
            skeleton={nodes.Mesh.skeleton}
            castShadow
            receiveShadow
          />
          <primitive object={nodes.root} />
        </mesh>
        <mesh rotation={[-(Math.PI * 1) / 2, 0, 0]} receiveShadow>
          {/* <Grass>
            <PlaneGeometry /> */}
          {/* <mesh geometry={planeBufferGeometry} args={[1000, 1000, 1, 1]} /> */}
          {/* </Grass> */}
          <planeGeometry args={[1000, 1000, 1, 1]} />
          <meshPhongMaterial
            attach="material"
            color="#A1E0F1"
            reflectivity={0}
            shininess={0}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/model/LavenderWaxbill_Animations.glb");
