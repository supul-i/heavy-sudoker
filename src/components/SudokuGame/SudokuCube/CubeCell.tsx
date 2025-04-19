import { Billboard, Box, Line, Text } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, MeshBasicMaterial } from "three";
import usePuzzleStore from "../../../store/usePuzzleStore";
import useThemeStore from "../../../store/useThemeStore";

type CubeCellProps = {
  position: [number, number, number];
  number: number;
  isEmpty: boolean;
  userInputValue: number | null;
};

function CubeCell({ position, number, isEmpty, userInputValue }: CubeCellProps) {
  const setCurrentLayer = usePuzzleStore((state) => state.setCurrentLayer);
  const currentLayer = usePuzzleStore((state) => state.currentLayer);
  const theme = useThemeStore((state) => state.theme);
  const cubeCell = useRef<Mesh>(null);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const isHovered = position.join() === hoveredCell;
  const isHighlighted = position[0] === currentLayer;

  const handleSelectBoard = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setCurrentLayer(position[0]);

    const currentCubeCell = cubeCell.current?.material as MeshBasicMaterial;
    currentCubeCell.color.set("purple");
  };

  const handleHoveredCell = (e: ThreeEvent<PointerEvent>) => {
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
        color="gray"
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
            fontWeight={600}
          >
            {userInputValue}
          </Text>
        )}
        <Text
          scale={[0.5, 0.5, 0.5]}
          color={isHovered ? "red" : theme === "dark" ? "#EBFFEB" : "black"}
          anchorX="center"
          anchorY="middle"
          fontWeight={800}
        >
          {isEmpty ? null : number}
        </Text>
      </Billboard>
      {isHighlighted ? (
        <Box args={[1, 1, 1]} position={[0.5, 0.5, -0.5]}>
          <meshBasicMaterial transparent={true} opacity={0.3} color={"#39FF14"} />
        </Box>
      ) : (
        <Box args={[1, 1, 1]} position={[0.5, 0.5, -0.5]}>
          <meshBasicMaterial
            transparent={true}
            opacity={0.2}
            color={theme === "dark" ? "#9d9b9b" : "#ffffff"}
          />
        </Box>
      )}
    </group>
  );
}

export default CubeCell;
