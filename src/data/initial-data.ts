import { Card2C, Card4D, CardAH, CardKS } from '@/data/card-svgs';
import { LAYOUT_CONSTANTS } from '@/data/constants';
import { OPlayingCardStackBehavior, OSuit, type PlayingCardStackData } from './types';

export const initialCardStacks: PlayingCardStackData[] = [
  {
    cards: [
      { suit: OSuit.Clubs, rank: 1, cardImg: Card2C },
      { suit: OSuit.Diamonds, rank: 1, cardImg: Card4D },
    ],
    behavior: OPlayingCardStackBehavior.MoveAllNextSiblings,
    hasDropTarget: true,
    position: { x: 20, y: LAYOUT_CONSTANTS.TOP_ROW_Y },
  },
  {
    cards: [{ suit: OSuit.Spades, rank: 1, cardImg: CardKS }],
    behavior: OPlayingCardStackBehavior.MoveAllNextSiblings,
    hasDropTarget: true,
    position: { x: 130, y: LAYOUT_CONSTANTS.TOP_ROW_Y },
  },
  {
    cards: [{ suit: OSuit.Hearts, rank: 1, cardImg: CardAH }],
    behavior: OPlayingCardStackBehavior.MoveAllNextSiblings,
    hasDropTarget: true,
    position: { x: 240, y: LAYOUT_CONSTANTS.TOP_ROW_Y },
  },
  {
    cards: [],
    behavior: OPlayingCardStackBehavior.MoveIndividually,
    hasDropTarget: true,
    position: { x: 20, y: LAYOUT_CONSTANTS.BOTTOM_ROW_Y },
  },
  {
    cards: [],
    behavior: OPlayingCardStackBehavior.MoveIndividually,
    hasDropTarget: true,
    position: { x: 130, y: LAYOUT_CONSTANTS.BOTTOM_ROW_Y },
  },
  {
    cards: [],
    behavior: OPlayingCardStackBehavior.MoveIndividually,
    hasDropTarget: true,
    position: { x: 240, y: LAYOUT_CONSTANTS.BOTTOM_ROW_Y },
  },
];
