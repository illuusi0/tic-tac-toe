import React from 'react';
import { Container } from '@mui/material';
import HistoryList from '@/features/game-history/ui/HistoryList/HistoryList';

const HistoryPage: React.FC = () => {
  return (
    <Container>
      <HistoryList />
    </Container>
  );
};

export default HistoryPage; 