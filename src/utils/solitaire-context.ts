import type { PlayingCardDescriptor } from '@/data/types';
import { createContext, useCallback, useContext, useMemo } from 'react';
import { generateNewSolitaireDeck } from './deck-builder';

class SolitaireData {
  private drawPile: PlayingCardDescriptor[];
  private discardPile: PlayingCardDescriptor[];

  public constructor() {
    this.drawPile = generateNewSolitaireDeck();
    this.discardPile = [];
  }

  public getDrawPile() {
    return this.drawPile;
  }

  public getDiscardPile() {
    return this.discardPile;
  }
}

export const createNewSolitaireContextValue = () => new SolitaireData();
export const SolitaireContext = createContext<InstanceType<typeof SolitaireData> | null>(null);

function useDrawPile() {
  const context = useContext(SolitaireContext);
  if (!context) {
    throw new Error('useDrawPile must be used within a SolitaireContext');
  }
  const drawPileCount = useMemo(() => context.getDrawPile().length, [context.getDrawPile()]);

  const doDrawCards = useCallback(() => {
    console.log('TODO - drawCards called');
  }, []);

  return {
    drawPileCount,
    doDrawCards,
  };
}

function useDiscardPile() {
  const context = useContext(SolitaireContext);
  if (!context) {
    throw new Error('useDiscardPile must be used within a SolitaireContext');
  }
  const discardPileCount = useMemo(() => context.getDiscardPile().length, [context.getDiscardPile()]);
  const topCard = useMemo(
    () => (context.getDiscardPile().length > 0 ? context.getDiscardPile()[context.getDiscardPile().length - 1] : null),
    [context.getDiscardPile()],
  );

  return {
    discardPileCount,
    topCard,
  };
}

export const SolitaireContextHooks = {
  useDrawPile,
  useDiscardPile,
};
