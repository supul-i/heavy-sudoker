import { animated, useSpring } from "@react-spring/three";
import { JSX } from "react";
import usePuzzleStore from "../../../store/usePuzzleStore";

type CubeGroupProps = {
  group: { xPosition: number; cubes: JSX.Element[] };
  isLayerView: boolean;
};

type SpringValues = {
  position: [number, number, number];
  rotation: number;
};

function CubeGroup({ group, isLayerView }: CubeGroupProps) {
  const currentLayer = usePuzzleStore((state) => state.currentLayer);
  const X_AXIS_CHANGE = 7;
  const { position, rotation } = useSpring<SpringValues>({
    position:
      isLayerView && group.xPosition === currentLayer
        ? [group.xPosition + X_AXIS_CHANGE / 2, 0, 0]
        : isLayerView
          ? [(group.xPosition - currentLayer) * X_AXIS_CHANGE, 0, 0]
          : [0, 0, 0],
    rotation: isLayerView && group.xPosition === currentLayer ? -90 * (Math.PI / 180) : 0,
  });

  return (
    <animated.group position={position} rotation-y={rotation}>
      {group.cubes}
    </animated.group>
  );
}

export default CubeGroup;
