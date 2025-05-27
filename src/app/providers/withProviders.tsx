import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { store } from './store';
import { theme } from './theme';

export const withProviders = (component: () => React.ReactNode) => () => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component()}
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);