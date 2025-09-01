import { AllCardsC, AllCardsD, AllCardsH, AllCardsS } from '@/data/cards';
import {
  OSolitaireTableauStack,
  type PlayingCardDescriptor,
  type PlayingCardDescriptorList,
  type SolitaireTableauStack,
} from '@/data/types';

interface NewSolitaireGameData {
  drawCards: PlayingCardDescriptor[];
  tableauCards: { [key: SolitaireTableauStack]: PlayingCardDescriptorList };
}

export function generateNewSolitaireGameData(): NewSolitaireGameData {
  const allCards = [...AllCardsC, ...AllCardsD, ...AllCardsH, ...AllCardsS];

  // Durstenfeld shuffle - https://en.wikipedia.org/wiki/Fisher–Yates_shuffle#The_modern_algorithm
  // https://stackoverflow.com/a/12646864/2847817
  for (let i = allCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
  }

  // Deal the tableau cards
  const tableauTracker = [
    OSolitaireTableauStack.Tableau1,
    OSolitaireTableauStack.Tableau2,
    OSolitaireTableauStack.Tableau3,
    OSolitaireTableauStack.Tableau4,
    OSolitaireTableauStack.Tableau5,
    OSolitaireTableauStack.Tableau6,
    OSolitaireTableauStack.Tableau7,
  ];
  const tableauCards: { [key: SolitaireTableauStack]: PlayingCardDescriptorList } = {
    [OSolitaireTableauStack.Tableau1]: [],
    [OSolitaireTableauStack.Tableau2]: [],
    [OSolitaireTableauStack.Tableau3]: [],
    [OSolitaireTableauStack.Tableau4]: [],
    [OSolitaireTableauStack.Tableau5]: [],
    [OSolitaireTableauStack.Tableau6]: [],
    [OSolitaireTableauStack.Tableau7]: [],
  };
  while (tableauTracker.length > 0) {
    tableauTracker.forEach((tableauKey) => {
      const card = allCards.pop();
      if (card) {
        tableauCards[tableauKey].push(card);
      }
    });
    tableauTracker.splice(0, 1);
  }

  return {
    drawCards: allCards,
    tableauCards,
  };
}
