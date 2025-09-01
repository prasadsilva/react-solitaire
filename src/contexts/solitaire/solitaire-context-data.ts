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
} from '@/data/types';
import { objectHasValue } from '@/lib/utils';
import type { PlayingCardsContextListener } from '../playing-cards/playing-cards-context';
import { generateNewSolitaireGameData } from './deck-builder';

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

export class SolitaireContextData implements PlayingCardsContextListener {
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
    let result = false;
    if (isTableauStack(card.stackId)) {
      if (isTableauStack(slot.stackId)) {
        console.log('tableau -> tableau');
        // TODO: Need check logic
        result = this.moveBetweenStacks(card, slot);
      } else if (isFoundationStack(slot.stackId)) {
        console.log('tableau -> foundation');
        // TODO: Need check logic
        result = this.moveBetweenStacks(card, slot);
      }
    } else if (isTalonStack(card.stackId)) {
      if (isTableauStack(slot.stackId)) {
        console.log('talon -> tableau');
        // TODO: Need check logic
        result = this.moveBetweenStacks(card, slot);
      }
    }
    this.notifyContextStateChange(result);
  }
  public onInvalidDrop(card: PlayingCardStackInfo) {
    console.log(`onInvalidDrop: ${card.stackId}:${card.cardIndex}`);
    this.notifyContextStateChange(false);
  }

  private moveBetweenStacks(card: PlayingCardStackInfo, slot: PlayingCardStackInfo): boolean {
    const sourceStackId = card.stackId;
    const sourceStackCardIndex = card.cardIndex;
    const sourceStack = this.cardStacks[card.stackId];
    const targetStackId = slot.stackId;
    const targetStackCardIndex = slot.cardIndex;

    switch (sourceStack.meta.moveBehavior) {
      case OPlayingCardStackMoveBehavior.MoveAllNextSiblings: {
        // Remove card and next siblings below from source stack
        const sourceStackCopy = { ...this.cardStacks[sourceStackId] };
        const sourceStackCardsCopy = sourceStackCopy.cards.slice(0, sourceStackCardIndex);
        const cardsToMove = sourceStackCopy.cards.slice(sourceStackCardIndex);
        if (sourceStackCardsCopy.length === sourceStackCopy.cards.length) {
          console.warn('Something went wrong with card removal');
        }
        sourceStackCopy.cards = sourceStackCardsCopy;
        this.cardStacks[sourceStackId] = sourceStackCopy;

        // Add card and next siblings to target stack
        const targetStackCopy = { ...this.cardStacks[targetStackId] };
        const targetStackCardsCopy = [...targetStackCopy.cards];
        targetStackCardsCopy.splice(targetStackCardIndex, 0, ...cardsToMove);
        targetStackCopy.cards = targetStackCardsCopy;
        this.cardStacks[targetStackId] = targetStackCopy;

        break;
      }
      case OPlayingCardStackMoveBehavior.MoveOnlyTop: {
        if (sourceStackCardIndex != sourceStack.cards.length - 1) {
          console.warn('Move only top constraint failed');
          return false;
        }

        // Remove only the one card from source stack
        const sourceStackCopy = { ...this.cardStacks[sourceStackId] };
        const sourceStackCardsCopy = [...sourceStackCopy.cards];
        const cardsToMove = sourceStackCardsCopy.splice(sourceStackCardIndex, 1);
        if (sourceStackCardsCopy.length === sourceStackCopy.cards.length) {
          console.warn('Something went wrong with card removal');
        }
        sourceStackCopy.cards = sourceStackCardsCopy;
        this.cardStacks[sourceStackId] = sourceStackCopy;

        // Add the one card to the target stack
        const targetStackCopy = { ...this.cardStacks[targetStackId] };
        const targetStackCardsCopy = [...targetStackCopy.cards];
        targetStackCardsCopy.splice(targetStackCardIndex, 0, ...cardsToMove);
        targetStackCopy.cards = targetStackCardsCopy;
        this.cardStacks[targetStackId] = targetStackCopy;
        break;
      }
      case OPlayingCardStackMoveBehavior.MoveIndividually: {
        console.warn(`Unhandled move mode ${OPlayingCardStackMoveBehavior.MoveIndividually}`);
        return false;
      }
      case OPlayingCardStackMoveBehavior.Immovable: {
        return false;
      }
    }

    return true;
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
