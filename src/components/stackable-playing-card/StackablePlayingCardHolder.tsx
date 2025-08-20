import { StackablePlayingCardDropTarget } from '@/components/stackable-playing-card/StackablePlayingCardDropTarget';
import { useMemo } from 'react';
import { StackablePlayingCard } from './StackablePlayingCard';
import type { PlayingCardProps } from './types';

export function StackablePlayingCardHolder({ cardStack, stackInfo, position, isPreviousSiblingBeingDragged, ...props }: PlayingCardProps) {
  const droptargetStackInfo = useMemo(() => ({ ...stackInfo, cardIndex: cardStack.cards.length }), [cardStack.cards]);
  const droptargetPosition = useMemo(
    () => ({
      x: cardStack.position.x + cardStack.cards.length * cardStack.stackedCardOffsetX,
      y: cardStack.position.y + cardStack.cards.length * cardStack.stackedCardOffsetY,
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
