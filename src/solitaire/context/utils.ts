import { OSuit, OSuitColor, type PlayingCard, type Suit, type SuitColor } from '@/playing-cards/context/types';
import { objectHasValue } from '@/utils';
import {
  OSolitaireCardStack,
  OSolitaireFoundationStack,
  OSolitaireTableauStack,
  type SolitaireFoundationStack,
  type SolitaireTableauStack,
} from './types';

function isTalonStack(value: string): value is typeof OSolitaireCardStack.Talon {
  return value === OSolitaireCardStack.Talon;
}
function isFoundationStack(value: string): value is SolitaireFoundationStack {
  return objectHasValue(OSolitaireFoundationStack, value);
}
function isTableauStack(value: string): value is SolitaireTableauStack {
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

function isSameColor(card1: PlayingCard, card2: PlayingCard) {
  return getSuitColor(card1.meta.suit) == getSuitColor(card2.meta.suit);
}

function isSameSuit(card1: PlayingCard, card2: PlayingCard) {
  return card1.meta.suit === card2.meta.suit;
}

function isNextInRank(card1: PlayingCard, card2: PlayingCard) {
  return card1.meta.rank === card2.meta.rank - 1;
}

function isAceRank(card: PlayingCard) {
  return card.meta.rank === 0;
}

export default {
  isTalonStack,
  isFoundationStack,
  isTableauStack,
  getSuitColor,
  isSameColor,
  isSameSuit,
  isNextInRank,
  isAceRank,
};
