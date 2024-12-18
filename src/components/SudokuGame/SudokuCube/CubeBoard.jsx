import { Canvas } from "@react-three/fiber";
import PropTypes from "prop-types";
import { Color } from "three";
import CubeOrbitControls from "./CubeOrbitControls";

function CubeBoard({ getCubeBoard }) {
  const cubeMap = getCubeBoard();

  return (
    <div className="h-screen w-[1200px]">
      <Canvas
        camera={{
          fov: 60,
          near: 0.1,
          far: 100,
          position: [15, 15, 15],
        }}
      >
        <CubeOrbitControls />
        {cubeMap}
      </Canvas>
    </div>
  );
}

CubeBoard.propTypes = {
  getCubeBoard: PropTypes.func.isRequired,
};

export default CubeBoard;
