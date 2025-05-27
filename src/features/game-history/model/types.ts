import { Player } from '@/features/game-board/model/types';

export interface GameHistory {
  id: string;
  playerX: string;
  playerO: string;
  date: string;
  winner: Player | 'draw';
  movesCount: number;
}