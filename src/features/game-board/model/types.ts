export type Player = 'X' | 'O';
export type CellValue = 'X' | 'O' | null;

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
  winner: CellValue;
  isGameOver: boolean;
  moves: GameMove[];
  gridSize: number;
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
  winner: CellValue;
  moves: GameMove[];
  finalGrid: CellValue[][];
  gridSize: number;
}

export interface HistoryState {
  games: GameHistory[];
}

export interface NewGamePayload {
  gridSize: number;
}