import { LAYOUT_CONSTANTS } from '@/data/constants';
import { Card2C, Card4D, CardAH, CardKS } from './cards';
import { OPlayingCardStackBehavior, type PlayingCardStackData } from './types';

export const initialCardStacks: PlayingCardStackData[] = [
  {
    cards: [Card2C, Card4D],
    behavior: OPlayingCardStackBehavior.MoveAllNextSiblings,
    hasDropTarget: true,
    position: { x: 20, y: LAYOUT_CONSTANTS.TOP_ROW_Y },
  },
  {
    cards: [CardKS],
    behavior: OPlayingCardStackBehavior.MoveAllNextSiblings,
    hasDropTarget: true,
    position: { x: 130, y: LAYOUT_CONSTANTS.TOP_ROW_Y },
  },
  {
    cards: [CardAH],
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
