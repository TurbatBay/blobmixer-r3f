import { useRef } from "react";
import MagicalMaterial from "./materail/shaderMaterial";
import { useTexture } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

const rainbow = "/rainbow.jpeg";
const ocean = "/deep-ocean.jpeg";
const cosmic = "/cosmic-fusion.jpeg";
const passion = "/passion.jpeg";
const white = "/white.jpeg";
const sunset = "/sunset-vibes.jpeg";
const iridescent = "/iridescent.jpeg";
const cd = "/cd.jpeg";
const halloween = "/halloween.jpeg";
const floyd = "/floyd.jpeg";
const hollogram = "/hollogram.jpeg";
const imaginarium = "/imaginarium.jpeg";

const AnimatedMagicalMaterial: any = animated(MagicalMaterial);

const Blob = ({ material, map, geometry }: any) => {
  const meshRef = useRef<any>();

  const { scale, rotate } = geometry;

  const textures = useTexture([
    rainbow,
    ocean,
    cosmic,
    passion,
    white,
    sunset,
    iridescent,
    cd,
    halloween,
    floyd,
    hollogram,
    imaginarium,
  ]);
  const texture = textures[map];

  const AnimatedMaterial = useSpring({
    ...material,
    config: { tension: 60, friction: 20, precision: 0.00001 },
  });

  const meshSpring = useSpring({
    rotation: rotate,
    config: { tension: 50, friction: 14 },
  });

  return (
    <>
      <animated.mesh
        ref={meshRef}
        scale={scale}
        position={[0, 0, 0]}
        {...meshSpring}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 512, 512]} />
        <AnimatedMagicalMaterial map={texture} {...AnimatedMaterial} />
      </animated.mesh>
    </>
  );
};

export default Blob;
