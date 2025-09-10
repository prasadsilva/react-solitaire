import { OPlayingCardStackMoveBehavior, type PlayingCardStackInfo } from '@/playing-cards/context/types';
import { exists } from '@/utils';
import type { PlayingCardsContextListener } from '../../playing-cards/context/playing-cards-context';
import { clearBestTimes, registerNewHistoryTime } from './game-history';
import SolitaireGameState from './solitaire-game-state';
import { OSolitaireDebugState, type SolitaireCardStack, type SolitaireDebugState } from './types';
import Utils from './utils';

type SolitaireContextChangeListener = (modelChanged: boolean) => void;

export class SolitaireContextData implements PlayingCardsContextListener {
  private gameState: SolitaireGameState;
  private changeListeners: Set<SolitaireContextChangeListener>;
  private debugStates: { [K in SolitaireDebugState]: boolean } = { [OSolitaireDebugState.GameOver]: false };

  public constructor(savedGameState?: SolitaireGameState) {
    this.gameState = savedGameState ?? new SolitaireGameState();
    this.changeListeners = new Set();
  }

  public getElapsedTimeInSeconds(): number {
    return this.gameState.elapsedTimeInSeconds;
  }

  public _debugSetGameOver() {
    this.debugStates[OSolitaireDebugState.GameOver] = true;
    registerNewHistoryTime(this.gameState.elapsedTimeInSeconds);
    this.notifyContextStateChange(false);
  }

  public _debugClearBestTimes() {
    clearBestTimes();
  }

  public isGameOver(): boolean {
    if (this.debugStates[OSolitaireDebugState.GameOver]) {
      return true;
    }
    return this.gameState.gameOver;
  }

  public getStock() {
    return this.gameState.getStock();
  }
  public getTalon() {
    return this.gameState.getTalon();
  }
  public getStack(id: SolitaireCardStack) {
    return this.gameState.getStack(id);
  }

  public drawCards() {
    const stock = this.gameState.getStockCopy();
    const talon = this.gameState.getTalonCopy();
    if (stock.cards.length > 0) {
      const drawnCards = stock.cards.slice(0, 3).map((card) => ({ ...card, showingFace: true }));
      stock.cards = stock.cards.slice(3);
      talon.cards = [...talon.cards, ...drawnCards];
      this.gameState.setStock(stock);
      this.gameState.setTalon(talon);
      this.gameState.incrementActionCount();
      this.notifyContextStateChange(true);
    } else {
      this.notifyContextStateChange(false);
    }
  }

