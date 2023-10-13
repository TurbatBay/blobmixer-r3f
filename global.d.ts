import { ReactThreeFiber } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineMaterial: ReactThreeFiber.Object3DNode<THREE.MeshLineMaterial>;
      rayShaderMaterial: any;
      fogShaderMaterial: any;
      flameShaderMaterial: any;
      shading: any;
      shading2: any;
    }
  }
}
declare module "babel-plugin-glsl/macro" {
  const value: any;
  export default value;
}
