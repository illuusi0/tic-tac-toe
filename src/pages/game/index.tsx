import React from 'react';
import { Container } from '@mui/material';
import GameBoard from '@/features/game-board/ui/GameBoard/GameBoard';

const GamePage: React.FC = () => {
  return (
    <Container>
      <GameBoard />
    </Container>
  );
};

export default GamePage; 