  public resetDrawPile() {
    const stock = this.gameState.getStockCopy();
    const talon = this.gameState.getTalonCopy();
    if (stock.cards.length === 0 && talon.cards.length > 0) {
      stock.cards = talon.cards.map((card) => ({ ...card, showingFace: false }));
      talon.cards = [];
      this.gameState.setStock(stock);
      this.gameState.setTalon(talon);
      this.gameState.incrementActionCount();
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

  // Implements PlayingCardsContextListener.onValidDrop
  public onValidDrop(cardStackInfo: PlayingCardStackInfo, slotStackInfo: PlayingCardStackInfo) {
    let result = false;
    const gameState = this.gameState;
    if (Utils.isTableauStack(cardStackInfo.stackId)) {
      // Move originated from tableau
      if (Utils.isTableauStack(slotStackInfo.stackId)) {
        // Target is another tableau
        const card = gameState.getCard(cardStackInfo.stackId, cardStackInfo.cardIndex);
        const slotHasCards = gameState.hasCards(slotStackInfo.stackId);
        if (!slotHasCards) {
          // No parent card; empty slot. Drop is always successful.
          result = this.moveBetweenStacks(cardStackInfo, slotStackInfo, true);
        } else if (card) {
          const slotParentCard = exists(gameState.getCard(slotStackInfo.stackId, slotStackInfo.cardIndex - 1));
          // Has parent card. Drop is only successful if a) the parent is a rank below card and b) parent has opposite color
          if (!Utils.isSameColor(card, slotParentCard) && Utils.isNextInRank(card, slotParentCard)) {
            result = this.moveBetweenStacks(cardStackInfo, slotStackInfo, true);
          }
        }
      } else if (Utils.isFoundationStack(slotStackInfo.stackId) && gameState.isTopCard(cardStackInfo.stackId, cardStackInfo.cardIndex)) {
        // Target is foundation
        const card = gameState.getCard(cardStackInfo.stackId, cardStackInfo.cardIndex);
        const slotHasCards = gameState.hasCards(slotStackInfo.stackId);
        if (!slotHasCards) {
          // No parent card; empty slot. Drop is only successful if it is an ace.
          if (card && Utils.isAceRank(card)) {
            result = this.moveBetweenStacks(cardStackInfo, slotStackInfo, true);
          }
        } else if (card) {
          const slotParentCard = exists(gameState.getCard(slotStackInfo.stackId, slotStackInfo.cardIndex - 1));
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
        const card = gameState.getCard(cardStackInfo.stackId, cardStackInfo.cardIndex);
        const slotHasCards = gameState.hasCards(slotStackInfo.stackId);
        if (!slotHasCards) {
          // No parent card; empty slot. Drop is always successful.
          result = this.moveBetweenStacks(cardStackInfo, slotStackInfo, false);
        } else if (card) {
          const slotParentCard = exists(gameState.getCard(slotStackInfo.stackId, slotStackInfo.cardIndex - 1));
          // Has parent card. Drop is only successful if a) the parent is a rank below card and b) parent has opposite color
          if (!Utils.isSameColor(card, slotParentCard) && Utils.isNextInRank(card, slotParentCard)) {
            result = this.moveBetweenStacks(cardStackInfo, slotStackInfo, false);
          }
        }
      } else if (Utils.isFoundationStack(slotStackInfo.stackId) && gameState.isTopCard(cardStackInfo.stackId, cardStackInfo.cardIndex)) {
        // Target is foundation
        const card = gameState.getCard(cardStackInfo.stackId, cardStackInfo.cardIndex);
        const slotHasCards = gameState.hasCards(slotStackInfo.stackId);
        if (!slotHasCards) {
          // No parent card; empty slot. Drop is only successful if it is an ace.
          if (card && Utils.isAceRank(card)) {
            result = this.moveBetweenStacks(cardStackInfo, slotStackInfo, false);
          }
        } else if (card) {
          const slotParentCard = exists(gameState.getCard(slotStackInfo.stackId, slotStackInfo.cardIndex - 1));
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
        const card = gameState.getCard(cardStackInfo.stackId, cardStackInfo.cardIndex);
        const slotHasCards = gameState.hasCards(slotStackInfo.stackId);
        if (!slotHasCards) {
          // No parent card; empty slot. Drop is always successful.
          result = this.moveBetweenStacks(cardStackInfo, slotStackInfo, false);
        } else if (card) {
          const slotParentCard = exists(gameState.getCard(slotStackInfo.stackId, slotStackInfo.cardIndex - 1));
          // Has parent card. Drop is only successful if a) the parent is a rank below card and b) parent has opposite color
          if (!Utils.isSameColor(card, slotParentCard) && Utils.isNextInRank(card, slotParentCard)) {
            result = this.moveBetweenStacks(cardStackInfo, slotStackInfo, false);
          }
        }
      } else if (Utils.isFoundationStack(slotStackInfo.stackId)) {
        // Target is another foundation
        const card = gameState.getCard(cardStackInfo.stackId, cardStackInfo.cardIndex);
        const slotHasCards = gameState.hasCards(slotStackInfo.stackId);
        if (!slotHasCards) {
          // No parent card; empty slot. Drop is successful.
          if (card && Utils.isAceRank(card)) {
            result = this.moveBetweenStacks(cardStackInfo, slotStackInfo, false);
          }
        }
        // If slot already has cards, drop is rejected always.
      }
    }
    if (result) {
      this.gameState.incrementActionCount();
    }
    this.notifyContextStateChange(result);
  }
  // Implements PlayingCardsContextListener.onInvalidDrop
  public onInvalidDrop(_card: PlayingCardStackInfo) {
    this.notifyContextStateChange(false);
  }

  private moveBetweenStacks(card: PlayingCardStackInfo, slot: PlayingCardStackInfo, showCardParent: boolean): boolean {
    const sourceStackId = card.stackId as SolitaireCardStack;
    const sourceStackCardIndex = card.cardIndex;
    const sourceStack = this.gameState.getStackCopy(sourceStackId);
    const targetStackId = slot.stackId as SolitaireCardStack;
    const targetStackCardIndex = slot.cardIndex;
    const targetStack = this.gameState.getStackCopy(targetStackId);

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
        this.gameState.setCardStack(sourceStackId, sourceStackCopy);

        // Add card and next siblings to target stack
        const targetStackCopy = { ...targetStack };
        const targetStackCardsCopy = [...targetStackCopy.cards];
        targetStackCardsCopy.splice(targetStackCardIndex, 0, ...cardsToMove);
        targetStackCopy.cards = targetStackCardsCopy;
        this.gameState.setCardStack(targetStackId, targetStackCopy);

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
        this.gameState.setCardStack(sourceStackId, sourceStackCopy);

        // Add the one card to the target stack
        const targetStackCopy = { ...targetStack };
        const targetStackCardsCopy = [...targetStackCopy.cards];
        targetStackCardsCopy.splice(targetStackCardIndex, 0, ...cardsToMove);
        targetStackCopy.cards = targetStackCardsCopy;
        this.gameState.setCardStack(targetStackId, targetStackCopy);
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

  private notifyContextStateChange(modelChanged: boolean) {
    this.changeListeners.forEach((callback) => callback(modelChanged));
  }
}
