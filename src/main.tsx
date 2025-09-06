import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import SolitaireGame from './solitaire/components/SolitaireGame.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SolitaireGame />
  </StrictMode>,
);
