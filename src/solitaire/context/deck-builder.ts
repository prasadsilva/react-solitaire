import { AllCardsC, AllCardsD, AllCardsH, AllCardsS } from '@/playing-cards/context/card-meta';
import { type PlayingCardList } from '@/playing-cards/context/types';
import { OSolitaireTableauStack, type SolitaireTableauStack } from './types';

interface NewSolitaireGameData {
  drawCards: PlayingCardList;
  tableauCards: { [key: SolitaireTableauStack]: PlayingCardList };
}

export function generateNewSolitaireGameData(): NewSolitaireGameData {
  const allCardsMeta = [...AllCardsC, ...AllCardsD, ...AllCardsH, ...AllCardsS];

  // Durstenfeld shuffle - https://en.wikipedia.org/wiki/Fisher–Yates_shuffle#The_modern_algorithm
  // https://stackoverflow.com/a/12646864/2847817
  for (let i = allCardsMeta.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allCardsMeta[i], allCardsMeta[j]] = [allCardsMeta[j], allCardsMeta[i]];
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
  const tableauCards: { [key: SolitaireTableauStack]: PlayingCardList } = {
    [OSolitaireTableauStack.Tableau1]: [],
    [OSolitaireTableauStack.Tableau2]: [],
    [OSolitaireTableauStack.Tableau3]: [],
    [OSolitaireTableauStack.Tableau4]: [],
    [OSolitaireTableauStack.Tableau5]: [],
    [OSolitaireTableauStack.Tableau6]: [],
    [OSolitaireTableauStack.Tableau7]: [],
  };
  while (tableauTracker.length > 0) {
    tableauTracker.forEach((tableauKey, idx) => {
      const cardMeta = allCardsMeta.pop();
      if (cardMeta) {
        tableauCards[tableauKey].push({ meta: cardMeta, showingFace: idx === 0 });
      }
    });
    tableauTracker.splice(0, 1);
  }

  const drawCards = allCardsMeta.map((meta) => ({ meta, showingFace: false }));

  return {
    drawCards,
    tableauCards,
  };
}
