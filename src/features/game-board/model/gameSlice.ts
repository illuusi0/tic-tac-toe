import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GameState,
  MovePayload,
  CellValue,
  GameMove,
  NewGamePayload,
  Position,
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
  winningLine: null,
};

const checkWinner = (
  grid: CellValue[][],
  lastRow: number,
  lastCol: number
): Position[] | null => {
  const player = grid[lastRow][lastCol];
  if (!player) return null;

  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  const winLength = 5; // Assuming 5 in a row to win

  for (const [dx, dy] of directions) {
    const line: Position[] = [];
    let count = 0;

    // Check in one direction
    for (let i = -winLength + 1; i < winLength; i++) {
      const r = lastRow + dx * i;
      const c = lastCol + dy * i;

      if (
        r >= 0 &&
        r < grid.length &&
        c >= 0 &&
        c < grid[0].length &&
        grid[r][c] === player
      ) {
        line.push({ row: r, col: c });
        count++;
      } else {
        // Reset line and count if the sequence is broken
        // This logic needs to be adjusted to find a continuous line of winLength
        // A better approach is to check from the last move outwards in each direction
        // Let's refactor this part.
        line.length = 0; // Clear the current line
        count = 0;
      }

       if (count >= winLength) {
         return line.slice(line.length - winLength); // Return the winning segment
       }
    }

     // The previous logic for checking in both directions and counting was flawed.
     // Let's re-implement based on checking outwards from the last move.

     let currentLine: Position[] = [];
     // Check backwards from the last move
     for(let i = 0; i < winLength; i++){
       const r = lastRow - dx * i;
       const c = lastCol - dy * i;
       if(
         r >= 0 && r < grid.length &&
         c >= 0 && c < grid[0].length &&
         grid[r][c] === player
       ) {
         currentLine.unshift({ row: r, col: c }); // Add to the beginning
       } else {
         break;
       }
     }

     // Check forwards from the last move (excluding the last move itself as it's already added)
     for(let i = 1; i < winLength; i++){
        const r = lastRow + dx * i;
        const c = lastCol + dy * i;
        if(
          r >= 0 && r < grid.length &&
          c >= 0 && c < grid[0].length &&
          grid[r][c] === player
        ) {
          currentLine.push({ row: r, col: c }); // Add to the end
        } else {
          break;
        }
     }

     if(currentLine.length >= winLength) {
       return currentLine; // Found a winning line
     }
  }

  return null; // No winner found
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
      state.winningLine = null; // Reset winning line on new game
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

        const winningLine = checkWinner(state.grid, row, col);
        if (winningLine) {
          state.winner = state.currentPlayer;
          state.isGameOver = true;
          state.winningLine = winningLine; // Store the winning line
        } else {
             state.isGameOver =
               state.grid.every((row) => row.every((cell) => cell !== null));
        }

        if (!state.isGameOver) {
             state.currentPlayer = state.currentPlayer === "X" ? "O" : "X";
        }

      }
    },
    resetGame: (state) => {
      state.grid = createEmptyGrid(state.gridSize);
      state.currentPlayer = "X";
      state.winner = null;
      state.isGameOver = false;
      state.moves = [];
      state.winningLine = null; // Reset winning line on reset
    },
  },
});

export const { makeMove, resetGame, startNewGame } = gameSlice.actions;
export default gameSlice.reducer;
