import { OrbitControls } from "@react-three/drei";

function CubeOrbitControls() {
  return <OrbitControls maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 10} />;
}

export default CubeOrbitControls;
