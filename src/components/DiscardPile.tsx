import { LAYOUT_CONSTANTS } from '@/data/constants';
import { type PlayingCanvasPosition, type PlayingCardStackData, type PlayingCardStackView } from '@/data/types';
import type { Immutable } from '@/lib';
import { SolitaireContextHooks } from '@/utils/solitaire-context';
import { useEffect, useMemo, useState, type ComponentProps } from 'react';
import { StackablePlayingCardsStack } from './stackable-playing-card';

export type DiscardPilePileProps = Immutable<{
  position: PlayingCanvasPosition;
}> &
  ComponentProps<'div'>;

export function DiscardPile({ position, ...props }: DiscardPilePileProps) {
  const { talonMeta, topCard, nextCard } = SolitaireContextHooks.useTalon();
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
    [position],
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

  return <StackablePlayingCardsStack {...props} data={viewData} view={view} />;
}
