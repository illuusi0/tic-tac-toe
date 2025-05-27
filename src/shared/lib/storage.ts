interface SimpleGameHistory {
  id: string;
  playerX: string;
  playerO: string;
  date: number;
  winner: 'X' | 'O' | 'draw';
  finalGrid: Array<Array<'X' | 'O' | null>>;
  gridSize: number;
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
  winner: 'X' | 'O' | 'draw',
  grid: Array<Array<'X' | 'O' | null>>,
  gridSize: number
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
    gridSize
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