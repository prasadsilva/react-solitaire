import {
  OPlayingCardStackDropBehavior,
  OPlayingCardStackMoveBehavior,
  type PlayingCard,
  type PlayingCardList,
  type PlayingCardStackBehavior,
  type PlayingCardStackData,
  type PlayingCardStackDropBehavior,
} from '@/playing-cards/context/types';
import { deepCopy, exists, type Immutable } from '@/utils';
import { generateNewSolitaireGameData } from './deck-builder';
import { registerNewHistoryTime } from './game-history';
import { OSolitaireCardStack, OSolitaireTableauStack, type SolitaireCardStack } from './types';

type SolitaireCardStackMap = { [K in SolitaireCardStack]?: PlayingCardStackData };

class SolitaireGameState {
  #cardStacks: SolitaireCardStackMap = {};
  #startTime: number = Date.now();
  #gameOver: boolean = false;
  #gameOverTime: number = -1;
  #actionCount: number = 0;

  constructor(restoreGame?: boolean) {
    if (restoreGame) {
      this.#loadFromSavedState();
    } else {
      this.#clearSavedState();
      this.#setupNewGame();
    }
  }

  get cardStacks(): Immutable<SolitaireCardStackMap> {
    return this.#cardStacks;
  }

  get startTime() {
    return this.#startTime;
  }

  get actionCount() {
    return this.#actionCount;
  }

  get gameOver() {
    return this.#gameOver;
  }

