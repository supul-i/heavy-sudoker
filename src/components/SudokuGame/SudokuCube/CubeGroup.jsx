import { animated, useSpring } from "@react-spring/three";
import PropTypes from "prop-types";

function CubeGroup({ group, isLayerView }) {
  const X_AXIS_CHANGE = 7;
  const { position } = useSpring({
    position: isLayerView ? [group.xPosition * X_AXIS_CHANGE, 0, 0] : [0, 0, 0],
  });

  return <animated.group position={position}>{group.cubes}</animated.group>;
}

CubeGroup.propTypes = {
  group: PropTypes.object.isRequired,
  isLayerView: PropTypes.bool.isRequired,
};

export default CubeGroup;
