import { LAYOUT_CONSTANTS } from '@/data/constants';
import { OSolitaireTableauStack } from '@/data/types';
import type { Immutable } from '@/lib';
import { PlayingCardsHooks } from '@/utils/playing-cards-context';
import { type ComponentProps } from 'react';
import { DiscardPile } from '../DiscardPile';
import { DrawPile } from '../DrawPile';
import { PlayingCardsPile } from '../PlayingCardsPile';
import { TableauPile } from '../TableauPile';

export type SolitaireCanvasProps = Immutable<{}> & ComponentProps<'div'>;
export function SolitaireCanvas({}: SolitaireCanvasProps) {
  const { canvasRef, isCanvasAvailable } = PlayingCardsHooks.useCanvas();

  return (
    <div id="solitaire-cavas" ref={canvasRef} className="relative">
      {isCanvasAvailable && (
        <>
          <DrawPile id="stock-pile" position={{ x: 20, y: 20 }} />
          <DiscardPile id="talon-pile" position={{ x: 140, y: 20 }} />
          <PlayingCardsPile id="foundation-pile-1" position={{ x: 340, y: 20 }} showingFace count={0} />
          <PlayingCardsPile id="foundation-pile-2" position={{ x: 460, y: 20 }} showingFace count={0} />
          <PlayingCardsPile id="foundation-pile-3" position={{ x: 580, y: 20 }} showingFace count={0} />
          <PlayingCardsPile id="foundation-pile-4" position={{ x: 700, y: 20 }} showingFace count={0} />
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
  );
}