  get elapsedTimeInSeconds() {
    if (this.#gameOver) {
      return this.#gameOverTime;
    }
    if (this.#actionCount === 0) {
      this.#startTime = Date.now();
      return 0;
    }
    return Math.floor((Date.now() - this.#startTime) / 1000);
  }

  incrementActionCount() {
    this.#actionCount++;
    this.#saveState();
  }

  isStackValid(stackId: SolitaireCardStack): boolean {
    return !!this.#cardStacks[stackId];
  }
  getStack(stackId: SolitaireCardStack): Immutable<PlayingCardStackData> {
    return exists(this.#cardStacks[stackId]);
  }
  getStackCopy(sourceStackId: SolitaireCardStack): PlayingCardStackData {
    return deepCopy(exists(this.#cardStacks[sourceStackId]));
  }
  setCardStack(id: SolitaireCardStack, data: PlayingCardStackData) {
    this.#cardStacks[id] = data;
    this.#handleStateChanged();
  }

  getStock(): Immutable<PlayingCardStackData> {
    return exists(this.#cardStacks[OSolitaireCardStack.Stock]);
  }
  getStockCopy(): PlayingCardStackData {
    return deepCopy(exists(this.#cardStacks[OSolitaireCardStack.Stock]));
  }
  setStock(data: PlayingCardStackData) {
    this.#cardStacks[OSolitaireCardStack.Stock] = data;
    this.#handleStateChanged();
  }

  getTalon(): Immutable<PlayingCardStackData> {
    return exists(this.#cardStacks[OSolitaireCardStack.Talon]);
  }
  getTalonCopy(): PlayingCardStackData {
    return deepCopy(exists(this.#cardStacks[OSolitaireCardStack.Talon]));
  }
  setTalon(data: PlayingCardStackData) {
    this.#cardStacks[OSolitaireCardStack.Talon] = data;
    this.#handleStateChanged();
  }

  #checkGameOver(): void {
    if (this.#gameOver) {
      return;
    }
    // If there are no more stock/talon cards and all tableau cards are showing face, then the game is effectively over.
    const tableauStackKeys = Object.values(OSolitaireTableauStack);
    const areAllTableauCardsShowingFace = tableauStackKeys.reduce(
      (accum, key) => accum && this.isStackValid(key) && !this.hasHiddenCards(key),
      true,
    );
    this.#gameOver = this.getStock().cards.length === 0 && this.getTalon().cards.length === 0 && areAllTableauCardsShowingFace;
    if (this.#gameOver) {
      this.#gameOverTime = this.elapsedTimeInSeconds;
      registerNewHistoryTime(this.#gameOverTime);
    }
  }

  hasCards(stackId: SolitaireCardStack): boolean {
    const stack = this.getStack(stackId);
    if (!stack) {
      console.error('Invalid card stack: -1');
      return false;
    }
    return stack.cards.length > 0;
  }

  hasHiddenCards(stackId: SolitaireCardStack): boolean {
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

  isTopCard(stackId: SolitaireCardStack, cardIdx: number): boolean {
    const stack = this.getStack(stackId);
    if (!stack) {
      console.error('Invalid card stack: -3');
      return false;
    }
    return stack.cards.length - 1 === cardIdx;
  }

  getCard(stackId: SolitaireCardStack, cardIdx: number): Immutable<PlayingCard> | null {
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

  #handleStateChanged() {
    this.#checkGameOver();
    this.#saveState();
  }

  #saveState() {
    // TODO: debounce this?
    const saveState = JSON.stringify({
      '#cardStacks': this.#cardStacks,
      '#actionCount': this.#actionCount,
      '#startTime': this.#startTime,
      '#gameOver': this.#gameOver,
      '#gameOverTime': this.#gameOverTime,
    });
    localStorage.setItem('savedState', saveState);
  }

  #clearSavedState() {
    localStorage.removeItem('savedState');
  }

  #loadFromSavedState(): boolean {
    const savedData = localStorage.getItem('savedState');
    if (!savedData) {
      return false;
    }
    const savedState = JSON.parse(savedData);
    if (savedState instanceof Object) {
      this.#cardStacks = savedState['#cardStacks'];
      this.#actionCount = savedState['#actionCount'];
      this.#startTime = savedState['#startTime'];
      this.#gameOver = savedState['#gameOver'];
      this.#gameOverTime = savedState['#gameOverTime'];
      return true;
    }
    return false;
  }

  #setupNewGame(): void {
    const newSolitaireGameData = generateNewSolitaireGameData();
    this.#registerStack(
      OSolitaireCardStack.Stock,
      OPlayingCardStackMoveBehavior.Immovable,
      OPlayingCardStackDropBehavior.NotAccepting,
      newSolitaireGameData.drawCards,
    );
    this.#registerStack(OSolitaireCardStack.Talon, OPlayingCardStackMoveBehavior.MoveOnlyTop, OPlayingCardStackDropBehavior.NotAccepting);
    this.#registerStack(
      OSolitaireCardStack.Foundation1,
      OPlayingCardStackMoveBehavior.MoveOnlyTop,
      OPlayingCardStackDropBehavior.AcceptsAny,
    );
    this.#registerStack(
      OSolitaireCardStack.Foundation2,
      OPlayingCardStackMoveBehavior.MoveOnlyTop,
      OPlayingCardStackDropBehavior.AcceptsAny,
    );
    this.#registerStack(
      OSolitaireCardStack.Foundation3,
      OPlayingCardStackMoveBehavior.MoveOnlyTop,
      OPlayingCardStackDropBehavior.AcceptsAny,
    );
    this.#registerStack(
      OSolitaireCardStack.Foundation4,
      OPlayingCardStackMoveBehavior.MoveOnlyTop,
      OPlayingCardStackDropBehavior.AcceptsAny,
    );
    this.#registerStack(
      OSolitaireCardStack.Tableau1,
      OPlayingCardStackMoveBehavior.MoveAllNextSiblings,
      OPlayingCardStackDropBehavior.AcceptsAny,
      newSolitaireGameData.tableauCards[OSolitaireCardStack.Tableau1],
    );
    this.#registerStack(
      OSolitaireCardStack.Tableau2,
      OPlayingCardStackMoveBehavior.MoveAllNextSiblings,
      OPlayingCardStackDropBehavior.AcceptsAny,
      newSolitaireGameData.tableauCards[OSolitaireCardStack.Tableau2],
    );
    this.#registerStack(
      OSolitaireCardStack.Tableau3,
      OPlayingCardStackMoveBehavior.MoveAllNextSiblings,
      OPlayingCardStackDropBehavior.AcceptsAny,
      newSolitaireGameData.tableauCards[OSolitaireCardStack.Tableau3],
    );
    this.#registerStack(
      OSolitaireCardStack.Tableau4,
      OPlayingCardStackMoveBehavior.MoveAllNextSiblings,
      OPlayingCardStackDropBehavior.AcceptsAny,
      newSolitaireGameData.tableauCards[OSolitaireCardStack.Tableau4],
    );
    this.#registerStack(
      OSolitaireCardStack.Tableau5,
      OPlayingCardStackMoveBehavior.MoveAllNextSiblings,
      OPlayingCardStackDropBehavior.AcceptsAny,
      newSolitaireGameData.tableauCards[OSolitaireCardStack.Tableau5],
    );
    this.#registerStack(
      OSolitaireCardStack.Tableau6,
      OPlayingCardStackMoveBehavior.MoveAllNextSiblings,
      OPlayingCardStackDropBehavior.AcceptsAny,
      newSolitaireGameData.tableauCards[OSolitaireCardStack.Tableau6],
    );
    this.#registerStack(
      OSolitaireCardStack.Tableau7,
      OPlayingCardStackMoveBehavior.MoveAllNextSiblings,
      OPlayingCardStackDropBehavior.AcceptsAny,
      newSolitaireGameData.tableauCards[OSolitaireCardStack.Tableau7],
    );
  }

  #registerStack(
    id: SolitaireCardStack,
    moveBehavior: PlayingCardStackBehavior,
    dropBehavior: PlayingCardStackDropBehavior,
    cards: PlayingCardList = [],
  ) {
    this.#cardStacks[id] = {
      meta: {
        id,
        moveBehavior,
        dropBehavior,
      },
      cards,
    };
  }
}

export default SolitaireGameState;
