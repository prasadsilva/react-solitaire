import { SolitaireHooks } from '@/contexts/solitaire/solitaire-context';
import { LAYOUT_CONSTANTS } from '@/data/constants';
import type { PlayingCanvasPosition, PlayingCardStackData, PlayingCardStackView, SolitaireTableauStack } from '@/data/types';
import type { Immutable } from '@/lib';
import { useMemo, type ComponentProps } from 'react';
import { StackablePlayingCards } from './stackable-playing-card';

export type TableauPileProps = Immutable<{
  tableauId: SolitaireTableauStack;
  position: PlayingCanvasPosition;
}> &
  ComponentProps<'div'>;

export function TableauPile({ tableauId, position, ...props }: TableauPileProps) {
  const { tableauMeta, tableauCards } = SolitaireHooks.useTableau(tableauId);
  const data = useMemo<PlayingCardStackData>(
    () => ({
      meta: tableauMeta,
      cards: tableauCards,
    }),
    [tableauMeta, tableauCards],
  );
  const view = useMemo<PlayingCardStackView>(
    () => ({
      position,
      stackedCardOffsetX: LAYOUT_CONSTANTS.TABLEAU_PILE_CARD_XOFFSET,
      stackedCardOffsetY: LAYOUT_CONSTANTS.TABLEAU_PILE_CARD_YOFFSET,
    }),
    [position],
  );

  return <StackablePlayingCards {...props} data={data} view={view} firstCardDataIndex={0} />;
}
