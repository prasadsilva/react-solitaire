export const OSolitaireFoundationStack = {
  Foundation1: 'foundation1',
  Foundation2: 'foundation2',
  Foundation3: 'foundation3',
  Foundation4: 'foundation4',
} as const;
export type SolitaireFoundationStack = (typeof OSolitaireFoundationStack)[keyof typeof OSolitaireFoundationStack];
// Usage:
// function foo(param: SolitaireFoundationStack) { ... }
// const someVar = {..., enumValue: OSolitaireFoundationStack, ... }

export const OSolitaireTableauStack = {
  Tableau1: 'tableau1',
  Tableau2: 'tableau2',
  Tableau3: 'tableau3',
  Tableau4: 'tableau4',
  Tableau5: 'tableau5',
  Tableau6: 'tableau6',
  Tableau7: 'tableau7',
} as const;
export type SolitaireTableauStack = (typeof OSolitaireTableauStack)[keyof typeof OSolitaireTableauStack];
// Usage:
// function foo(param: SolitaireTableauStack) { ... }
// const someVar = {..., enumValue: OSolitaireTableauStack, ... }

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
} as const;
export type SolitaireCardStack = (typeof OSolitaireCardStack)[keyof typeof OSolitaireCardStack];
// Usage:
// function foo(param: SolitaireCardStack) { ... }
// const someVar = {..., enumValue: OSolitaireCardStack, ... }
