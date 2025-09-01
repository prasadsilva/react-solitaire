import {
  OPlayingCardStackDropBehavior,
  OPlayingCardStackMoveBehavior,
  OSolitaireCardStack,
  OSolitaireFoundationStack,
  OSolitaireTableauStack,
  type PlayingCardDescriptor,
  type PlayingCardStackBehavior,
  type PlayingCardStackData,
  type PlayingCardStackDropBehavior,
  type PlayingCardStackInfo,
  type SolitaireCardStack,
  type SolitaireFoundationStack,
  type SolitaireTableauStack,
} from '@/data/types';
import { objectHasValue } from '@/lib/utils';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { generateNewSolitaireGameData } from './deck-builder';
import { PlayingCardsContext, type PlayingCardsContextListener } from './playing-cards-context';

function isTalonStack(value: string): boolean {
  return value == OSolitaireCardStack.Talon;
}
function isFoundationStack(value: string): boolean {
  return objectHasValue(OSolitaireFoundationStack, value);
}
function isTableauStack(value: string): boolean {
  return objectHasValue(OSolitaireTableauStack, value);
}

type SolitaireContextChangeListener = (modelChanged: boolean) => void;

class SolitaireContextData implements PlayingCardsContextListener {
  private cardStacks: { [key: string]: PlayingCardStackData } = {};
  private changeListeners: Set<SolitaireContextChangeListener>;

  public constructor() {
    this.changeListeners = new Set();

    const newSolitaireGameData = generateNewSolitaireGameData();
    this.registerStack(
      OSolitaireCardStack.Stock,
      OPlayingCardStackMoveBehavior.Immovable,
      OPlayingCardStackDropBehavior.NotAccepting,
      newSolitaireGameData.drawCards,
    );
    this.registerStack(OSolitaireCardStack.Talon, OPlayingCardStackMoveBehavior.MoveOnlyTop, OPlayingCardStackDropBehavior.NotAccepting);
    this.registerStack(OSolitaireCardStack.Foundation1, OPlayingCardStackMoveBehavior.Immovable, OPlayingCardStackDropBehavior.AcceptsAny);
    this.registerStack(OSolitaireCardStack.Foundation2, OPlayingCardStackMoveBehavior.Immovable, OPlayingCardStackDropBehavior.AcceptsAny);
    this.registerStack(OSolitaireCardStack.Foundation3, OPlayingCardStackMoveBehavior.Immovable, OPlayingCardStackDropBehavior.AcceptsAny);
    this.registerStack(OSolitaireCardStack.Foundation4, OPlayingCardStackMoveBehavior.Immovable, OPlayingCardStackDropBehavior.AcceptsAny);
    this.registerStack(
      OSolitaireCardStack.Tableau1,
      OPlayingCardStackMoveBehavior.MoveAllNextSiblings,
      OPlayingCardStackDropBehavior.AcceptsAny,
      newSolitaireGameData.tableauCards[OSolitaireCardStack.Tableau1],
    );
    this.registerStack(
      OSolitaireCardStack.Tableau2,
      OPlayingCardStackMoveBehavior.MoveAllNextSiblings,
      OPlayingCardStackDropBehavior.AcceptsAny,
      newSolitaireGameData.tableauCards[OSolitaireCardStack.Tableau2],
    );
    this.registerStack(
      OSolitaireCardStack.Tableau3,
      OPlayingCardStackMoveBehavior.MoveAllNextSiblings,
      OPlayingCardStackDropBehavior.AcceptsAny,
      newSolitaireGameData.tableauCards[OSolitaireCardStack.Tableau3],
    );
    this.registerStack(
      OSolitaireCardStack.Tableau4,
      OPlayingCardStackMoveBehavior.MoveAllNextSiblings,
      OPlayingCardStackDropBehavior.AcceptsAny,
      newSolitaireGameData.tableauCards[OSolitaireCardStack.Tableau4],
    );
    this.registerStack(
      OSolitaireCardStack.Tableau5,
      OPlayingCardStackMoveBehavior.MoveAllNextSiblings,
      OPlayingCardStackDropBehavior.AcceptsAny,
      newSolitaireGameData.tableauCards[OSolitaireCardStack.Tableau5],
    );
    this.registerStack(
      OSolitaireCardStack.Tableau6,
      OPlayingCardStackMoveBehavior.MoveAllNextSiblings,
      OPlayingCardStackDropBehavior.AcceptsAny,
      newSolitaireGameData.tableauCards[OSolitaireCardStack.Tableau6],
    );
    this.registerStack(
      OSolitaireCardStack.Tableau7,
      OPlayingCardStackMoveBehavior.MoveAllNextSiblings,
      OPlayingCardStackDropBehavior.AcceptsAny,
      newSolitaireGameData.tableauCards[OSolitaireCardStack.Tableau7],
    );
  }

  public onValidDrop(card: PlayingCardStackInfo, slot: PlayingCardStackInfo) {
    console.log(`onValidDrop: ${card.stackId}:${card.cardIndex} -> ${slot && slot.stackId}:${slot && slot.cardIndex}`);
    if (isTableauStack(card.stackId)) {
      if (isTableauStack(slot.stackId)) {
        console.log('tableau -> tableau');
        // TODO
      } else if (isFoundationStack(slot.stackId)) {
        console.log('tableau -> foundation');
        // TODO
      }
    } else if (isTalonStack(card.stackId)) {
      if (isTableauStack(slot.stackId)) {
        console.log('talon -> tableau');
        // TODO
      }
    }
  }
  public onInvalidDrop(card: PlayingCardStackInfo) {
    console.log(`onInvalidDrop: ${card.stackId}:${card.cardIndex}`);
  }

  private registerStack(
    id: SolitaireCardStack,
    moveBehavior: PlayingCardStackBehavior,
    dropBehavior: PlayingCardStackDropBehavior,
    cards: PlayingCardDescriptor[] = [],
  ) {
    this.cardStacks[id] = {
      meta: {
        id,
        moveBehavior,
        dropBehavior,
      },
      cards,
    };
  }

  public getStock() {
    return this.cardStacks[OSolitaireCardStack.Stock];
  }

  public getTalon() {
    return this.cardStacks[OSolitaireCardStack.Talon];
  }

  public getStack(stackId: SolitaireCardStack) {
    return this.cardStacks[stackId];
  }

  drawCards() {
    const stock = this.getStock();
    const talon = this.getTalon();
    if (stock.cards.length > 0) {
      const drawnCards = stock.cards.slice(0, 3);
      stock.cards = stock.cards.slice(3);
      talon.cards = [...talon.cards, ...drawnCards];
      console.log(`stock count: ${stock.cards.length}`);
      console.log(`talon count: ${talon.cards.length}`);
      this.notifyContextStateChange(true);
    } else {
      this.notifyContextStateChange(false);
    }
  }

  resetDrawPile() {
    const stock = this.getStock();
    const talon = this.getTalon();
    if (stock.cards.length === 0 && talon.cards.length > 0) {
      stock.cards = talon.cards;
      talon.cards = [];
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

export const createNewSolitaireContextValue = () => new SolitaireContextData();
const SolitaireContextImpl = createContext<InstanceType<typeof SolitaireContextData> | null>(null);

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
