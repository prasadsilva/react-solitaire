import { StackablePlayingCards } from '@/playing-cards/components/stackable-playing-card';
import type { PlayingCanvasPosition, PlayingCardStackView } from '@/playing-cards/context/types';
import { LAYOUT_CONSTANTS } from '@/solitaire/context/constants';
import { SolitaireHooks } from '@/solitaire/context/solitaire-context';
import type { SolitaireTableauStack } from '@/solitaire/context/types';
import type { Immutable } from '@/utils';
import { useMemo, type ComponentProps } from 'react';

export type SolitaireTableauPileProps = Immutable<{
  tableauId: SolitaireTableauStack;
  position: PlayingCanvasPosition;
}> &
  ComponentProps<'div'>;

export function SolitaireTableauPile({ tableauId, position, ...props }: SolitaireTableauPileProps) {
  const { tableauMeta, tableauCards } = SolitaireHooks.useTableau(tableauId);
  const data = useMemo(
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
