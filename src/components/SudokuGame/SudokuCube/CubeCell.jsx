import { Billboard, Box, Line, Text } from "@react-three/drei";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import usePuzzleStore from "../../../store/usePuzzleStore";

function CubeCell({ position, number, isEmpty, userInputValue }) {
  const setCurrentLayer = usePuzzleStore((state) => state.setCurrentLayer);
  const currentLayer = usePuzzleStore((state) => state.currentLayer);
  const cubeCell = useRef();
  const [hoveredCell, setHoveredCell] = useState(null);
  const isHovered = position.join() === hoveredCell;
  const isHighlighted = position[0] === currentLayer;

  const handleSelectBoard = (e) => {
    e.stopPropagation();
    setCurrentLayer(position[0]);
    cubeCell.current?.material.color.set("purple");
  };

  const handleHoveredCell = (e) => {
    e.stopPropagation();
    setHoveredCell(`${position[0]},${position[1]},${position[2]}`);
  };

  return (
    <group
      key={`${position[0]}${position[1]}${position[2]}`}
      position={position}
      onClick={handleSelectBoard}
      onPointerOut={() => setHoveredCell(null)}
      onPointerOver={handleHoveredCell}
    >
      {isHovered && (
        <Box args={[1, 1, 1]} position={[0.5, 0.5, -0.5]} ref={cubeCell}>
          <meshBasicMaterial transparent={true} opacity={0.5} color={"green"} />
        </Box>
      )}
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
          <Text
            scale={[0.5, 0.5, 0.5]}
            color={isHovered ? "red" : "blue"}
            anchorX="center"
            anchorY="middle"
            fontWeight={900}
          >
            {userInputValue}
          </Text>
        )}
        <Text
          scale={[0.5, 0.5, 0.5]}
          color={isHovered ? "red" : "black"}
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
        >
          {isEmpty ? null : number}
        </Text>
      </Billboard>
      {isHighlighted && (
        <Box args={[1, 1, 1]} position={[0.5, 0.5, -0.5]}>
          <meshBasicMaterial transparent={true} opacity={0.5} color={"#39FF14"} />
        </Box>
      )}
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
