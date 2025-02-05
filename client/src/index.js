import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import './index.css';

// Crie um root
const root = createRoot(document.getElementById('root'));

// Renderize o App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
