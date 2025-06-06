export type Player = 'X' | 'O';
export type CellValue = 'X' | 'O' | null;
export type WinnerType = CellValue | 'draw';

export interface Position {
  row: number;
  col: number;
}

export interface GameMove {
  player: 'X' | 'O';
  position: Position;
  timestamp: number;
}

export interface GameState {
  grid: CellValue[][];
  currentPlayer: 'X' | 'O';
  winner: WinnerType;
  isGameOver: boolean;
  moves: GameMove[];
  gridSize: number;
  winningLine: Position[] | null;
}

export interface MovePayload {
  row: number;
  col: number;
}

export interface GameHistory {
  id: string;
  date: number;
  playerX: string;
  playerO: string;
  winner: WinnerType;
  moves: GameMove[];
  finalGrid: CellValue[][];
  gridSize: number;
  winningLine?: Position[] | null;
}

export interface HistoryState {
  games: GameHistory[];
}

export interface NewGamePayload {
  gridSize: number;
}