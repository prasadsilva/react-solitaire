import {
  OPlayingCardStackDropBehavior,
  OPlayingCardStackMoveBehavior,
  OSolitaireCardStack,
  OSolitaireFoundationStack,
  OSolitaireTableauStack,
  OSuit,
  OSuitColor,
  type PlayingCardDescriptor,
  type PlayingCardStackBehavior,
  type PlayingCardStackData,
  type PlayingCardStackDropBehavior,
  type PlayingCardStackInfo,
  type SolitaireCardStack,
  type Suit,
  type SuitColor,
} from '@/data/types';
import { notNull, objectHasValue } from '@/lib/utils';
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

function getSuitColor(suit: Suit): SuitColor {
  switch (suit) {
    case OSuit.Clubs:
      return OSuitColor.Black;
    case OSuit.Spades:
      return OSuitColor.Black;
    case OSuit.Hearts:
      return OSuitColor.Red;
    case OSuit.Diamonds:
      return OSuitColor.Red;
  }
}

function isSameColor(card1: PlayingCardDescriptor, card2: PlayingCardDescriptor) {
  console.log(`checking color: ${getSuitColor(card1.suit)} == ${getSuitColor(card2.suit)}`);
  return getSuitColor(card1.suit) == getSuitColor(card2.suit);
}

function isSameSuit(card1: PlayingCardDescriptor, card2: PlayingCardDescriptor) {
  console.log(`checking suit: ${card1.suit} == ${card2.suit}`);
  return card1.suit === card2.suit;
}

function isNextInRank(card1: PlayingCardDescriptor, card2: PlayingCardDescriptor) {
  console.log(`checking next in rank: ${card1.rank} -> ${card2.rank}`);
  return card1.rank === card2.rank - 1;
}

function isAceRank(card: PlayingCardDescriptor) {
  return card.rank === 0;
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

  private hasCards(stackId: string): boolean {
    const stack = this.getStack(stackId);
    if (!stack) {
      console.error('Invalid card stack: 1');
      return false;
    }
    return stack.cards.length > 0;
  }

  private isTopCard(stackId: string, cardIdx: number): boolean {
    const stack = this.getStack(stackId);
    if (!stack) {
      console.error('Invalid card stack: 1');
      return false;
    }
    return stack.cards.length - 1 === cardIdx;
  }

  private getCard(stackId: string, cardIdx: number): PlayingCardDescriptor | null {
    const stack = this.getStack(stackId);
    if (!stack) {
      console.error('Invalid card stack: 1');
      return null;
    }
    if (cardIdx < 0 || cardIdx >= stack.cards.length) {
      console.error('Invalid card index: 1');
      return null;
    }
    const card = stack.cards[cardIdx];
    if (!card) {
      console.error(`Card not found at index ${cardIdx}`);
      return null;
    }
    return card;
  }

  public onValidDrop(cardStackInfo: PlayingCardStackInfo, slotStackInfo: PlayingCardStackInfo) {
    console.log(
      `onValidDrop: ${cardStackInfo.stackId}:${cardStackInfo.cardIndex} -> ${slotStackInfo && slotStackInfo.stackId}:${slotStackInfo && slotStackInfo.cardIndex}`,
    );
    let result = false;
    if (isTableauStack(cardStackInfo.stackId)) {
      if (isTableauStack(slotStackInfo.stackId)) {
        console.log('tableau -> tableau');
        const card = this.getCard(cardStackInfo.stackId, cardStackInfo.cardIndex);
        const slotHasCards = this.hasCards(slotStackInfo.stackId);
        if (!slotHasCards) {
          // No parent card; empty slot. Drop is always successful.
          result = this.moveBetweenStacks(cardStackInfo, slotStackInfo);
        } else if (card) {
          const slotParentCard = notNull(this.getCard(slotStackInfo.stackId, slotStackInfo.cardIndex - 1));
          // Has parent card. Drop is only successful if a) the parent is a rank below card and b) parent has opposite color
          if (!isSameColor(card, slotParentCard) && isNextInRank(card, slotParentCard)) {
            result = this.moveBetweenStacks(cardStackInfo, slotStackInfo);
          }
        }
      } else if (isFoundationStack(slotStackInfo.stackId) && this.isTopCard(cardStackInfo.stackId, cardStackInfo.cardIndex)) {
        console.log('tableau -> foundation');
        const card = this.getCard(cardStackInfo.stackId, cardStackInfo.cardIndex);
        const slotHasCards = this.hasCards(slotStackInfo.stackId);
        if (!slotHasCards) {
          console.log(card);
          // No parent card; empty slot. Drop is only successful if it is an ace.
          if (card && isAceRank(card)) {
            result = this.moveBetweenStacks(cardStackInfo, slotStackInfo);
          }
        } else if (card) {
          const slotParentCard = notNull(this.getCard(slotStackInfo.stackId, slotStackInfo.cardIndex - 1));
          console.log(slotParentCard);
          // Has parent card. Drop is only successful if a) the parent is a rank below card and b) parent has same suit
          if (isSameSuit(card, slotParentCard) && isNextInRank(slotParentCard, card)) {
            result = this.moveBetweenStacks(cardStackInfo, slotStackInfo);
          }
        }
      }
    } else if (isTalonStack(cardStackInfo.stackId)) {
      if (isTableauStack(slotStackInfo.stackId)) {
        console.log('talon -> tableau');
        const card = this.getCard(cardStackInfo.stackId, cardStackInfo.cardIndex);
        const slotHasCards = this.hasCards(slotStackInfo.stackId);
        if (!slotHasCards) {
          // No parent card; empty slot. Drop is always successful.
          result = this.moveBetweenStacks(cardStackInfo, slotStackInfo);
        } else if (card) {
          const slotParentCard = notNull(this.getCard(slotStackInfo.stackId, slotStackInfo.cardIndex - 1));
          // Has parent card. Drop is only successful if a) the parent is a rank below card and b) parent has opposite color
          if (!isSameColor(card, slotParentCard) && isNextInRank(card, slotParentCard)) {
            result = this.moveBetweenStacks(cardStackInfo, slotStackInfo);
          }
        }
      } else if (isFoundationStack(slotStackInfo.stackId) && this.isTopCard(cardStackInfo.stackId, cardStackInfo.cardIndex)) {
        console.log('talon -> foundation');
        const card = this.getCard(cardStackInfo.stackId, cardStackInfo.cardIndex);
        const slotHasCards = this.hasCards(slotStackInfo.stackId);
        if (!slotHasCards) {
          // No parent card; empty slot. Drop is only successful if it is an ace.
          if (card && isAceRank(card)) {
            result = this.moveBetweenStacks(cardStackInfo, slotStackInfo);
          }
        } else if (card) {
          const slotParentCard = notNull(this.getCard(slotStackInfo.stackId, slotStackInfo.cardIndex - 1));
          // Has parent card. Drop is only successful if a) the parent is a rank below card and b) parent has same suit
          if (isSameSuit(card, slotParentCard) && isNextInRank(slotParentCard, card)) {
            result = this.moveBetweenStacks(cardStackInfo, slotStackInfo);
          }
        }
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
