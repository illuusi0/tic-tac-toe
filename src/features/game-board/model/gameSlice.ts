import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GameState,
  MovePayload,
  CellValue,
  GameMove,
  NewGamePayload,
} from "./types";

const createEmptyGrid = (size: number): CellValue[][] =>
  Array(size)
    .fill(null)
    .map(() => Array(size).fill(null));

const initialState: GameState = {
  grid: createEmptyGrid(7), 
  currentPlayer: "X",
  winner: null,
  isGameOver: false,
  moves: [],
  gridSize: 7,
};

const checkWinner = (
  grid: CellValue[][],
  lastRow: number,
  lastCol: number
): CellValue => {
  const player = grid[lastRow][lastCol];
  if (!player) return null;

  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (const [dx, dy] of directions) {
    let count = 1;

    for (let i = 1; i < 5; i++) {
      const newRow = lastRow + dx * i;
      const newCol = lastCol + dy * i;
      if (
        newRow < 0 ||
        newRow >= grid.length ||
        newCol < 0 ||
        newCol >= grid[0].length ||
        grid[newRow][newCol] !== player
      ) {
        break;
      }
      count++;
    }

    for (let i = 1; i < 5; i++) {
      const newRow = lastRow - dx * i;
      const newCol = lastCol - dy * i;
      if (
        newRow < 0 ||
        newRow >= grid.length ||
        newCol < 0 ||
        newCol >= grid[0].length ||
        grid[newRow][newCol] !== player
      ) {
        break;
      }
      count++;
    }

    if (count >= 5) {
      return player;
    }
  }

  return null;
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startNewGame: (state, action: PayloadAction<NewGamePayload>) => {
      state.grid = createEmptyGrid(action.payload.gridSize);
      state.currentPlayer = "X";
      state.winner = null;
      state.isGameOver = false;
      state.moves = [];
      state.gridSize = action.payload.gridSize;
    },
    makeMove: (state, action: PayloadAction<MovePayload>) => {
      const { row, col } = action.payload;

      if (state.grid[row][col] === null && !state.winner) {
        state.grid[row][col] = state.currentPlayer;

        const move: GameMove = {
          player: state.currentPlayer,
          position: { row, col },
          timestamp: Date.now(),
        };
        state.moves.push(move);

        state.winner = checkWinner(state.grid, row, col);

        state.currentPlayer = state.currentPlayer === "X" ? "O" : "X";

        state.isGameOver =
          state.winner !== null ||
          state.grid.every((row) => row.every((cell) => cell !== null));
      }
    },
    resetGame: (state) => {
      state.grid = createEmptyGrid(state.gridSize);
      state.currentPlayer = "X";
      state.winner = null;
      state.isGameOver = false;
      state.moves = [];
    },
  },
});

export const { makeMove, resetGame, startNewGame } = gameSlice.actions;
export default gameSlice.reducer;
