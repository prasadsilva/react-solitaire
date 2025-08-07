import { LAYOUT_CONSTANTS } from '@/data/constants';
import { Card2C, Card4D, CardAH, CardKS } from './cards';
import { OPlayingCardStackBehavior, type PlayingCardStackData } from './types';

export const initialCardStacks: PlayingCardStackData[] = [
  {
    cards: [Card2C, Card4D],
    behavior: OPlayingCardStackBehavior.MoveAllNextSiblings,
    hasDropTarget: true,
    position: { x: 20, y: LAYOUT_CONSTANTS.TABLEAU_STACKS_Y },
  },
  {
    cards: [CardKS],
    behavior: OPlayingCardStackBehavior.MoveAllNextSiblings,
    hasDropTarget: true,
    position: { x: 130, y: LAYOUT_CONSTANTS.TABLEAU_STACKS_Y },
  },
  {
    cards: [CardAH],
    behavior: OPlayingCardStackBehavior.MoveAllNextSiblings,
    hasDropTarget: true,
    position: { x: 240, y: LAYOUT_CONSTANTS.TABLEAU_STACKS_Y },
  },
  {
    cards: [],
    behavior: OPlayingCardStackBehavior.MoveAllNextSiblings,
    hasDropTarget: true,
    position: { x: 350, y: LAYOUT_CONSTANTS.TABLEAU_STACKS_Y },
  },
  {
    cards: [],
    behavior: OPlayingCardStackBehavior.MoveAllNextSiblings,
    hasDropTarget: true,
    position: { x: 460, y: LAYOUT_CONSTANTS.TABLEAU_STACKS_Y },
  },
  {
    cards: [],
    behavior: OPlayingCardStackBehavior.MoveAllNextSiblings,
    hasDropTarget: true,
    position: { x: 580, y: LAYOUT_CONSTANTS.TABLEAU_STACKS_Y },
  },
  {
    cards: [],
    behavior: OPlayingCardStackBehavior.MoveAllNextSiblings,
    hasDropTarget: true,
    position: { x: 700, y: LAYOUT_CONSTANTS.TABLEAU_STACKS_Y },
  },
];
