import { memo, useCallback, useEffect } from 'react';
import { Pressable } from 'react-native';
import { create } from 'zustand';
import { Button } from '~/components/Button/Button';
import { Screen } from '~/components/Screen/Screen';
import { Slider } from '~/components/Slider/Slider';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type GameState = {
  actions: {
    clearGrid: () => void;
    nextGeneration: () => void;
    randomizeGrid: () => void;
    setBoardSize: (size: number) => void;
    setSpeed: (speed: number) => void;
    toggleCell: (row: number, col: number) => void;
    toggleRunning: () => void;
  };
  activeCells: Set<string>; // Cache of cells that need to be checked
  boardSize: number;
  grid: boolean[][];
  isRunning: boolean;
  speed: number;
};

const createInitialGrid = (size: number): boolean[][] => {
  return new Array(size).fill(false).map(() => new Array(size).fill(false));
};

const createRandomGrid = (size: number): boolean[][] => {
  return new Array(size)
    .fill(false)
    .map(() => new Array(size).fill(false).map(() => Math.random() > 0.7));
};

// Get all neighbors of a cell, including the cell itself
const getNeighbors = (row: number, col: number, size: number): [number, number][] => {
  const neighbors: [number, number][] = [];
  for (let index = -1; index <= 1; index++) {
    for (let index_ = -1; index_ <= 1; index_++) {
      const newRow = (row + index + size) % size;
      const newCol = (col + index_ + size) % size;
      neighbors.push([newRow, newCol]);
    }
  }
  return neighbors;
};

// Get all cells that need to be checked in the next generation (optimized with caching)
const getCellsToCheck = (activeCells: Set<string>, size: number): Set<string> => {
  const cellsToCheck = new Set<string>();

  // Only check previously active cells and their neighbors
  for (const cellKey of activeCells) {
    const [row, col] = cellKey.split(',').map(Number);
    const neighbors = getNeighbors(row, col, size);
    for (const [r, c] of neighbors) {
      cellsToCheck.add(`${r},${c}`);
    }
  }

  return cellsToCheck;
};

// Initialize active cells by scanning the grid (used only when needed)
const initializeActiveCells = (grid: boolean[][], size: number): Set<string> => {
  const activeCells = new Set<string>();

  // Add all live cells and their neighbors
  for (let index = 0; index < size; index++) {
    for (let index_ = 0; index_ < size; index_++) {
      if (grid[index][index_]) {
        const neighbors = getNeighbors(index, index_, size);
        for (const [row, col] of neighbors) {
          activeCells.add(`${row},${col}`);
        }
      }
    }
  }

  return activeCells;
};

const useGameStore = create<GameState>((set, get) => ({
  actions: {
    clearGrid: () => {
      const newGrid = createInitialGrid(get().boardSize);
      set({
        activeCells: new Set<string>(), // Empty grid has no active cells
        grid: newGrid,
      });
    },
    nextGeneration: () => {
      const { activeCells, boardSize, grid } = get();
      const newGrid = createInitialGrid(boardSize);
      const cellsToCheck = getCellsToCheck(activeCells, boardSize);
      const newActiveCells = new Set<string>();

      // Only check cells that are alive or have living neighbors
      for (const cellKey of cellsToCheck) {
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
            for (const [r, c] of cellNeighbors) {
              newActiveCells.add(`${r},${c}`);
            }
          }
        } else {
          // Dead cell becomes alive with exactly 3 neighbors
          if (liveNeighbors === 3) {
            newGrid[row][col] = true;
            // Add this new live cell and its neighbors to active cells for next generation
            const cellNeighbors = getNeighbors(row, col, boardSize);
            for (const [r, c] of cellNeighbors) {
              newActiveCells.add(`${r},${c}`);
            }
          }
        }
      }

      set({ activeCells: newActiveCells, grid: newGrid });
    },
    randomizeGrid: () => {
      const { boardSize } = get();
      const newGrid = createRandomGrid(boardSize);
      set({
        activeCells: initializeActiveCells(newGrid, boardSize),
        grid: newGrid,
      });
    },
    setBoardSize: (size: number) => {
      const newGrid = createInitialGrid(size);
      set({
        activeCells: initializeActiveCells(newGrid, size),
        boardSize: size,
        grid: newGrid,
      });
    },
    setSpeed: (speed: number) => {
      set({ speed });
    },
    toggleCell: (row: number, col: number) => {
      const { boardSize, grid } = get();
      const newGrid = grid.map((row) => [...row]);
      newGrid[row][col] = !newGrid[row][col];
      set({
        activeCells: initializeActiveCells(newGrid, boardSize),
        grid: newGrid,
      });
    },
    toggleRunning: () => {
      const { boardSize, isRunning } = get();
      if (isRunning) {
        set({ isRunning: false });
      } else {
        const newGrid = createRandomGrid(boardSize);
        set({
          activeCells: initializeActiveCells(newGrid, boardSize),
          grid: newGrid,
          isRunning: true,
        });
      }
    },
  },
  activeCells: new Set<string>(),
  boardSize: 20,
  grid: createInitialGrid(20),
  isRunning: false,
  speed: 10, // 1-10 scale, where 10 is fastest
}));

const Board = () => {
  const grid = useGameStore((state) => state.grid);

  return (
    <View flex={1}>
      {grid.map((row, index) => (
        <View flexDirection="row" key={index}>
          {row.map((_, index_) => (
            <Cell
              colIndex={index_}
              isAlive={grid[index][index_]}
              key={`${index}-${index_}`}
              rowIndex={index}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

type CellProperties = {
  readonly colIndex: number;
  readonly isAlive: boolean;
  readonly rowIndex: number;
};

// eslint-disable-next-line react/no-multi-comp
const Cell = memo(function CellMemo({ colIndex, isAlive, rowIndex }: CellProperties) {
  const { colors } = useAppTheme();
  const toggleCell = useGameStore((state) => state.actions.toggleCell);

  const handlePress = useCallback(() => {
    toggleCell(rowIndex, colIndex);
  }, [toggleCell, rowIndex, colIndex]);

  return (
    <Pressable onPress={handlePress} style={{ aspectRatio: 1, flex: 1 }}>
      <View
        backgroundColor={isAlive ? colors.foreground : colors.transparent}
        borderColor={colors.border}
        borderWidth={1}
        flex={1}
      />
    </Pressable>
  );
});

// eslint-disable-next-line react/no-multi-comp
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
    return () => {
      clearInterval(interval);
    };
  }, [isRunning, actions.nextGeneration, speed]);

  return (
    <Screen>
      <View flexDirection="row" gap={spacing.$4} justifyContent="center">
        <Button
          onPress={actions.toggleRunning}
          title={isRunning ? 'Stop' : 'Start'}
          variant={isRunning ? 'destructive' : 'primary'}
        />
        <Button onPress={actions.clearGrid} title="Clear" variant="outline" />
        <Button onPress={actions.randomizeGrid} title="Random" variant="outline" />
        <Button onPress={actions.nextGeneration} title="Next" variant="outline" />
      </View>
      <Text title={`Board Size: ${boardSize}`} />
      <Slider max={50} min={10} onChange={actions.setBoardSize} step={1} value={boardSize} />
      <Text title={`Speed: ${speed}`} />
      <Slider max={10} min={1} onChange={actions.setSpeed} step={1} value={speed} />
      <Board />
    </Screen>
  );
};

export default GameOfLife;
