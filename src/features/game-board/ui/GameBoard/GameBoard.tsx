import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/providers/store";
import { RootState } from "@/app/providers/store";
import { makeMove, resetGame, startNewGame } from "../../model/gameSlice";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
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

  const renderCell = (row: number, col: number) => {
    const value = grid[row][col];
    return (
      <Paper
        elevation={3}
        sx={{
          width: 60,
          height: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: value ? "default" : "pointer",
          "&:hover": {
            backgroundColor: value ? "inherit" : "#f5f5f5",
          },
        }}
        onClick={() => handleCellClick(row, col)}
      >
        <Typography variant="h5">{value}</Typography>
      </Paper>
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
        <Box sx={{ mb: 3, overflowX: "auto" }}>
          <Grid container spacing={1} justifyContent="center">
            {grid.map((row: CellValue[], rowIndex: number) => (
              <Grid
                container
                item
                key={rowIndex}
                spacing={1}
                justifyContent="center"
              >
                {row.map((_: CellValue, colIndex: number) => (
                  <Grid item key={`${rowIndex}-${colIndex}`}>
                    {renderCell(rowIndex, colIndex)}
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        </Box>
        <Button variant="contained" onClick={handleReset} sx={{ mt: 2 }}>
          Начать заново
        </Button>
      </Box>
    </Container>
  );
};

export default GameBoard;
