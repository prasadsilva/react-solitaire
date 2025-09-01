import { type SolitaireFoundationStack, type SolitaireTableauStack } from '@/data/types';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PlayingCardsContext } from './playing-cards-context';
import { SolitaireContextData } from './solitaire-context-data';

export const createNewSolitaireContextValue = () => new SolitaireContextData();
const SolitaireContextImpl = createContext<InstanceType<typeof SolitaireContextData> | null>(null);

// The reason why we need .tsx extension
export function SolitaireContext({ children, value }: React.ProviderProps<SolitaireContextData>) {
  const playingCardsContext = useContext(PlayingCardsContext);
  if (!playingCardsContext) {
    throw new Error('SolitaireContext must be used within a PlayingCardsContext');
  }

  useEffect(() => {
    playingCardsContext.addChangeListener(value);
    return () => playingCardsContext.removeChangeListener(value);
  }, [value]);

  return <SolitaireContextImpl.Provider value={value}>{children}</SolitaireContextImpl.Provider>;
}

function useStock() {
  const context = useContext(SolitaireContextImpl);
  if (!context) {
    throw new Error('useStock must be used within a SolitaireContext');
  }
  const [stock, setStock] = useState(context.getStock().cards);
  const drawPileCount = useMemo(() => stock.length, [stock]);

  const handleContextChange = useCallback(
    (modelChanged: boolean) => {
      // TODO: It would be better to know if only the data we cared about changed
      if (modelChanged) {
        setStock(context.getStock().cards);
      } else {
        // We are here because of an aborted action. Reset the state to cause a re-render
        setStock([...context.getStock().cards]);
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

function useTalon() {
  const context = useContext(SolitaireContextImpl);
  if (!context) {
    throw new Error('useTalon must be used within a SolitaireContext');
  }
  const talonMeta = useMemo(() => context.getTalon().meta, [context]);
  const [talonCards, setTalonCards] = useState(context.getTalon().cards);
  const talonCount = useMemo(() => talonCards.length, [talonCards]);
  const topCard = useMemo(() => (talonCards.length > 0 ? talonCards[talonCards.length - 1] : null), [talonCards]);
  const nextCard = useMemo(() => (talonCards.length > 1 ? talonCards[talonCards.length - 2] : null), [talonCards]);

  const handleContextChange = useCallback(
    (modelChanged: boolean) => {
      if (modelChanged) {
        setTalonCards(context.getTalon().cards);
      } else {
        // We are here because of an aborted action. Reset the state to cause a re-render
        setTalonCards([...context.getTalon().cards]);
      }
    },
    [context],
  );

  useEffect(() => {
    context.addChangeListener(handleContextChange);
    return () => context.removeChangeListener(handleContextChange);
  }, [context]);

  return {
    talonMeta,
    talonCount,
    topCard,
    nextCard,
  };
}

function useTableau(id: SolitaireTableauStack) {
  const context = useContext(SolitaireContextImpl);
  if (!context) {
    throw new Error('useTableau must be used within a SolitaireContext');
  }
  const tableauMeta = useMemo(() => context.getStack(id).meta, [context]);
  const [tableauCards, setTableauCards] = useState(context.getStack(id).cards);

  const handleContextChange = useCallback(
    (modelChanged: boolean) => {
      if (modelChanged) {
        setTableauCards(context.getStack(id).cards);
      } else {
        // We are here because of an aborted action. Reset the state to cause a re-render
        setTableauCards([...context.getStack(id).cards]);
      }
    },
    [context],
  );

  useEffect(() => {
    context.addChangeListener(handleContextChange);
    return () => context.removeChangeListener(handleContextChange);
  }, [context]);

  return {
    tableauMeta,
    tableauCards,
  };
}

function useFoundation(id: SolitaireFoundationStack) {
  const context = useContext(SolitaireContextImpl);
  if (!context) {
    throw new Error('useFoundationPile must be used within a SolitaireContext');
  }
  const foundationMeta = useMemo(() => context.getStack(id).meta, [context]);
  const [foundationCards, setFoundationCards] = useState(context.getStack(id).cards);
  const foundationCount = useMemo(() => foundationCards.length, [foundationCards]);
  const topCard = useMemo(() => (foundationCards.length > 0 ? foundationCards[foundationCards.length - 1] : null), [foundationCards]);

  const handleContextChange = useCallback(
    (modelChanged: boolean) => {
      if (modelChanged) {
        setFoundationCards(context.getStack(id).cards);
      } else {
        // We are here because of an aborted action. Reset the state to cause a re-render
        setFoundationCards([...context.getStack(id).cards]);
      }
    },
    [context],
  );

  useEffect(() => {
    context.addChangeListener(handleContextChange);
    return () => context.removeChangeListener(handleContextChange);
  }, [context]);

  return {
    foundationMeta,
    foundationCount,
    topCard,
  };
}

export const SolitaireHooks = {
  useStock,
  useTalon,
  useTableau,
  useFoundation,
};
