import { CellValue, Position, WinnerType, GameMove } from '@/features/game-board/model/types';

interface SimpleGameHistory {
  id: string;
  playerX: string;
  playerO: string;
  date: number;
  winner: WinnerType;
  finalGrid: CellValue[][];
  gridSize: number;
  winningLine: Position[] | null;
  moves: GameMove[];
}

export const saveGameToStorage = (game: any) => {
  const history = localStorage.getItem('ticTacToeHistory');
  const games = history ? JSON.parse(history) : [];
  games.push(game);
  localStorage.setItem('ticTacToeHistory', JSON.stringify(games));
};

export const saveGameResult = (
  playerX: string, 
  playerO: string, 
  winner: WinnerType,
  grid: CellValue[][],
  gridSize: number,
  moves: GameMove[],
  winningLine: Position[] | null
) => {
  const localHistory = localStorage.getItem('localHistory');
  const history: SimpleGameHistory[] = localHistory ? JSON.parse(localHistory) : [];
  
  const gameResult: SimpleGameHistory = {
    id: Date.now().toString(),
    playerX,
    playerO,
    date: Date.now(),
    winner,
    finalGrid: grid,
    gridSize,
    moves,
    winningLine
  };

  history.push(gameResult);
  localStorage.setItem('localHistory', JSON.stringify(history));
};

export const getLocalHistory = (): SimpleGameHistory[] => {
  const localHistory = localStorage.getItem('localHistory');
  return localHistory ? JSON.parse(localHistory) : [];
};

export const loadGamesFromStorage = (): any[] => {
  const history = localStorage.getItem('ticTacToeHistory');
  return history ? JSON.parse(history) : [];
};