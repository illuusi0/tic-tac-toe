import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/providers/store";
import { RootState } from "@/app/providers/store";
import { makeMove, resetGame, startNewGame } from "../../model/gameSlice";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { CellValue } from "../../model/types";
import { saveGameResult } from "@/shared/lib/storage";

const GameBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { grid, currentPlayer, winner, isGameOver, gridSize } =
    useAppSelector((state: RootState) => state.game);
  const { playerX, playerO } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    const size = location.state?.gridSize || 7;
    dispatch(startNewGame({ gridSize: size }));
  }, [dispatch, location.state?.gridSize]);

  useEffect(() => {
    if (isGameOver && winner && playerX && playerO) {
      saveGameResult(playerX, playerO, winner, grid, gridSize);
    }
  }, [isGameOver, winner, playerX, playerO, grid, gridSize]);

  const handleCellClick = (row: number, col: number) => {
    if (!winner && !isGameOver && grid[row][col] === null) {
      dispatch(makeMove({ row, col }));
    }
  };

  const handleReset = () => {
    dispatch(resetGame());
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

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          {winner
            ? `Победитель: ${getWinnerName()}`
            : isGameOver
              ? "Ничья!"
              : `Ходит: ${getCurrentPlayerName()} (${currentPlayer})`}
        </Typography>
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
                      cursor: cellValue ? "default" : "pointer",
                      "&:hover": {
                        backgroundColor: cellValue ? "inherit" : "#f5f5f5",
                      },
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
        <Button variant="contained" onClick={handleReset} sx={{ mt: 2 }}>
          Начать заново
        </Button>
      </Box>
    </Container>
  );
};

export default GameBoard;
