import { Canvas } from "@react-three/fiber";
import { JSX, Suspense } from "react";
import { PUZZLE_SIZE } from "../../../constants/puzzle";
import Loading from "../../../shared/components/LoadingDots";
import CubeGroup from "./CubeGroup";
import CubeOrbitControls from "./CubeOrbitControls";

type CubeBoardProps = {
  getCubeBoard: () => JSX.Element[];
  isLayerView: boolean;
};

function CubeBoard({ getCubeBoard, isLayerView }: CubeBoardProps) {
  const cubeMap = getCubeBoard();
  const xValues = Array.from({ length: PUZZLE_SIZE }, (_, i) => i);
  const xAxisCubeGroups = xValues.map((xPosition) => ({
    xPosition,
    cubes: cubeMap.filter((cube) => cube.props.position[0] === xPosition),
  }));

  return (
    <Suspense fallback={<Loading />}>
      <Canvas
        camera={{
          fov: 60,
          near: 0.1,
          far: 100,
          position: [15, 15, 15],
        }}
      >
        <CubeOrbitControls />
        {xAxisCubeGroups.map((group) => (
          <CubeGroup key={group.xPosition} group={group} isLayerView={isLayerView} />
        ))}
      </Canvas>
    </Suspense>
  );
}

export default CubeBoard;
