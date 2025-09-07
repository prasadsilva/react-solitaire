import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { SolitaireHooks } from '../context/solitaire-context';

function GameOverPopup() {
  const { gameOver } = SolitaireHooks.useGameState();

  const [showGameOverScreen, setShowGameOverScreen] = useState(false);
  const [showingGameOverScreen, setShowingGameOverScreen] = useState(false);
  useEffect(() => {
    if (!showGameOverScreen && gameOver) {
      setShowGameOverScreen(true);
    }
  }, [gameOver]);
  useEffect(() => {
    if (showGameOverScreen) {
      setShowingGameOverScreen(true);
    }
  }, [showGameOverScreen]);

  return (
    <Dialog open={showingGameOverScreen} onOpenChange={(open) => !open && setShowingGameOverScreen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game Over!</DialogTitle>
          <DialogDescription>You have completed this Solitaire game.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default GameOverPopup;
