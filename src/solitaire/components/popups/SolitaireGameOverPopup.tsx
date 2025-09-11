import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SolitaireHooks } from '@/solitaire/context/solitaire-hooks';
import { useEffect, useState } from 'react';

function SolitaireGameOverPopup() {
  const { gameOver } = SolitaireHooks.useGameState();

  const [showGameOverScreen, setShowGameOverScreen] = useState(gameOver);
  const [showingGameOverScreen, setShowingGameOverScreen] = useState(false);
  useEffect(() => {
    setShowGameOverScreen(gameOver);
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

export default SolitaireGameOverPopup;
