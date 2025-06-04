import { memo, useEffect } from 'react';
import { Pressable } from 'react-native';
import { create } from 'zustand';
import { Button } from '~/components/Button/Button';
import { Screen } from '~/components/Screen/Screen';
import { Slider } from '~/components/Slider/Slider';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

interface GameState {
  grid: boolean[][];
  isRunning: boolean;
  boardSize: number;
  speed: number;
  actions: {
    setBoardSize: (size: number) => void;
    setSpeed: (speed: number) => void;
    toggleCell: (row: number, col: number) => void;
    toggleRunning: () => void;
    clearGrid: () => void;
    nextGeneration: () => void;
    randomizeGrid: () => void;
  };
}

const createInitialGrid = (size: number): boolean[][] => {
  return Array(size)
    .fill(false)
    .map(() => Array(size).fill(false));
};

const createRandomGrid = (size: number): boolean[][] => {
  return Array(size)
    .fill(false)
    .map(() =>
      Array(size)
        .fill(false)
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
  boardSize: 20,
  speed: 10, // 1-10 scale, where 10 is fastest
  actions: {
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
  },
}));

const Board = () => {
  const grid = useGameStore((state) => state.grid);

  return (
    <View flex={1}>
      {grid.map((row, i) => (
        <View flexDirection="row" key={i}>
          {row.map((_, j) => (
            <Cell key={`${i}-${j}`} rowIndex={i} colIndex={j} isAlive={grid[i][j]} />
          ))}
        </View>
      ))}
    </View>
  );
};

type CellProps = {
  rowIndex: number;
  colIndex: number;
  isAlive: boolean;
};

const Cell = memo(({ rowIndex, colIndex, isAlive }: CellProps) => {
  const { colors } = useAppTheme();
  const toggleCell = useGameStore((state) => state.actions.toggleCell);

  return (
    <Pressable onPress={() => toggleCell(rowIndex, colIndex)} style={{ flex: 1, aspectRatio: 1 }}>
      <View
        flex={1}
        borderWidth={1}
        borderColor={colors.border}
        backgroundColor={isAlive ? colors.foreground : colors.transparent}
      />
    </Pressable>
  );
});

const GameOfLife = () => {
  const { spacing } = useAppTheme();
  const isRunning = useGameStore((state) => state.isRunning);
  const boardSize = useGameStore((state) => state.boardSize);
  const speed = useGameStore((state) => state.speed);
  const actions = useGameStore((state) => state.actions);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      const intervalMs = 100 - (speed - 1) * (99 / 9);
      interval = setInterval(actions.nextGeneration, intervalMs);
    }
    return () => clearInterval(interval);
  }, [isRunning, actions.nextGeneration, speed]);

  return (
    <Screen>
      <View flexDirection="row" justifyContent="center" gap={spacing.$4}>
        <Button
          title={isRunning ? 'Stop' : 'Start'}
          onPress={actions.toggleRunning}
          variant={isRunning ? 'destructive' : 'primary'}
        />
        <Button title="Clear" onPress={actions.clearGrid} variant="outline" />
        <Button title="Random" onPress={actions.randomizeGrid} variant="outline" />
        <Button title="Next" onPress={actions.nextGeneration} variant="outline" />
      </View>
      <Text title={`Board Size: ${boardSize}`} />
      <Slider value={boardSize} onChange={actions.setBoardSize} min={10} max={50} step={1} />
      <Text title={`Speed: ${speed}`} />
      <Slider value={speed} onChange={actions.setSpeed} min={1} max={10} step={1} />
      <Board />
    </Screen>
  );
};

export default GameOfLife;
