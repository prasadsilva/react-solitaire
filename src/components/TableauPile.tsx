import { LAYOUT_CONSTANTS } from '@/data/constants';
import type { PlayingCanvasPosition, PlayingCardStackData, PlayingCardStackView, SolitaireTableauStack } from '@/data/types';
import type { Immutable } from '@/lib';
import { SolitaireContextHooks } from '@/utils/solitaire-context';
import { useMemo, useState, type ComponentProps } from 'react';
import { StackablePlayingCardsStack } from './stackable-playing-card';

export type TableauPileProps = Immutable<{
  tableauId: SolitaireTableauStack;
  position: PlayingCanvasPosition;
}> &
  ComponentProps<'div'>;

export function TableauPile({ tableauId, position, ...props }: TableauPileProps) {
  const { tableauMeta, tableauCards } = SolitaireContextHooks.useTableau(tableauId);
  const [viewData, setViewData] = useState<PlayingCardStackData>({
    meta: tableauMeta,
    cards: [],
  });
  const view = useMemo<PlayingCardStackView>(
    () => ({
      position,
      stackedCardOffsetX: LAYOUT_CONSTANTS.TABLEAU_PILE_CARD_XOFFSET,
      stackedCardOffsetY: LAYOUT_CONSTANTS.TABLEAU_PILE_CARD_YOFFSET,
    }),
    [position],
  );

  // return (
  //   <div
  //     {...props}
  //     className={`absolute size-fit`}
  //     style={{
  //       left: `${position.x}px`,
  //       top: `${position.y}px`,
  //       pointerEvents: 'none',
  //     }}
  //   >
  //     {tableauCards.length > 0 ? (
  //       <img src={CardBack} className={cn('', CARD_DIMS_CLASS)} draggable={false} />
  //     ) : (
  //       <CardOutline className={cn('stroke-gray-700 dark:stroke-gray-300', CARD_DIMS_CLASS)} />
  //     )}
  //   </div>
  // );

  return <StackablePlayingCardsStack {...props} data={viewData} view={view} />;
}
