import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './css/index.css';
import App from './App';
import { ScrollToTop } from './utils/scroll';
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/vars';
import LoggedInUserProvider from './context/LoggedInUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <ThemeProvider theme={theme}>
        <LoggedInUserProvider>
          <App />
        </LoggedInUserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
