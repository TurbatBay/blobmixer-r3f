"use client";

import {
  CameraShake,
  Environment,
  OrbitControls,
  Stats,
} from "@react-three/drei";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState } from "react";
import Blob from "./blobMesh/blob";
import useBlob from "../hooks/useBlob";
import Lights from "./light";
import { animated } from "@react-spring/web";
import SpiralPlane from "./Text/SpiralPlane";
import { BlobSetting, Titles } from "../utils/blobSettings";
import useWheel from "../hooks/useWheel";
import { pages } from "./Text/data";
import useUsefulHooks from "../hooks/useWheel";
import { Interactive } from "@react-three/xr";
import { easing } from "maath";
const SphereCanvas = ({ current, setCurrent }: any) => {
  // const { bg, ambient, lights, ...restSetting } = useBlob();
  const { prevPage, nextPage, lastAction }: any = useUsefulHooks();
  // const [current, setCurrent] = useState(3);

  const { bg, ambient, lights, ...restSetting } = useMemo(
    () => BlobSetting[pages[current].name],
    [nextPage, prevPage, current]
  );

  return (
    <animated.div
      className="w-full h-full"
      style={{ background: bg, transition: "ease-out 0.5s" }}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={ambient} />

        <Lights lights={lights} />
        <Suspense fallback={null}>
          <Blob {...restSetting} />
          <SpiralPlane />
        </Suspense>
        <Stats />
        {/* <OrbitControls /> */}
        <Environment files={"/peppermint_powerplant_1k.hdr"} />
      </Canvas>
    </animated.div>
  );
};
// function CameraRig() {
//   useFrame((state, delta) => {
//     easing.damp3(
//       state.camera.position,
//       [
//         -1 + (state.pointer.x * state.viewport.width) / 3,
//         (1 + state.pointer.y) / 2,
//         5.5,
//       ],
//       0.5,
//       delta
//     );
//     state.camera.lookAt(0, 0, 0);
//   });
// }

export default SphereCanvas;
