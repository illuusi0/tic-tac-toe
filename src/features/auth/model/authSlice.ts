import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './types';

const initialState: AuthState = {
  isAuthenticated: false,
  playerX: null,
  playerO: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<{ playerX: string; playerO: string }>) => {
      state.playerX = action.payload.playerX;
      state.playerO = action.payload.playerO;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.playerX = null;
      state.playerO = null;
    }
  }
});

export const { setPlayers, logout } = authSlice.actions;
export default authSlice.reducer;