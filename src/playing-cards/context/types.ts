// NOTE: This file cannot be .d.ts. We are exporting an object.

export const OSuitColor = {
  Red: 0,
  Black: 1,
} as const;
export type SuitColor = (typeof OSuitColor)[keyof typeof OSuitColor];

// https://www.typescriptlang.org/docs/handbook/enums.html#objects-vs-enums
export const OSuit = {
  Clubs: 0,
  Diamonds: 1,
  Hearts: 2,
  Spades: 3,
} as const;
export type Suit = (typeof OSuit)[keyof typeof OSuit];
// Usage:
// function foo(param: Suit) { ... }
// const someVar = {..., enumValue: OSuit, ... }

export interface PlayingCardMeta {
  suit: Suit;
  //    A                                            J    Q    K
  rank: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  cardImg: string;
}

export interface PlayingCanvasPosition {
  x: number;
  y: number;
}

export interface PlayingCardStackInfo {
  stackId: string;
  cardIndex: number;
}

export const OPlayingCardStackMoveBehavior = {
  Immovable: 0,
  MoveIndividually: 1,
  MoveAllNextSiblings: 2,
  MoveOnlyTop: 3,
} as const;
export type PlayingCardStackBehavior = (typeof OPlayingCardStackMoveBehavior)[keyof typeof OPlayingCardStackMoveBehavior];
// Usage:
// function foo(param: StackBehavior) { ... }
// const someVar = {..., enumValue: OStackBehavior, ... }

export const OPlayingCardStackDropBehavior = {
  NotAccepting: 0,
  AcceptsAny: 1,
} as const;
export type PlayingCardStackDropBehavior = (typeof OPlayingCardStackDropBehavior)[keyof typeof OPlayingCardStackDropBehavior];
// Usage:
// function foo(param: StackBehavior) { ... }
// const someVar = {..., enumValue: OStackBehavior, ... }

export interface PlayingCard {
  meta: PlayingCardMeta;
  showingFace: boolean;
}

export type PlayingCardList = PlayingCard[];

export interface PlayingCardStackMeta {
  id: string;
  moveBehavior: PlayingCardStackBehavior;
  dropBehavior: PlayingCardStackDropBehavior;
}

export interface PlayingCardStackData {
  meta: PlayingCardStackMeta;
  cards: PlayingCardList;
}

export interface PlayingCardStackView {
  position: PlayingCanvasPosition;
  stackedCardOffsetX: number;
  stackedCardOffsetY: number;
}
