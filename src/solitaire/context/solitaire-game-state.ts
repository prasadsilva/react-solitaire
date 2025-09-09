import type { PlayingCard, PlayingCardStackData } from '@/playing-cards/context/types';
import { deepCopy, notNull, type Immutable } from '@/utils';
import { OSolitaireCardStack, OSolitaireTableauStack, type SolitaireCardStack } from './types';

type SolitaireCardStackMap = { [K in SolitaireCardStack]?: PlayingCardStackData };

class SolitaireGameState {
  #cardStacks: SolitaireCardStackMap = {};
  #startTime: number = Date.now();
  #actionCount: number = 0;

  get cardStacks(): Immutable<SolitaireCardStackMap> {
    return this.#cardStacks;
  }

  get startTime() {
    return this.#startTime;
  }

  get actionCount() {
    return this.#actionCount;
  }

  get elapsedTime() {
    if (this.#actionCount === 0) {
      this.#startTime = Date.now();
      return 0;
    }
    return Date.now() - this.#startTime;
  }

  incrementActionCount() {
    this.#actionCount++;
  }

  getStack(stackId: SolitaireCardStack): Immutable<PlayingCardStackData> {
    return notNull(this.#cardStacks[stackId]);
  }
  getStackCopy(sourceStackId: SolitaireCardStack): PlayingCardStackData {
    return deepCopy(notNull(this.#cardStacks[sourceStackId]));
  }
  setCardStack(id: SolitaireCardStack, data: PlayingCardStackData) {
    this.#cardStacks[id] = data;
  }

  getStock(): Immutable<PlayingCardStackData> {
    return notNull(this.#cardStacks[OSolitaireCardStack.Stock]);
  }
  getStockCopy(): PlayingCardStackData {
    return deepCopy(notNull(this.#cardStacks[OSolitaireCardStack.Stock]));
  }
  setStock(data: PlayingCardStackData) {
    this.#cardStacks[OSolitaireCardStack.Stock] = data;
  }

  getTalon(): Immutable<PlayingCardStackData> {
    return notNull(this.#cardStacks[OSolitaireCardStack.Talon]);
  }
  getTalonCopy(): PlayingCardStackData {
    return deepCopy(notNull(this.#cardStacks[OSolitaireCardStack.Talon]));
  }
  setTalon(data: PlayingCardStackData) {
    this.#cardStacks[OSolitaireCardStack.Talon] = data;
  }

  isGameOver(): boolean {
    // If there are no more stock/talon cards and all tableau cards are showing face, then the game is effectively over.
    const tableauStackKeys = Object.values(OSolitaireTableauStack);
    const areAllTableauCardsShowingFace = tableauStackKeys.reduce((accum, key) => accum && !this.hasHiddenCards(key), true);
    return this.getStock().cards.length === 0 && this.getTalon().cards.length === 0 && areAllTableauCardsShowingFace;
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
}

export default SolitaireGameState;
