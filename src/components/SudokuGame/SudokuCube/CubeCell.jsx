import { Billboard, Line, Text } from "@react-three/drei";
import PropTypes from "prop-types";
import usePuzzleStore from "../../../store/usePuzzleStore";

function CubeCell({ position, number, isEmpty, userInputValue }) {
  const setCurrentLayer = usePuzzleStore((state) => state.setCurrentLayer);

  const handleSelectBoard = (e) => {
    e.stopPropagation();
    setCurrentLayer(position[0]);
  };

  return (
    <group
      key={`${position[0]}${position[1]}${position[2]}`}
      position={position}
      onClick={handleSelectBoard}
    >
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
        {userInputValue && (
          <Text scale={[0.5, 0.5, 0.5]} color="orange" anchorX="center" anchorY="middle">
            {userInputValue}
          </Text>
        )}
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
  userInputValue: PropTypes.number,
};

export default CubeCell;
