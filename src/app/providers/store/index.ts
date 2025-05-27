import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import gameReducer from '@/features/game-board/model/gameSlice';
import authReducer from '@/features/auth/model/authSlice';
import historyReducer from '@/features/game-history/model/historySlice';
import { GameState } from '@/features/game-board/model/types';
import { HistoryState } from '@/features/game-board/model/types';
import { AuthState } from '@/features/auth/model/types';

export interface RootState {
  game: ReturnType<typeof gameReducer>;
  auth: ReturnType<typeof authReducer>;
  history: ReturnType<typeof historyReducer>;
}

const store = configureStore({
  reducer: {
    game: gameReducer,
    auth: authReducer,
    history: historyReducer
  }
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store; 