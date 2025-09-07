import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PlayingCardsHooks } from '@/playing-cards/context/playing-cards-context';
import { LAYOUT_CONSTANTS } from '@/solitaire/context/constants';
import { OSolitaireFoundationStack, OSolitaireTableauStack } from '@/solitaire/context/types';
import type { Immutable } from '@/utils';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useEffect, useState, type ComponentProps } from 'react';
import { SolitaireHooks } from '../context/solitaire-context';
import { DiscardPile } from './DiscardPile';
import { DrawPile } from './DrawPile';
import { FoundationPile } from './FoundationPile';
import { TableauPile } from './TableauPile';

export type SolitaireCanvasProps = Immutable<{}> & ComponentProps<'div'>;
export function SolitaireCanvas({}: SolitaireCanvasProps) {
  const { canvasRef, isCanvasAvailable } = PlayingCardsHooks.useCanvas();
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
    <>
      <Dialog open={showingGameOverScreen} onOpenChange={(open) => !open && setShowingGameOverScreen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Game Over!</DialogTitle>
            <DialogDescription>You have completed this Solitaire game.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div id="solitaire-cavas" ref={canvasRef} className="relative">
        {isCanvasAvailable && (
          <>
            <DrawPile id="stock-pile" position={{ x: 20, y: 20 }} />
            <DiscardPile id="talon-pile" position={{ x: 140, y: 20 }} />
            <FoundationPile id="foundation-pile-1" foundationId={OSolitaireFoundationStack.Foundation1} position={{ x: 340, y: 20 }} />
            <FoundationPile id="foundation-pile-2" foundationId={OSolitaireFoundationStack.Foundation2} position={{ x: 460, y: 20 }} />
            <FoundationPile id="foundation-pile-3" foundationId={OSolitaireFoundationStack.Foundation3} position={{ x: 580, y: 20 }} />
            <FoundationPile id="foundation-pile-4" foundationId={OSolitaireFoundationStack.Foundation4} position={{ x: 700, y: 20 }} />
            <TableauPile
              id="tableau-pile-1"
              tableauId={OSolitaireTableauStack.Tableau1}
              position={{ x: 20, y: LAYOUT_CONSTANTS.TABLEAU_STACKS_Y }}
            />
            <TableauPile
              id="tableau-pile-2"
              tableauId={OSolitaireTableauStack.Tableau2}
              position={{ x: 130, y: LAYOUT_CONSTANTS.TABLEAU_STACKS_Y }}
            />
            <TableauPile
              id="tableau-pile-3"
              tableauId={OSolitaireTableauStack.Tableau3}
              position={{ x: 240, y: LAYOUT_CONSTANTS.TABLEAU_STACKS_Y }}
            />
            <TableauPile
              id="tableau-pile-4"
              tableauId={OSolitaireTableauStack.Tableau4}
              position={{ x: 350, y: LAYOUT_CONSTANTS.TABLEAU_STACKS_Y }}
            />
            <TableauPile
              id="tableau-pile-5"
              tableauId={OSolitaireTableauStack.Tableau5}
              position={{ x: 460, y: LAYOUT_CONSTANTS.TABLEAU_STACKS_Y }}
            />
            <TableauPile
              id="tableau-pile-6"
              tableauId={OSolitaireTableauStack.Tableau6}
              position={{ x: 580, y: LAYOUT_CONSTANTS.TABLEAU_STACKS_Y }}
            />
            <TableauPile
              id="tableau-pile-7"
              tableauId={OSolitaireTableauStack.Tableau7}
              position={{ x: 700, y: LAYOUT_CONSTANTS.TABLEAU_STACKS_Y }}
            />
          </>
        )}
      </div>
    </>
  );
}
