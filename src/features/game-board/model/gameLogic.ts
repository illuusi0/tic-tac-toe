import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkWinner } from '../lib/gameUtils';
import { GameState, Player, CellValue } from './types';

const initialState: GameState = {
  grid: Array(15).fill(null).map(() => Array(15).fill(null)),
  currentPlayer: 'X',
  winner: null,
  moves: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    makeMove: (state, action: PayloadAction<{ row: number; col: number }>) => {
      const { row, col } = action.payload;
      if (state.grid[row][col] || state.winner) return;

      state.grid[row][col] = state.currentPlayer;
      state.moves.push({
        row,
        col,
        player: state.currentPlayer,
        timestamp: new Date().toISOString(),
      });

      if (checkWinner(state.grid, row, col, state.currentPlayer, 5)) {
        state.winner = state.currentPlayer;
      } else if (state.moves.length === state.grid.length ** 2) {
        state.winner = 'draw';
      } else {
        state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
      }
    },
    resetGame: (state) => {
      state.grid = initialState.grid;
      state.currentPlayer = initialState.currentPlayer;
      state.winner = initialState.winner;
      state.moves = initialState.moves;
    },
  },
});

export const { makeMove, resetGame } = gameSlice.actions;
export default gameSlice.reducer;