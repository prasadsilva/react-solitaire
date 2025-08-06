import { StackablePlayingCardDropTarget } from '@/components/stackable-playing-card/StackablePlayingCardDropTarget';
import { LAYOUT_CONSTANTS } from '@/data/constants';
import { useMemo } from 'react';
import { StackablePlayingCard } from './StackablePlayingCard';
import type { PlayingCardProps } from './types';

export function StackablePlayingCardHolder({ cardStack, stackInfo, position, isPreviousSiblingBeingDragged, ...props }: PlayingCardProps) {
  const droptargetStackInfo = useMemo(() => ({ ...stackInfo, cardIndex: cardStack.cards.length }), [cardStack.cards]);
  const droptargetPosition = useMemo(
    () => ({
      x: cardStack.position.x,
      y: cardStack.position.y + cardStack.cards.length * LAYOUT_CONSTANTS.STACKED_CARD_Y_OFFSET,
    }),
    [cardStack.position, cardStack.cards],
  );

  return stackInfo.cardIndex < cardStack.cards.length ? (
    <StackablePlayingCard
      {...props}
      cardStack={cardStack}
      stackInfo={stackInfo}
      position={position}
      isPreviousSiblingBeingDragged={isPreviousSiblingBeingDragged}
    />
  ) : (
    cardStack.hasDropTarget && <StackablePlayingCardDropTarget stackInfo={droptargetStackInfo} position={droptargetPosition} />
  );
}
