import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { SpotLightHelper } from "three";

const Lights = ({ lights }: any) => {
  const lightRef1 = useRef<any>();
  const lightRef2 = useRef<any>();
  const lightRef3 = useRef<any>();
  // useHelper(lightRef1, SpotLightHelper, "white");
  // useHelper(lightRef2, SpotLightHelper, "black");
  // useHelper(lightRef3, SpotLightHelper, "blue");
  return (
    <>
      <spotLight {...lights[0]} ref={lightRef1} />
      <spotLight {...lights[1]} ref={lightRef2} />
      <spotLight {...lights[2]} ref={lightRef3} />
    </>
  );
};

export default Lights;
