// NOTE: This file cannot be .d.ts. We are exporting an object.

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

export interface PlayingCardDescriptor {
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
  stackId: number;
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

export const OSolitaireCardStack = {
  Stock: 0,
  Talon: 1,
  Foundation1: 2,
  Foundation2: 3,
  Foundation3: 4,
  Foundation4: 5,
  Tableau1: 6,
  Tableau2: 7,
  Tableau3: 8,
  Tableau4: 9,
  Tableau5: 10,
  Tableau6: 11,
  Tableau7: 12,
};
export type SolitaireCardStack = (typeof OSolitaireCardStack)[keyof typeof OSolitaireCardStack];
// Usage:
// function foo(param: SolitaireCardStack) { ... }
// const someVar = {..., enumValue: OSolitaireCardStack, ... }

export interface PlayingCardStackMeta {
  id: SolitaireCardStack;
  moveBehavior: PlayingCardStackBehavior;
  dropBehavior: PlayingCardStackDropBehavior;
}

export interface PlayingCardStackData {
  meta: PlayingCardStackMeta;
  cards: PlayingCardDescriptor[];
}

export interface PlayingCardStackView {
  position: PlayingCanvasPosition;
  stackedCardOffsetX: number;
  stackedCardOffsetY: number;
}
