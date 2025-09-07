import { StackablePlayingCards } from '@/playing-cards/components/stackable-playing-card';
import { type PlayingCanvasPosition, type PlayingCardStackData, type PlayingCardStackView } from '@/playing-cards/context/types';
import { LAYOUT_CONSTANTS } from '@/solitaire/context/constants';
import { SolitaireHooks } from '@/solitaire/context/solitaire-context';
import type { SolitaireFoundationStack } from '@/solitaire/context/types';
import type { Immutable } from '@/utils';
import { useEffect, useMemo, useState, type ComponentProps } from 'react';

export type SolitaireFoundationPileProps = Immutable<{
  foundationId: SolitaireFoundationStack;
  position: PlayingCanvasPosition;
}> &
  ComponentProps<'div'>;

export function SolitaireFoundationPile({ foundationId, position, ...props }: SolitaireFoundationPileProps) {
  const { foundationMeta, topCard, nextCard, foundationCount } = SolitaireHooks.useFoundation(foundationId);
  const firstShowDataIndex = useMemo(() => Math.max(foundationCount - 2, 0), [foundationCount]);
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
    if (nextCard) {
      cards.push(nextCard);
    }
    if (topCard) {
      cards.push(topCard);
    }
    setViewData({
      meta: foundationMeta,
      cards,
    });
  }, [topCard, nextCard]);

  return <StackablePlayingCards {...props} data={viewData} view={view} firstCardDataIndex={firstShowDataIndex} />;
}
