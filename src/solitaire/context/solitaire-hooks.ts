import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { _SolitaireContextImpl } from './solitaire-context';
import type { SolitaireFoundationStack, SolitaireTableauStack } from './types';

function useGameState() {
  const context = useContext(_SolitaireContextImpl);
  if (!context) {
    throw new Error('useGameState must be used within a SolitaireContext');
  }
  const [gameOver, setGameOver] = useState(context.isGameOver());

  const handleContextChange = useCallback(
    (_modelChanged: boolean) => {
      setGameOver(context.isGameOver());
    },
    [context],
  );

  useEffect(() => {
    context.addChangeListener(handleContextChange);
    setGameOver(context.isGameOver());
    return () => context.removeChangeListener(handleContextChange);
  }, [context]);

  const _debugSetGameOver = useCallback(() => {
    context._debugSetGameOver();
  }, [context]);

  return {
    gameOver,
    _debugSetGameOver,
  };
}

function useElapsedTime() {
  const context = useContext(_SolitaireContextImpl);
  if (!context) {
    throw new Error('useGameState must be used within a SolitaireContext');
  }
  const [elapsedSeconds, setElapsedSeconds] = useState(Math.floor(context.getElapsedTime() / 1000));
  const [intervalId, setIntervalId] = useState(-1);
  const { gameOver } = useGameState();

  useEffect(() => {
    setElapsedSeconds(Math.floor(context.getElapsedTime() / 1000));
    const handle = setInterval(() => {
      setElapsedSeconds(Math.floor(context.getElapsedTime() / 1000));
    }, 1000);
    setIntervalId(handle);

    return () => {
      if (handle != -1) {
        clearInterval(handle);
        if (intervalId === handle) {
          setIntervalId(-1);
        }
      }
    };
  }, [context]);

  useEffect(() => {
    if (gameOver) {
      clearInterval(intervalId);
      setIntervalId(-1);
    }
  }, [gameOver]);

  return {
    elapsedSeconds,
  };
}

function useStock() {
  const context = useContext(_SolitaireContextImpl);
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
    setStock([...context.getStock().cards]);
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
  const context = useContext(_SolitaireContextImpl);
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
      // TODO: It would be better to know if only the data we cared about changed
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
    setTalonCards([...context.getTalon().cards]);
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
  const context = useContext(_SolitaireContextImpl);
  if (!context) {
    throw new Error('useTableau must be used within a SolitaireContext');
  }
  const tableauMeta = useMemo(() => context.getStack(id).meta, [context]);
  const [tableauCards, setTableauCards] = useState(context.getStack(id).cards);

  const handleContextChange = useCallback(
    (modelChanged: boolean) => {
      // TODO: It would be better to know if only the data we cared about changed
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
    setTableauCards([...context.getStack(id).cards]);
    return () => context.removeChangeListener(handleContextChange);
  }, [context]);

  return {
    tableauMeta,
    tableauCards,
  };
}

function useFoundation(id: SolitaireFoundationStack) {
  const context = useContext(_SolitaireContextImpl);
  if (!context) {
    throw new Error('useFoundationPile must be used within a SolitaireContext');
  }
  const foundationMeta = useMemo(() => context.getStack(id).meta, [context]);
  const [foundationCards, setFoundationCards] = useState(context.getStack(id).cards);
  const foundationCount = useMemo(() => foundationCards.length, [foundationCards]);
  const topCard = useMemo(() => (foundationCards.length > 0 ? foundationCards[foundationCards.length - 1] : null), [foundationCards]);
  const nextCard = useMemo(() => (foundationCards.length > 1 ? foundationCards[foundationCards.length - 2] : null), [foundationCards]);

  const handleContextChange = useCallback(
    (modelChanged: boolean) => {
      // TODO: It would be better to know if only the data we cared about changed
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
    setFoundationCards([...context.getStack(id).cards]);
    return () => context.removeChangeListener(handleContextChange);
  }, [context]);

  return {
    foundationMeta,
    foundationCount,
    topCard,
    nextCard,
  };
}

export const SolitaireHooks = {
  useGameState,
  useElapsedTime,
  useStock,
  useTalon,
  useTableau,
  useFoundation,
};
