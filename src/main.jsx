import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
