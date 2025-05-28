import { GameHistory, GameMove, CellValue, WinnerType } from '@/features/game-board/model/types';
import { saveGameToStorage } from '@/shared/lib/storage';

export const createGameHistory = (
  playerX: string,
  playerO: string,
  winner: WinnerType,
  moves: GameMove[],
  grid: CellValue[][],
  gridSize: number
): GameHistory => {
  return {
    id: Date.now().toString(),
    playerX,
    playerO,
    date: Date.now(),
    winner,
    moves,
    finalGrid: grid,
    gridSize
  };
};

export const saveGame = (game: GameHistory) => {
  saveGameToStorage(game);
};