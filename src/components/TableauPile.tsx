import { LAYOUT_CONSTANTS } from '@/data/constants';
import type { PlayingCanvasPosition, PlayingCardStackData, PlayingCardStackView, SolitaireTableauStack } from '@/data/types';
import type { Immutable } from '@/lib';
import { SolitaireContextHooks } from '@/utils/solitaire-context';
import { useMemo, type ComponentProps } from 'react';
import { StackablePlayingCardsStack } from './stackable-playing-card';

export type TableauPileProps = Immutable<{
  tableauId: SolitaireTableauStack;
  position: PlayingCanvasPosition;
}> &
  ComponentProps<'div'>;

export function TableauPile({ tableauId, position, ...props }: TableauPileProps) {
  const { tableauMeta, tableauCards } = SolitaireContextHooks.useTableau(tableauId);
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

  return <StackablePlayingCardsStack {...props} data={data} view={view} />;
}
