import { type PlayingCanvasPosition, type PlayingCardStackData, type PlayingCardStackView } from '@/contexts/playing-cards/types';
import { LAYOUT_CONSTANTS } from '@/contexts/solitaire/constants';
import { SolitaireHooks } from '@/contexts/solitaire/solitaire-context';
import type { SolitaireFoundationStack } from '@/contexts/solitaire/types';
import type { Immutable } from '@/utils';
import { useEffect, useMemo, useState, type ComponentProps } from 'react';
import { StackablePlayingCards } from './stackable-playing-card';

export type FoundationPileProps = Immutable<{
  foundationId: SolitaireFoundationStack;
  position: PlayingCanvasPosition;
}> &
  ComponentProps<'div'>;

export function FoundationPile({ foundationId, position, ...props }: FoundationPileProps) {
  const { foundationMeta, topCard, foundationCount } = SolitaireHooks.useFoundation(foundationId);
  const firstShowDataIndex = useMemo(() => Math.max(foundationCount - 1, 0), [foundationCount]);
  const [viewData, setViewData] = useState<PlayingCardStackData>({
    meta: foundationMeta,
    cards: [],
  });
  const view = useMemo<PlayingCardStackView>(
    () => ({
      position,
      stackedCardOffsetX: LAYOUT_CONSTANTS.FOUNDATION_PILE_CARD_XOFFSET,
      stackedCardOffsetY: LAYOUT_CONSTANTS.FOUNDATION_PILE_CARD_YOFFSET,
    }),
    [position, foundationCount],
  );

  useEffect(() => {
    let cards = [];
    if (topCard) {
      cards.push(topCard);
    }
    setViewData({
      meta: foundationMeta,
      cards,
    });
  }, [topCard]);

  return <StackablePlayingCards {...props} data={viewData} view={view} firstCardDataIndex={firstShowDataIndex} />;
}
