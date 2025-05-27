import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  playerX: string;
  playerO: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  playerX: '',
  playerO: '',
  isAuthenticated: false,
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
    resetAuth: (state) => {
      state.playerX = '';
      state.playerO = '';
      state.isAuthenticated = false;
    },
  },
});

export const { setPlayers, resetAuth } = authSlice.actions;
export default authSlice.reducer;