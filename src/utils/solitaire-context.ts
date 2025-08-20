import type { PlayingCardDescriptor } from '@/data/types';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { generateNewSolitaireDeck } from './deck-builder';

type SolitaireContextChangeListener = (modelChanged: boolean) => void;

class SolitaireData {
  private drawPile: PlayingCardDescriptor[];
  private discardPile: PlayingCardDescriptor[];
  private changeListeners: Set<SolitaireContextChangeListener>;

  public constructor() {
    this.drawPile = generateNewSolitaireDeck();
    this.discardPile = [];
    this.changeListeners = new Set();
  }

  public getDrawPile() {
    return this.drawPile;
  }

  public getDiscardPile() {
    return this.discardPile;
  }

  drawCards() {
    if (this.drawPile.length > 0) {
      const drawnCards = this.drawPile.slice(0, 3);
      this.drawPile = this.drawPile.slice(3);
      this.discardPile = [...this.discardPile, ...drawnCards];
      console.log(`draw pile count: ${this.drawPile.length}`);
      console.log(`discard pile count: ${this.discardPile.length}`);
      this.notifyContextStateChange(true);
    } else {
      this.notifyContextStateChange(false);
    }
  }

  resetDrawPile() {
    if (this.drawPile.length === 0 && this.discardPile.length > 0) {
      this.drawPile = this.discardPile;
      this.discardPile = [];
      this.notifyContextStateChange(true);
    } else {
      this.notifyContextStateChange(false);
    }
  }

  public addChangeListener(callback: SolitaireContextChangeListener) {
    this.changeListeners.add(callback);
  }
  public removeChangeListener(callback: SolitaireContextChangeListener) {
    this.changeListeners.delete(callback);
  }
  private notifyContextStateChange(modelChanged: boolean) {
    this.changeListeners.forEach((callback) => callback(modelChanged));
  }
}

export const createNewSolitaireContextValue = () => new SolitaireData();
export const SolitaireContext = createContext<InstanceType<typeof SolitaireData> | null>(null);

function useDrawPile() {
  const context = useContext(SolitaireContext);
  if (!context) {
    throw new Error('useDrawPile must be used within a SolitaireContext');
  }
  const [drawPile, setDrawPile] = useState(context.getDrawPile());
  const drawPileCount = useMemo(() => drawPile.length, [drawPile]);

  const handleContextChange = useCallback(
    (modelChanged: boolean) => {
      if (modelChanged) {
        setDrawPile(context.getDrawPile());
      } else {
        // We are here because of an aborted action. Reset the state to cause a re-render
        setDrawPile([...context.getDrawPile()]);
      }
    },
    [context],
  );

  useEffect(() => {
    context.addChangeListener(handleContextChange);
    return () => context.removeChangeListener(handleContextChange);
  }, [context]);

  const doDrawCards = useCallback(() => {
    context.drawCards();
  }, [context]);

  const doResetDrawPile = useCallback(() => {
    context.resetDrawPile();
  }, [context]);

  return {
    drawPileCount,
    doDrawCards,
    doResetDrawPile,
  };
}

function useDiscardPile() {
  const context = useContext(SolitaireContext);
  if (!context) {
    throw new Error('useDiscardPile must be used within a SolitaireContext');
  }
  const [discardPile, setDiscardPile] = useState(context.getDiscardPile());
  const discardPileCount = useMemo(() => discardPile.length, [discardPile]);
  const topCard = useMemo(() => (discardPile.length > 0 ? discardPile[discardPile.length - 1] : null), [discardPile]);
  const nextCard = useMemo(() => (discardPile.length > 1 ? discardPile[discardPile.length - 2] : null), [discardPile]);

  const handleContextChange = useCallback(
    (modelChanged: boolean) => {
      if (modelChanged) {
        setDiscardPile(context.getDiscardPile());
      } else {
        // We are here because of an aborted action. Reset the state to cause a re-render
        setDiscardPile([...context.getDiscardPile()]);
      }
    },
    [context],
  );

  useEffect(() => {
    context.addChangeListener(handleContextChange);
    return () => context.removeChangeListener(handleContextChange);
  }, [context]);

  return {
    discardPileCount,
    topCard,
    nextCard,
  };
}

export const SolitaireContextHooks = {
  useDrawPile,
  useDiscardPile,
};
