import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/providers/store';
import { RootState } from '@/app/providers/store';
import { logout } from '@/features/auth/model/authSlice';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, playerX, playerO } = useAppSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Крестики-нолики
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant="body2">
            X: {playerX} | O: {playerO}
          </Typography>
          <Button color="inherit" onClick={() => navigate('/game')}>
            Игра
          </Button>
          <Button color="inherit" onClick={() => navigate('/history')}>
            История
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Выйти
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;