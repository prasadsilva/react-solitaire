import { LAYOUT_CONSTANTS } from '@/data/constants';
import { OPlayingCardStackBehavior, type PlayingCanvasPosition, type PlayingCardStackData } from '@/data/types';
import type { Immutable } from '@/lib';
import { SolitaireContextHooks } from '@/utils/solitaire-context';
import { useEffect, useState, type ComponentProps } from 'react';
import { StackablePlayingCardsStack } from './stackable-playing-card';

export type DiscardPilePileProps = Immutable<{
  position: PlayingCanvasPosition;
}> &
  ComponentProps<'div'>;

export function DiscardPile({ position, ...props }: DiscardPilePileProps) {
  const { topCard, nextCard } = SolitaireContextHooks.useDiscardPile();
  const [cardStack, setCardStack] = useState<PlayingCardStackData>({
    cards: [],
    position,
    hasDropTarget: false,
    behavior: OPlayingCardStackBehavior.MoveOnlyTop,
    stackedCardOffsetX: LAYOUT_CONSTANTS.DISCARD_PILE_CARD_XOFFSET,
    stackedCardOffsetY: LAYOUT_CONSTANTS.DISCARD_PILE_CARD_YOFFSET,
  });

  useEffect(() => {
    let cards = [];
    if (nextCard) {
      cards.push(nextCard);
    }
    if (topCard) {
      cards.push(topCard);
    }
    setCardStack({
      cards,
      position,
      hasDropTarget: false,
      behavior: OPlayingCardStackBehavior.MoveOnlyTop,
      stackedCardOffsetX: LAYOUT_CONSTANTS.DISCARD_PILE_CARD_XOFFSET,
      stackedCardOffsetY: LAYOUT_CONSTANTS.DISCARD_PILE_CARD_YOFFSET,
    });
  }, [topCard, nextCard]);

  return <StackablePlayingCardsStack {...props} cardStack={cardStack} stackIndex={100} />;
}
