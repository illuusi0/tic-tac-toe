import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameHistory, HistoryState } from '@/features/game-board/model/types';

const STORAGE_KEY = 'localHistory';

// Загрузка истории из localStorage
const loadHistoryFromStorage = (): GameHistory[] => {
  try {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    const parsedHistory = savedHistory ? JSON.parse(savedHistory) : [];
    return parsedHistory;
  } catch (error) {
    console.error('Error loading history from localStorage:', error);
    return [];
  }
};

const initialState: HistoryState = {
  games: loadHistoryFromStorage()
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addGameToHistory: (state, action: PayloadAction<GameHistory>) => {
      state.games.unshift(action.payload);
      // Сохраняем в localStorage
      try {
        const historyToSave = JSON.stringify(state.games);
        localStorage.setItem(STORAGE_KEY, historyToSave);
      } catch (error) {
        console.error('Error saving history to localStorage:', error);
      }
    },
    clearHistory: (state) => {
      state.games = [];
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error('Error clearing history from localStorage:', error);
      }
    }
  }
});

export const { addGameToHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer; 