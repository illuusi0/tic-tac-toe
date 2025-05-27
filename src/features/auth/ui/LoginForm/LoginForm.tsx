import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useAppDispatch } from '@/app/providers/store';
import { setPlayers } from '../../model/authSlice';

const LoginForm: React.FC = () => {
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [gridSize, setGridSize] = useState('7');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerX.trim() && playerO.trim() && Number(gridSize) > 4) {
      dispatch(setPlayers({ playerX, playerO }));
      navigate('/game', { state: { gridSize: Number(gridSize) } });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Добро пожаловать в Крестики-нолики
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="playerX"
            label="Имя игрока X"
            name="playerX"
            autoFocus
            value={playerX}
            onChange={(e) => setPlayerX(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="playerO"
            label="Имя игрока O"
            name="playerO"
            value={playerO}
            onChange={(e) => setPlayerO(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="gridSize"
            label="Размер поля"
            name="gridSize"
            type="number"
            inputProps={{ min: 5 }}
            value={gridSize}
            onChange={(e) => setGridSize(e.target.value)}
            helperText="Минимальный размер поля: 5x5"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!playerX.trim() || !playerO.trim() || Number(gridSize) < 5}
          >
            Начать игру
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;