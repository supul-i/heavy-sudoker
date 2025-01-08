import { animated, useSpring } from "@react-spring/three";
import PropTypes from "prop-types";
import usePuzzleStore from "../../../store/usePuzzleStore";

function CubeGroup({ group, isLayerView }) {
  const currentLayer = usePuzzleStore((state) => state.currentLayer);
  const X_AXIS_CHANGE = 7;
  const { position, rotation } = useSpring({
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

CubeGroup.propTypes = {
  group: PropTypes.object.isRequired,
  isLayerView: PropTypes.bool.isRequired,
};

export default CubeGroup;
