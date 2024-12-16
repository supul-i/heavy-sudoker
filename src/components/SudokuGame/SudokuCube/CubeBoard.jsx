import { Canvas } from "@react-three/fiber";
import PropTypes from "prop-types";
import { Color } from "three";
import CubeOrbitControls from "./CubeOrbitControls";

function CubeBoard({ cubeMap }) {
  return (
    <div className="h-[600px] w-[600px]">
      <Canvas
        gl={{ antialias: true }}
        camera={{
          fov: 60,
          near: 0.1,
          far: 100,
          position: [10, 10, 10],
        }}
        scene={{ background: new Color(0x000000) }}
      >
        <CubeOrbitControls />
        {cubeMap}
      </Canvas>
    </div>
  );
}

CubeBoard.propTypes = {
  cubeMap: PropTypes.array.isRequired,
};

export default CubeBoard;
