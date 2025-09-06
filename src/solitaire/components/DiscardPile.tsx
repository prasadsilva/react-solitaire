import { StackablePlayingCards } from '@/playing-cards/components/stackable-playing-card';
import { type PlayingCanvasPosition, type PlayingCardStackData, type PlayingCardStackView } from '@/playing-cards/context/types';
import { LAYOUT_CONSTANTS } from '@/solitaire/context/constants';
import { SolitaireHooks } from '@/solitaire/context/solitaire-context';
import type { Immutable } from '@/utils';
import { useEffect, useMemo, useState, type ComponentProps } from 'react';

export type DiscardPilePileProps = Immutable<{
  position: PlayingCanvasPosition;
}> &
  ComponentProps<'div'>;

export function DiscardPile({ position, ...props }: DiscardPilePileProps) {
  const { talonMeta, topCard, nextCard, talonCount } = SolitaireHooks.useTalon();
  const firstShowDataIndex = useMemo(() => Math.max(talonCount - 2, 0), [talonCount]);
  const [viewData, setViewData] = useState<PlayingCardStackData>({
    meta: talonMeta,
    cards: [],
  });
  const view = useMemo<PlayingCardStackView>(
    () => ({
      position,
      stackedCardOffsetX: LAYOUT_CONSTANTS.DISCARD_PILE_CARD_XOFFSET,
      stackedCardOffsetY: LAYOUT_CONSTANTS.DISCARD_PILE_CARD_YOFFSET,
    }),
    [position, talonCount],
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
      meta: talonMeta,
      cards,
    });
  }, [topCard, nextCard]);

  return <StackablePlayingCards {...props} data={viewData} view={view} firstCardDataIndex={firstShowDataIndex} />;
}
