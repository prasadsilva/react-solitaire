import { AllCardsC, AllCardsD, AllCardsH, AllCardsS } from '@/data/cards';

export function generateNewSolitaireDeck() {
  const allCards = [...AllCardsC, ...AllCardsD, ...AllCardsH, ...AllCardsS];

  // Durstenfeld shuffle - https://en.wikipedia.org/wiki/Fisher–Yates_shuffle#The_modern_algorithm
  // https://stackoverflow.com/a/12646864/2847817
  for (let i = allCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
  }

  return allCards;
}
