import {
  OPlayingCardStackDropBehavior,
  OPlayingCardStackMoveBehavior,
  OSolitaireCardStack,
  type PlayingCardDescriptor,
  type PlayingCardStackBehavior,
  type PlayingCardStackData,
  type PlayingCardStackDropBehavior,
  type SolitaireCardStack,
  type SolitaireTableauStack,
} from '@/data/types';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { generateNewSolitaireGameData } from './deck-builder';

type SolitaireContextChangeListener = (modelChanged: boolean) => void;

class SolitaireData {
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
    this.registerStack(
      OSolitaireCardStack.Foundation1,
      OPlayingCardStackMoveBehavior.Immovable,
      OPlayingCardStackDropBehavior.NotAccepting,
    );
    this.registerStack(
      OSolitaireCardStack.Foundation2,
      OPlayingCardStackMoveBehavior.Immovable,
      OPlayingCardStackDropBehavior.NotAccepting,
    );
    this.registerStack(
      OSolitaireCardStack.Foundation3,
      OPlayingCardStackMoveBehavior.Immovable,
      OPlayingCardStackDropBehavior.NotAccepting,
    );
    this.registerStack(
      OSolitaireCardStack.Foundation4,
      OPlayingCardStackMoveBehavior.Immovable,
      OPlayingCardStackDropBehavior.NotAccepting,
    );
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

export const createNewSolitaireContextValue = () => new SolitaireData();
export const SolitaireContext = createContext<InstanceType<typeof SolitaireData> | null>(null);

function useStock() {
  const context = useContext(SolitaireContext);
  if (!context) {
    throw new Error('useDrawPile must be used within a SolitaireContext');
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
  const context = useContext(SolitaireContext);
  if (!context) {
    throw new Error('useDiscardPile must be used within a SolitaireContext');
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
  const context = useContext(SolitaireContext);
  if (!context) {
    throw new Error('useDiscardPile must be used within a SolitaireContext');
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

export const SolitaireContextHooks = {
  useStock,
  useTalon,
  useTableau,
};
