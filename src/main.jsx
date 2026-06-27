import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';       // Initialize i18next before rendering
import './index.css';  // Tailwind + global styles
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
