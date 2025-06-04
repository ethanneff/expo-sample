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
  activeCells: Set<string>; // Cache of cells that need to be checked
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

// Get all cells that need to be checked in the next generation (optimized with caching)
const getCellsToCheck = (activeCells: Set<string>, size: number): Set<string> => {
  const cellsToCheck = new Set<string>();

  // Only check previously active cells and their neighbors
  activeCells.forEach((cellKey) => {
    const [row, col] = cellKey.split(',').map(Number);
    const neighbors = getNeighbors(row, col, size);
    neighbors.forEach(([r, c]) => {
      cellsToCheck.add(`${r},${c}`);
    });
  });

  return cellsToCheck;
};

// Initialize active cells by scanning the grid (used only when needed)
const initializeActiveCells = (grid: boolean[][], size: number): Set<string> => {
  const activeCells = new Set<string>();

  // Add all live cells and their neighbors
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j]) {
        const neighbors = getNeighbors(i, j, size);
        neighbors.forEach(([row, col]) => {
          activeCells.add(`${row},${col}`);
        });
      }
    }
  }

  return activeCells;
};

const useGameStore = create<GameState>((set, get) => ({
  grid: createInitialGrid(20),
  isRunning: false,
  boardSize: 20,
  speed: 10, // 1-10 scale, where 10 is fastest
  activeCells: new Set<string>(),
  actions: {
    setBoardSize: (size: number) => {
      const newGrid = createInitialGrid(size);
      set({
        boardSize: size,
        grid: newGrid,
        activeCells: initializeActiveCells(newGrid, size),
      });
    },
    setSpeed: (speed: number) => {
      set({ speed });
    },
    toggleCell: (row: number, col: number) => {
      const { grid, boardSize } = get();
      const newGrid = grid.map((row) => [...row]);
      newGrid[row][col] = !newGrid[row][col];
      set({
        grid: newGrid,
        activeCells: initializeActiveCells(newGrid, boardSize),
      });
    },
    toggleRunning: () => {
      const { isRunning, boardSize } = get();
      if (!isRunning) {
        const newGrid = createRandomGrid(boardSize);
        set({
          grid: newGrid,
          isRunning: true,
          activeCells: initializeActiveCells(newGrid, boardSize),
        });
      } else {
        set({ isRunning: false });
      }
    },
    clearGrid: () => {
      const newGrid = createInitialGrid(get().boardSize);
      set({
        grid: newGrid,
        activeCells: new Set<string>(), // Empty grid has no active cells
      });
    },
    randomizeGrid: () => {
      const { boardSize } = get();
      const newGrid = createRandomGrid(boardSize);
      set({
        grid: newGrid,
        activeCells: initializeActiveCells(newGrid, boardSize),
      });
    },
    nextGeneration: () => {
      const { grid, boardSize, activeCells } = get();
      const newGrid = createInitialGrid(boardSize);
      const cellsToCheck = getCellsToCheck(activeCells, boardSize);
      const newActiveCells = new Set<string>();

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
            // Add this live cell and its neighbors to active cells for next generation
            const cellNeighbors = getNeighbors(row, col, boardSize);
            cellNeighbors.forEach(([r, c]) => {
              newActiveCells.add(`${r},${c}`);
            });
          }
        } else {
          // Dead cell becomes alive with exactly 3 neighbors
          if (liveNeighbors === 3) {
            newGrid[row][col] = true;
            // Add this new live cell and its neighbors to active cells for next generation
            const cellNeighbors = getNeighbors(row, col, boardSize);
            cellNeighbors.forEach(([r, c]) => {
              newActiveCells.add(`${r},${c}`);
            });
          }
        }
      });

      set({ grid: newGrid, activeCells: newActiveCells });
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
