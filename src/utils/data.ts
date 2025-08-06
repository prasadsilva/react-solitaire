import Card2C from '@/assets/2C.svg';
import Card2D from '@/assets/2D.svg';
import Card2H from '@/assets/2H.svg';
import Card2S from '@/assets/2S.svg';
import { LAYOUT_CONSTANTS } from '@/utils/constants';
import { OPlayingCardStackBehavior, OSuit, type PlayingCardStackData } from './types';

export const initialCardStacks: PlayingCardStackData[] = [
  {
    cards: [
      { suit: OSuit.Clubs, rank: 1, cardImg: Card2C },
      { suit: OSuit.Diamonds, rank: 1, cardImg: Card2D },
    ],
    behavior: OPlayingCardStackBehavior.MoveAllNextSiblings,
    hasDropTarget: true,
    position: { x: 20, y: LAYOUT_CONSTANTS.TOP_ROW_Y },
  },
  {
    cards: [{ suit: OSuit.Spades, rank: 1, cardImg: Card2S }],
    behavior: OPlayingCardStackBehavior.MoveAllNextSiblings,
    hasDropTarget: true,
    position: { x: 130, y: LAYOUT_CONSTANTS.TOP_ROW_Y },
  },
  {
    cards: [{ suit: OSuit.Hearts, rank: 1, cardImg: Card2H }],
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
