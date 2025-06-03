import { memo, useEffect, useMemo, useState } from 'react';
import { Dimensions, PanResponder, TouchableOpacity } from 'react-native';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { Screen } from '~/components/Screen/Screen';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

interface GameState {
  grid: boolean[][];
  isRunning: boolean;
  boardSize: number;
  speed: number;
  setBoardSize: (size: number) => void;
  setSpeed: (speed: number) => void;
  toggleCell: (row: number, col: number) => void;
  toggleRunning: () => void;
  clearGrid: () => void;
  nextGeneration: () => void;
  randomizeGrid: () => void;
}

const createInitialGrid = (size: number): boolean[][] => {
  return Array(size)
    .fill(null)
    .map(() => Array(size).fill(false));
};

const createRandomGrid = (size: number): boolean[][] => {
  return Array(size)
    .fill(null)
    .map(() =>
      Array(size)
        .fill(null)
        .map(() => Math.random() > 0.7)
    );
};

// Get all neighbors of a cell, including the cell itself
const getNeighbors = (row: number, col: number, size: number): [number, number][] => {
  const neighbors: [number, number][] = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = (row + i + size) % size;
      const newCol = (col + j + size) % size;
      neighbors.push([newRow, newCol]);
    }
  }
  return neighbors;
};

// Get all cells that need to be checked in the next generation
const getCellsToCheck = (grid: boolean[][], size: number): Set<string> => {
  const cellsToCheck = new Set<string>();

  // Add all live cells and their neighbors
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j]) {
        const neighbors = getNeighbors(i, j, size);
        neighbors.forEach(([row, col]) => {
          cellsToCheck.add(`${row},${col}`);
        });
      }
    }
  }

  return cellsToCheck;
};

const useGameStore = create<GameState>((set, get) => ({
  grid: createInitialGrid(20),
  isRunning: false,
  boardSize: 30,
  speed: 9, // 1-10 scale, where 10 is fastest
  setBoardSize: (size: number) => {
    set({ boardSize: size, grid: createInitialGrid(size) });
  },
  setSpeed: (speed: number) => {
    set({ speed });
  },
  toggleCell: (row: number, col: number) => {
    const { grid } = get();
    const newGrid = grid.map((row) => [...row]);
    newGrid[row][col] = !newGrid[row][col];
    set({ grid: newGrid });
  },
  toggleRunning: () => {
    const { isRunning } = get();
    if (!isRunning) {
      set({ grid: createRandomGrid(get().boardSize), isRunning: true });
    } else {
      set({ isRunning: false });
    }
  },
  clearGrid: () => set({ grid: createInitialGrid(get().boardSize) }),
  randomizeGrid: () => set({ grid: createRandomGrid(get().boardSize) }),
  nextGeneration: () => {
    const { grid, boardSize } = get();
    const newGrid = createInitialGrid(boardSize);
    const cellsToCheck = getCellsToCheck(grid, boardSize);

    // Only check cells that are alive or have living neighbors
    cellsToCheck.forEach((cellKey) => {
      const [row, col] = cellKey.split(',').map(Number);
      const neighbors = getNeighbors(row, col, boardSize);
      const liveNeighbors =
        neighbors.filter(([r, c]) => grid[r][c]).length - (grid[row][col] ? 1 : 0);

      if (grid[row][col]) {
        // Live cell survives with 2 or 3 neighbors
        if (liveNeighbors === 2 || liveNeighbors === 3) {
          newGrid[row][col] = true;
        }
      } else {
        // Dead cell becomes alive with exactly 3 neighbors
        if (liveNeighbors === 3) {
          newGrid[row][col] = true;
        }
      }
    });

    set({ grid: newGrid });
  },
}));

