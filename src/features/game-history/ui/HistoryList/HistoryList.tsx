import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '@/app/providers/store';
import { clearHistory } from '../../model/historySlice';
import { getLocalHistory } from '@/shared/lib/storage';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Paper,
  Button,
  DialogActions,
  IconButton,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface SimpleGameHistory {
  id: string;
  playerX: string;
  playerO: string;
  date: number;
  winner: 'X' | 'O' | 'draw';
  finalGrid: Array<Array<'X' | 'O' | null>>;
  gridSize: number;
}

const HistoryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedGame, setSelectedGame] = useState<SimpleGameHistory | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [localGames, setLocalGames] = useState<SimpleGameHistory[]>([]);

  useEffect(() => {
    try {
      const history = getLocalHistory();
      setLocalGames(history);
    } catch (error) {
      console.error('Error loading local history:', error);
      setLocalGames([]);
    }
  }, []);

  const handleGameClick = (game: SimpleGameHistory) => {
    setSelectedGame(game);
  };

  const handleCloseDialog = () => {
    setSelectedGame(null);
  };

  const handleClearHistory = () => {
    setShowClearConfirm(true);
  };

  const handleConfirmClear = () => {
    dispatch(clearHistory());
    localStorage.removeItem('localHistory');
    setLocalGames([]);
    setShowClearConfirm(false);
  };

  const handleCancelClear = () => {
    setShowClearConfirm(false);
  };

  const renderGameBoard = (game: SimpleGameHistory) => {
    return (
      <Grid container spacing={1} justifyContent="center">
        {game.finalGrid.map((row, rowIndex) => (
          <Grid container item key={rowIndex} spacing={1} justifyContent="center">
            {row.map((cell, colIndex) => (
              <Grid item key={`${rowIndex}-${colIndex}`}>
                <Paper
                  elevation={3}
                  sx={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body1">{cell}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h2">
            История игр
          </Typography>
          {localGames.length > 0 && (
            <Tooltip title="Очистить историю">
              <IconButton onClick={handleClearHistory} color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <List>
          {localGames.length > 0 ? (
            localGames.map((game) => (
              <ListItem 
                key={game.id}
                button
                onClick={() => handleGameClick(game)}
                sx={{ 
                  border: 1, 
                  borderColor: 'divider', 
                  borderRadius: 1,
                  mb: 1 
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="h6">
                      {game.playerX} vs {game.playerO}
                    </Typography>
                  }
                  secondary={
                    <Box component="div">
                      <Typography variant="body2" component="div" color="text.secondary">
                        Дата: {new Date(game.date).toLocaleString()}
                      </Typography>
                      <Typography variant="body2" component="div" color="text.secondary">
                        {game.winner === 'draw' 
                          ? 'Ничья'
                          : `Победитель: ${game.winner === 'X' ? game.playerX : game.playerO}`}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary" align="center">
              История игр пуста
            </Typography>
          )}
        </List>
      </Box>

      {/* Диалог подтверждения очистки истории */}
      <Dialog
        open={showClearConfirm}
        onClose={handleCancelClear}
      >
        <DialogTitle>
          Подтверждение
        </DialogTitle>
        <DialogContent>
          <Typography>
            Вы уверены, что хотите очистить всю историю игр?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClear}>
            Отмена
          </Button>
          <Button onClick={handleConfirmClear} color="error">
            Очистить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог просмотра игры */}
      <Dialog 
        open={!!selectedGame} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedGame && (
          <>
            <DialogTitle>
              Детали игры
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {selectedGame.playerX} (X) vs {selectedGame.playerO} (O)
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Дата: {new Date(selectedGame.date).toLocaleString()}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedGame.winner === 'draw'
                    ? 'Ничья'
                    : `Победитель: ${selectedGame.winner === 'X' ? selectedGame.playerX : selectedGame.playerO}`}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Размер поля: {selectedGame.gridSize}x{selectedGame.gridSize}
                </Typography>
              </Box>
              <Box sx={{ overflowX: 'auto' }}>
                {renderGameBoard(selectedGame)}
              </Box>
              <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Button onClick={handleCloseDialog}>
                  Закрыть
                </Button>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default HistoryList;