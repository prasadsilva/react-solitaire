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

export interface PlayingCardDescriptor {
  suit: Suit;
  //    A                                            J    Q    K
  rank: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  cardImg: string;
}

export type PlayingCardDescriptorList = PlayingCardDescriptor[];

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

export const OSolitaireFoundationStack = {
  Foundation1: 'foundation1',
  Foundation2: 'foundation2',
  Foundation3: 'foundation3',
  Foundation4: 'foundation4',
};
export type SolitaireFoundationStack = (typeof OSolitaireFoundationStack)[keyof typeof OSolitaireFoundationStack];

export const OSolitaireTableauStack = {
  Tableau1: 'tableau1',
  Tableau2: 'tableau2',
  Tableau3: 'tableau3',
  Tableau4: 'tableau4',
  Tableau5: 'tableau5',
  Tableau6: 'tableau6',
  Tableau7: 'tableau7',
};
export type SolitaireTableauStack = (typeof OSolitaireTableauStack)[keyof typeof OSolitaireTableauStack];

export const OSolitaireCardStack = {
  Stock: 'stock',
  Talon: 'talon',
  Foundation1: OSolitaireFoundationStack.Foundation1,
  Foundation2: OSolitaireFoundationStack.Foundation2,
  Foundation3: OSolitaireFoundationStack.Foundation3,
  Foundation4: OSolitaireFoundationStack.Foundation4,
  Tableau1: OSolitaireTableauStack.Tableau1,
  Tableau2: OSolitaireTableauStack.Tableau2,
  Tableau3: OSolitaireTableauStack.Tableau3,
  Tableau4: OSolitaireTableauStack.Tableau4,
  Tableau5: OSolitaireTableauStack.Tableau5,
  Tableau6: OSolitaireTableauStack.Tableau6,
  Tableau7: OSolitaireTableauStack.Tableau7,
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
  cards: PlayingCardDescriptorList;
}

export interface PlayingCardStackView {
  position: PlayingCanvasPosition;
  stackedCardOffsetX: number;
  stackedCardOffsetY: number;
}
