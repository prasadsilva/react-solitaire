import type { PlayingCanvasPosition, PlayingCardStackData, PlayingCardStackView } from '@/contexts/playing-cards/types';
import { LAYOUT_CONSTANTS } from '@/contexts/solitaire/constants';
import { SolitaireHooks } from '@/contexts/solitaire/solitaire-context';
import type { SolitaireTableauStack } from '@/contexts/solitaire/types';
import { StackablePlayingCards } from '@/playing-cards/components/stackable-playing-card';
import type { Immutable } from '@/utils';
import { useMemo, type ComponentProps } from 'react';

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
