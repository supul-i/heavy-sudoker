import { Billboard, Line, Text } from "@react-three/drei";
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
      <Billboard position={[0.5, 0.5, -0.5]}>
        <Text scale={[0.5, 0.5, 0.5]} color="black" anchorX="center" anchorY="middle">
          {isEmpty ? null : number}
        </Text>
      </Billboard>
    </group>
  );
}

CubeCell.propTypes = {
  position: PropTypes.array.isRequired,
  number: PropTypes.number,
  isEmpty: PropTypes.bool.isRequired,
};

export default CubeCell;
