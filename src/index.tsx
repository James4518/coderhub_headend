import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { AuthProvider, theme, UserProvider } from './context';
import store from './store';
import './assets/css/index';
import ModelLogin from './compoments/model-login';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <AuthProvider>
          <HashRouter>
            <App />
            <ModelLogin />
          </HashRouter>
        </AuthProvider>
      </UserProvider>
    </ThemeProvider>
  </Provider>
);
