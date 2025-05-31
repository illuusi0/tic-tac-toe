import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/providers/store";
import { RootState } from "@/app/providers/store";
import { makeMove, resetGame, startNewGame } from "../../model/gameSlice";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { CellValue, Position, WinnerType } from "../../model/types";
import { saveGameResult } from "@/shared/lib/storage";

interface GameBoardProps {
  initialGrid?: CellValue[][];
  initialWinner?: WinnerType;
  initialIsGameOver?: boolean;
  initialGridSize?: number;
  initialWinningLine?: Position[] | null;
  isHistorical?: boolean; // Flag to indicate if rendering a historical game
}

const GameBoard: React.FC<GameBoardProps> = ({ 
  initialGrid,
  initialWinner,
  initialIsGameOver,
  initialGridSize,
  initialWinningLine,
  isHistorical = false,
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  // Use props if provided, otherwise use Redux state
  const { 
    grid: currentGrid,
    currentPlayer,
    winner: currentWinner,
    isGameOver: currentIsGameOver,
    gridSize: currentGridSize,
    winningLine: currentWinningLine
  } = useAppSelector((state: RootState) => state.game);
  const { playerX, playerO } = useAppSelector((state: RootState) => state.auth);

  const grid = isHistorical ? initialGrid! : currentGrid;
  const winner = isHistorical ? initialWinner : currentWinner;
  const isGameOver = isHistorical ? initialIsGameOver! : currentIsGameOver;
  const gridSize = isHistorical ? initialGridSize! : currentGridSize;
  const winningLine = isHistorical ? initialWinningLine : currentWinningLine;


  useEffect(() => {
    if (!isHistorical) {
      const size = location.state?.gridSize || 7;
      dispatch(startNewGame({ gridSize: size }));
    }
  }, [dispatch, location.state?.gridSize, isHistorical]);

  useEffect(() => {
    if (!isHistorical && isGameOver && winner && playerX && playerO) {
      saveGameResult(playerX, playerO, winner, currentGrid, currentGridSize, [], null);
    }
  }, [isGameOver, winner, playerX, playerO, currentGrid, currentGridSize, isHistorical]);

  const handleCellClick = (row: number, col: number) => {
    if (!isHistorical && !isGameOver && grid[row][col] === null) {
      dispatch(makeMove({ row, col }));
    }
  };

  const handleReset = () => {
    if (!isHistorical) {
       dispatch(resetGame());
    }
  };

  const getCurrentPlayerName = () => {
    return currentPlayer === "X" ? playerX : playerO;
  };

  const getWinnerName = () => {
    if (!winner) return null;
    return winner === "X" ? playerX : playerO;
  };

  const renderCellContent = (value: CellValue) => {
    return (
        <Typography variant="h5" sx={{ margin: 0, padding: 0 }}>{value}</Typography>
    );
  };

  const isWinningCell = (row: number, col: number): boolean => {
    if (!winningLine) return false;
    return winningLine.some(cell => cell.row === row && cell.col === col);
  };

  // Don't render the board if grid is not available (e.g., initial load)
  if (!grid) return null;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, textAlign: "center" }}>
        {!isHistorical && ( // Only show game status for current game
          <Typography variant="h4" gutterBottom>
            {winner
              ? `Победитель: ${getWinnerName()}`
              : isGameOver
                ? "Ничья!"
                : `Ходит: ${getCurrentPlayerName()} (${currentPlayer})`}
          </Typography>
        )}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: '500px', aspectRatio: '1 / 1', display: 'flex', flexDirection: 'column' }}>
            {grid.map((row: CellValue[], rowIndex: number) => (
              <Box key={rowIndex} sx={{ display: 'flex', height: `${100 / gridSize}%` }}>
                {row.map((cellValue: CellValue, colIndex: number) => (
                  <Box
                    key={`${rowIndex}-${colIndex}`}
                    sx={{
                      width: `${100 / gridSize}%`,
                      height: '100%',
                      border: '1px solid #ccc', // Add border for visibility
                      boxSizing: 'border-box', // Include border in element's total width and height
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: !isHistorical && (!isGameOver && cellValue === null) ? "pointer" : "default",
                      "&:hover": {
                        backgroundColor: !isHistorical && (!isGameOver && cellValue === null) ? "#f5f5f5" : "inherit",
                      },
                      backgroundColor: isWinningCell(rowIndex, colIndex) ? 'lightgreen' : 'transparent',
                    }}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    <Paper elevation={3} sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
                       {renderCellContent(cellValue)}
                    </Paper>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
        {!isHistorical && ( // Only show reset button for current game
          <Button variant="contained" onClick={handleReset} sx={{ mt: 2 }}>
            Начать заново
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default GameBoard;
