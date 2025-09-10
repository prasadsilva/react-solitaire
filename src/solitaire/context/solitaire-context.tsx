import React, { createContext, useContext, useEffect } from 'react';
import { PlayingCardsContext } from '../../playing-cards/context/playing-cards-context';
import { SolitaireContextData } from './solitaire-context-data';

export function createNewSolitaireContextValue() {
  return new SolitaireContextData();
}

export function getSavedOrCreateNewSolitaireContextValue() {
  // TODO: Check localStorage
  return createNewSolitaireContextValue();
}

export const _SolitaireContextImpl = createContext<InstanceType<typeof SolitaireContextData> | null>(null);

export function SolitaireContext({ children, value }: React.ProviderProps<SolitaireContextData>) {
  const playingCardsContext = useContext(PlayingCardsContext);
  if (!playingCardsContext) {
    throw new Error('SolitaireContext must be used within a PlayingCardsContext');
  }

  useEffect(() => {
    playingCardsContext.addChangeListener(value);
    return () => playingCardsContext.removeChangeListener(value);
  }, [value]);

  return <_SolitaireContextImpl.Provider value={value}>{children}</_SolitaireContextImpl.Provider>;
}
