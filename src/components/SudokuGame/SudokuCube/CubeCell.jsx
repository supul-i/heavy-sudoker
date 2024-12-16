import { Line, Text } from "@react-three/drei";
import PropTypes from "prop-types";

function CubeCell({ position, number, isEmpty }) {
  return (
    <group key={`${position[0]}${position[1]}${position[2]}`} position={position}>
      <Line
        points={[
          [0, 0, 0],
          [1, 0, 0],
          [1, 0, 0],
          [1, 0, -1],
          [0, 0, -1],
          [1, 0, -1],
          [0, 0, 0],
          [0, 0, -1],
          [1, 1, -1],
          [1, 1, 0],
          [0, 1, 0],
          [1, 1, 0],
          [0, 1, 0],
          [0, 1, -1],
          [0, 1, -1],
          [1, 1, -1],
          [0, 0, 0],
          [0, 1, 0],
          [1, 0, 0],
          [1, 1, 0],
          [1, 0, -1],
          [1, 1, -1],
          [0, 0, -1],
          [0, 1, -1],
        ]}
        color="green"
        lineWidth={1}
        segments
        dashed={false}
      />
      <Text
        scale={[0.7, 0.7, 0.7]}
        color="white"
        anchorX="center"
        anchorY="middle"
        position={[0.5, 0.5, -0.5]}
      >
        {isEmpty ? null : number}
      </Text>
    </group>
  );
}

CubeCell.propTypes = {
  position: PropTypes.array.isRequired,
  number: PropTypes.number,
  isEmpty: PropTypes.bool.isRequired,
};

export default CubeCell;
