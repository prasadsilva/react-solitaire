import {
  OPlayingCardStackDropBehavior,
  OPlayingCardStackMoveBehavior,
  type PlayingCard,
  type PlayingCardList,
  type PlayingCardStackBehavior,
  type PlayingCardStackData,
  type PlayingCardStackDropBehavior,
  type PlayingCardStackInfo,
} from '@/playing-cards/context/types';
import { notNull } from '@/utils';
import type { PlayingCardsContextListener } from '../../playing-cards/context/playing-cards-context';
import { generateNewSolitaireGameData } from './deck-builder';
import {
  OSolitaireCardStack,
  OSolitaireDebugState,
  OSolitaireTableauStack,
  type SolitaireCardStack,
  type SolitaireDebugState,
} from './types';
import Utils from './utils';

type SolitaireContextChangeListener = (modelChanged: boolean) => void;

export class SolitaireContextData implements PlayingCardsContextListener {
  private cardStacks: { [K in SolitaireCardStack]?: PlayingCardStackData } = {};
  private changeListeners: Set<SolitaireContextChangeListener>;
  private debugStates: { [K in SolitaireDebugState]: boolean } = { [OSolitaireDebugState.GameOver]: false };

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
      OPlayingCardStackMoveBehavior.MoveOnlyTop,
      OPlayingCardStackDropBehavior.AcceptsAny,
    );
    this.registerStack(
      OSolitaireCardStack.Foundation2,
      OPlayingCardStackMoveBehavior.MoveOnlyTop,
      OPlayingCardStackDropBehavior.AcceptsAny,
    );
    this.registerStack(
      OSolitaireCardStack.Foundation3,
      OPlayingCardStackMoveBehavior.MoveOnlyTop,
      OPlayingCardStackDropBehavior.AcceptsAny,
    );
    this.registerStack(
      OSolitaireCardStack.Foundation4,
      OPlayingCardStackMoveBehavior.MoveOnlyTop,
      OPlayingCardStackDropBehavior.AcceptsAny,
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

  public _debugSetGameOver() {
    console.log('setting debug game over state');
    this.debugStates[OSolitaireDebugState.GameOver] = true;
    this.notifyContextStateChange(false);
  }

  public isGameOver(): boolean {
    if (this.debugStates[OSolitaireDebugState.GameOver]) {
      return true;
    }
    // If there are no more stock/talon cards and all tableau cards are showing face, then the game is effectively over.
    const tableauStackKeys = Object.values(OSolitaireTableauStack);
    const areAllTableauCardsShowingFace = tableauStackKeys.reduce((accum, key) => accum && !this.hasHiddenCards(key), true);
    return this.getStock().cards.length === 0 && this.getTalon().cards.length === 0 && areAllTableauCardsShowingFace;
  }

  private hasCards(stackId: SolitaireCardStack): boolean {
    const stack = this.getStack(stackId);
    if (!stack) {
      console.error('Invalid card stack: -1');
      return false;
    }
    return stack.cards.length > 0;
  }

  private hasHiddenCards(stackId: SolitaireCardStack): boolean {
    const stack = this.getStack(stackId);
    if (!stack) {
      console.error('Invalid card stack: -2');
      return false;
    }
    for (let idx = 0; idx < stack.cards.length; idx++) {
      if (!stack.cards[idx].showingFace) {
        return true;
      }
    }
    return false;
  }

  private isTopCard(stackId: SolitaireCardStack, cardIdx: number): boolean {
    const stack = this.getStack(stackId);
    if (!stack) {
      console.error('Invalid card stack: -3');
      return false;
    }
    return stack.cards.length - 1 === cardIdx;
  }

  private getCard(stackId: SolitaireCardStack, cardIdx: number): PlayingCard | null {
    const stack = this.getStack(stackId);
    if (!stack) {
      console.error('Invalid card stack: -4');
      return null;
    }
    if (cardIdx < 0 || cardIdx >= stack.cards.length) {
      console.error('Invalid card index: -5');
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
    let result = false;
    if (Utils.isTableauStack(cardStackInfo.stackId)) {
      // Move originated from tableau
      if (Utils.isTableauStack(slotStackInfo.stackId)) {
        // Target is another tableau
        const card = this.getCard(cardStackInfo.stackId, cardStackInfo.cardIndex);
        const slotHasCards = this.hasCards(slotStackInfo.stackId);
        if (!slotHasCards) {
          // No parent card; empty slot. Drop is always successful.
          result = this.moveBetweenStacks(cardStackInfo, slotStackInfo, true);
        } else if (card) {
          const slotParentCard = notNull(this.getCard(slotStackInfo.stackId, slotStackInfo.cardIndex - 1));
          // Has parent card. Drop is only successful if a) the parent is a rank below card and b) parent has opposite color
          if (!Utils.isSameColor(card, slotParentCard) && Utils.isNextInRank(card, slotParentCard)) {
            result = this.moveBetweenStacks(cardStackInfo, slotStackInfo, true);
          }
        }
      } else if (Utils.isFoundationStack(slotStackInfo.stackId) && this.isTopCard(cardStackInfo.stackId, cardStackInfo.cardIndex)) {
        // Target is foundation
        const card = this.getCard(cardStackInfo.stackId, cardStackInfo.cardIndex);
        const slotHasCards = this.hasCards(slotStackInfo.stackId);
        if (!slotHasCards) {
          // No parent card; empty slot. Drop is only successful if it is an ace.
          if (card && Utils.isAceRank(card)) {
            result = this.moveBetweenStacks(cardStackInfo, slotStackInfo, true);
          }
        } else if (card) {
          const slotParentCard = notNull(this.getCard(slotStackInfo.stackId, slotStackInfo.cardIndex - 1));
          // Has parent card. Drop is only successful if a) the parent is a rank below card and b) parent has same suit
          if (Utils.isSameSuit(card, slotParentCard) && Utils.isNextInRank(slotParentCard, card)) {
            result = this.moveBetweenStacks(cardStackInfo, slotStackInfo, true);
          }
        }
      }
    } else if (Utils.isTalonStack(cardStackInfo.stackId)) {
      // Move originated from talon
      if (Utils.isTableauStack(slotStackInfo.stackId)) {
        // Target is tableau
        const card = this.getCard(cardStackInfo.stackId, cardStackInfo.cardIndex);
        const slotHasCards = this.hasCards(slotStackInfo.stackId);
        if (!slotHasCards) {
          // No parent card; empty slot. Drop is always successful.
          result = this.moveBetweenStacks(cardStackInfo, slotStackInfo, false);
        } else if (card) {
          const slotParentCard = notNull(this.getCard(slotStackInfo.stackId, slotStackInfo.cardIndex - 1));
          // Has parent card. Drop is only successful if a) the parent is a rank below card and b) parent has opposite color
          if (!Utils.isSameColor(card, slotParentCard) && Utils.isNextInRank(card, slotParentCard)) {
            result = this.moveBetweenStacks(cardStackInfo, slotStackInfo, false);
          }
        }
      } else if (Utils.isFoundationStack(slotStackInfo.stackId) && this.isTopCard(cardStackInfo.stackId, cardStackInfo.cardIndex)) {
        // Target is foundation
        const card = this.getCard(cardStackInfo.stackId, cardStackInfo.cardIndex);
        const slotHasCards = this.hasCards(slotStackInfo.stackId);
        if (!slotHasCards) {
          // No parent card; empty slot. Drop is only successful if it is an ace.
          if (card && Utils.isAceRank(card)) {
            result = this.moveBetweenStacks(cardStackInfo, slotStackInfo, false);
          }
        } else if (card) {
          const slotParentCard = notNull(this.getCard(slotStackInfo.stackId, slotStackInfo.cardIndex - 1));
          // Has parent card. Drop is only successful if a) the parent is a rank below card and b) parent has same suit
          if (Utils.isSameSuit(card, slotParentCard) && Utils.isNextInRank(slotParentCard, card)) {
            result = this.moveBetweenStacks(cardStackInfo, slotStackInfo, false);
          }
        }
      }
    } else if (Utils.isFoundationStack(cardStackInfo.stackId)) {
      // Move originated from foundation
      if (Utils.isTableauStack(slotStackInfo.stackId)) {
        // Target is tableau
        const card = this.getCard(cardStackInfo.stackId, cardStackInfo.cardIndex);
        const slotHasCards = this.hasCards(slotStackInfo.stackId);
        if (!slotHasCards) {
          // No parent card; empty slot. Drop is always successful.
          result = this.moveBetweenStacks(cardStackInfo, slotStackInfo, false);
        } else if (card) {
          const slotParentCard = notNull(this.getCard(slotStackInfo.stackId, slotStackInfo.cardIndex - 1));
          // Has parent card. Drop is only successful if a) the parent is a rank below card and b) parent has opposite color
          if (!Utils.isSameColor(card, slotParentCard) && Utils.isNextInRank(card, slotParentCard)) {
            result = this.moveBetweenStacks(cardStackInfo, slotStackInfo, false);
          }
        }
      }
    }
    this.notifyContextStateChange(result);
  }
  public onInvalidDrop(_card: PlayingCardStackInfo) {
    this.notifyContextStateChange(false);
  }

  private moveBetweenStacks(card: PlayingCardStackInfo, slot: PlayingCardStackInfo, showCardParent: boolean): boolean {
    const sourceStackId = card.stackId as SolitaireCardStack;
    const sourceStackCardIndex = card.cardIndex;
    const sourceStack = notNull(this.cardStacks[sourceStackId]);
    const targetStackId = slot.stackId as SolitaireCardStack;
    const targetStackCardIndex = slot.cardIndex;
    const targetStack = notNull(this.cardStacks[targetStackId]);

    switch (sourceStack.meta.moveBehavior) {
      case OPlayingCardStackMoveBehavior.MoveAllNextSiblings: {
        // Remove card and next siblings below from source stack
        const sourceStackCopy = { ...sourceStack };
        const sourceStackCardsCopy = sourceStackCopy.cards.slice(0, sourceStackCardIndex);
        const cardsToMove = sourceStackCopy.cards.slice(sourceStackCardIndex);
        if (sourceStackCardsCopy.length === sourceStackCopy.cards.length) {
          console.warn('Something went wrong with card removal');
        }
        if (showCardParent) {
          const parentCard = sourceStackCardsCopy.pop();
          if (parentCard) {
            sourceStackCardsCopy.push({ ...parentCard, showingFace: true });
          }
        }
        sourceStackCopy.cards = sourceStackCardsCopy;
        this.cardStacks[sourceStackId] = sourceStackCopy;

        // Add card and next siblings to target stack
        const targetStackCopy = { ...targetStack };
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
        const sourceStackCopy = { ...sourceStack };
        const sourceStackCardsCopy = [...sourceStackCopy.cards];
        const cardsToMove = sourceStackCardsCopy.splice(sourceStackCardIndex, 1);
        if (sourceStackCardsCopy.length === sourceStackCopy.cards.length) {
          console.warn('Something went wrong with card removal');
        }
        if (showCardParent) {
          const parentCard = sourceStackCardsCopy.pop();
          if (parentCard) {
            sourceStackCardsCopy.push({ ...parentCard, showingFace: true });
          }
        }
        sourceStackCopy.cards = sourceStackCardsCopy;
        this.cardStacks[sourceStackId] = sourceStackCopy;

        // Add the one card to the target stack
        const targetStackCopy = { ...targetStack };
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
    cards: PlayingCardList = [],
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

  public getStock(): PlayingCardStackData {
    return notNull(this.cardStacks[OSolitaireCardStack.Stock]);
  }

  public getTalon(): PlayingCardStackData {
    return notNull(this.cardStacks[OSolitaireCardStack.Talon]);
  }

  public getStack(stackId: SolitaireCardStack): PlayingCardStackData {
    return notNull(this.cardStacks[stackId]);
  }

  drawCards() {
    const stock = this.getStock();
    const talon = this.getTalon();
    if (stock.cards.length > 0) {
      const drawnCards = stock.cards.slice(0, 3).map((card) => ({ ...card, showingFace: true }));
      stock.cards = stock.cards.slice(3);
      talon.cards = [...talon.cards, ...drawnCards];
      this.notifyContextStateChange(true);
    } else {
      this.notifyContextStateChange(false);
    }
  }

  resetDrawPile() {
    const stock = this.getStock();
    const talon = this.getTalon();
    if (stock.cards.length === 0 && talon.cards.length > 0) {
      stock.cards = talon.cards.map((card) => ({ ...card, showingFace: false }));
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
