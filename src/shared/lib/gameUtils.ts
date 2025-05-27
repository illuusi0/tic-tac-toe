export const checkWinner = (
  grid: any[][],
  row: number,
  col: number,
  player: any,
  winLength: number
): boolean => {
  const directions = [
    [0, 1],
    [1, 0], 
    [1, 1], 
    [1, -1], 
  ];

  return directions.some(([dx, dy]) => {
    let count = 1;

    for (let i = 1; i < winLength; i++) {
      const r = row + i * dx;
      const c = col + i * dy;
      if (
        r >= 0 &&
        r < grid.length &&
        c >= 0 &&
        c < grid[0].length &&
        grid[r][c] === player
      ) {
        count++;
      } else {
        break;
      }
    }

    for (let i = 1; i < winLength; i++) {
      const r = row - i * dx;
      const c = col - i * dy;
      if (
        r >= 0 &&
        r < grid.length &&
        c >= 0 &&
        c < grid[0].length &&
        grid[r][c] === player
      ) {
        count++;
      } else {
        break;
      }
    }

    return count >= winLength;
  });
};