const CustomSlider = memo(
  ({
    value,
    onValueChange,
    min = 10,
    max = 50,
    label,
    valueDisplay,
  }: {
    value: number;
    onValueChange: (value: number) => void;
    min?: number;
    max?: number;
    label: string;
    valueDisplay?: (value: number) => string;
  }) => {
    const { colors } = useAppTheme();
    const sliderWidth = Dimensions.get('window').width - 40;
    const [sliderLayout, setSliderLayout] = useState({ x: 0, width: 0 });

    const panResponder = useMemo(
      () =>
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: () => true,
          onPanResponderMove: (_, gestureState) => {
            const { x, width } = sliderLayout;
            const relativeX = gestureState.moveX - x;
            const percentage = Math.max(0, Math.min(1, relativeX / width));
            const newValue = Math.round(min + percentage * (max - min));
            onValueChange(newValue);
          },
        }),
      [min, max, onValueChange, sliderLayout]
    );

    const sliderPosition = ((value - min) / (max - min)) * sliderWidth;

    return (
      <View padding={10}>
        <Text title={`${label}: ${valueDisplay ? valueDisplay(value) : value}`} />
        <View
          onLayout={(e) => {
            const { x, width } = e.nativeEvent.layout;
            setSliderLayout({ x, width });
          }}
          height={4}
          backgroundColor={colors.muted}
          borderRadius={2}>
          <View
            height="100%"
            width={sliderPosition}
            backgroundColor={colors.primary}
            borderRadius={2}
          />
          <View
            {...panResponder.panHandlers}
            width={20}
            height={20}
            backgroundColor={colors.primary}
            borderRadius={10}
            position="absolute"
            left={sliderPosition - 10}
            top={-8}
            shadowColor={colors.foreground}
            shadowOffset={{
              width: 0,
              height: 2,
            }}
            shadowOpacity={0.25}
            shadowRadius={3.84}
            elevation={5}
          />
        </View>
      </View>
    );
  }
);

const Cell = memo(({ rowIndex, colIndex }: { rowIndex: number; colIndex: number }) => {
  const { colors } = useAppTheme();
  const toggleCell = useGameStore((state) => state.toggleCell);
  const isAlive = useGameStore(useShallow((state) => state.grid[rowIndex][colIndex]));

  return (
    <TouchableOpacity
      onPress={() => toggleCell(rowIndex, colIndex)}
      style={{ flex: 1, aspectRatio: 1 }}>
      <View
        flex={1}
        borderWidth={1}
        borderColor={colors.border}
        backgroundColor={isAlive ? colors.foreground : colors.transparent}
      />
    </TouchableOpacity>
  );
});

const GridRow = memo(({ row, rowIndex }: { row: boolean[]; rowIndex: number }) => (
  <View flexDirection="row">
    {row.map((_, colIndex) => (
      <Cell key={`${rowIndex}-${colIndex}`} rowIndex={rowIndex} colIndex={colIndex} />
    ))}
  </View>
));

const GameOfLife = () => {
  const {
    grid,
    isRunning,
    boardSize,
    speed,
    setBoardSize,
    setSpeed,
    toggleRunning,
    clearGrid,
    randomizeGrid,
    nextGeneration,
  } = useGameStore();

  const { colors } = useAppTheme();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      const intervalMs = 100 - (speed - 1) * (99 / 9);
      interval = setInterval(nextGeneration, intervalMs);
    }
    return () => clearInterval(interval);
  }, [isRunning, nextGeneration, speed]);

  return (
    <Screen>
      <Text title="Game of Life" />
      <View flexDirection="row" justifyContent="center" gap={10} marginVertical={10}>
        <TouchableOpacity onPress={toggleRunning}>
          <View
            padding={10}
            backgroundColor={isRunning ? colors.primary : colors.muted}
            borderRadius={5}>
            <Text
              title={isRunning ? 'Stop' : 'Start'}
              color={isRunning ? 'primaryForeground' : 'foreground'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearGrid}>
          <View padding={10} backgroundColor={colors.muted} borderRadius={5}>
            <Text title="Clear" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={randomizeGrid}>
          <View padding={10} backgroundColor={colors.muted} borderRadius={5}>
            <Text title="Random" />
          </View>
        </TouchableOpacity>
      </View>
      <View padding={10}>
        <CustomSlider
          label="Board Size"
          value={boardSize}
          onValueChange={setBoardSize}
          min={10}
          max={50}
        />
        <CustomSlider
          label="Speed"
          value={speed}
          onValueChange={setSpeed}
          min={1}
          max={10}
          valueDisplay={(v) => `${v}/10`}
        />
      </View>
      <View flex={1} position="relative">
        <View backgroundColor={colors.card} borderWidth={1} borderColor={colors.border}>
          {grid.map((row, i) => (
            <GridRow key={i} row={row} rowIndex={i} />
          ))}
        </View>
      </View>
    </Screen>
  );
};

export default GameOfLife;
