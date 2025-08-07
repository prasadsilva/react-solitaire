import { StackablePlayingCardsStack } from '@/components/stackable-playing-card';
import type { Immutable } from '@/lib';
import { PlayingCardsHooks } from '@/utils/game-context';
import { SolitaireContextHooks } from '@/utils/solitaire-context';
import { type ComponentProps } from 'react';
import { DrawPile } from '../DrawPile';
import { PlayingCardsPile } from '../PlayingCardsPile';

export type SolitaireCanvasProps = Immutable<{}> & ComponentProps<'div'>;
export function PlayingCardsCanvas({}: SolitaireCanvasProps) {
  const { canvasRef, isCanvasAvailable } = PlayingCardsHooks.useCanvas();
  const { cardStacks } = PlayingCardsHooks.useModel();

  const { discardPileCount } = SolitaireContextHooks.useDiscardPile();

  return (
    <div ref={canvasRef} className="relative">
      <DrawPile id="draw-pile" position={{ x: 20, y: 20 }} />
      <PlayingCardsPile id="discard-pile" position={{ x: 140, y: 20 }} showingFace count={discardPileCount} />
      <PlayingCardsPile id="build-pile-1" position={{ x: 340, y: 20 }} showingFace count={0} />
      <PlayingCardsPile id="build-pile-2" position={{ x: 460, y: 20 }} showingFace count={0} />
      <PlayingCardsPile id="build-pile-3" position={{ x: 580, y: 20 }} showingFace count={0} />
      <PlayingCardsPile id="build-pile-4" position={{ x: 700, y: 20 }} showingFace count={0} />
      {isCanvasAvailable &&
        cardStacks.map((cardStack, idx) => <StackablePlayingCardsStack key={`card-stack-${idx}`} cardStack={cardStack} stackIndex={idx} />)}
    </div>
  );
}
