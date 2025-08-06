import { PlayingCardDropTarget } from '@/components/drop-target/PlayingCardDropTarget';
import { LAYOUT_CONSTANTS } from '@/utils/constants';
import { useMemo } from 'react';
import { PlayingCard } from './StackablePlayingCard';
import type { PlayingCardProps } from './types';

export function PlayingCardHolder({ cardStack, stackInfo, position, isPreviousSiblingBeingDragged, ...props }: PlayingCardProps) {
  const droptargetStackInfo = useMemo(() => ({ ...stackInfo, cardIndex: cardStack.cards.length }), [cardStack.cards]);
  const droptargetPosition = useMemo(
    () => ({
      x: cardStack.position.x,
      y: cardStack.position.y + cardStack.cards.length * LAYOUT_CONSTANTS.STACKED_CARD_Y_OFFSET,
    }),
    [cardStack.position, cardStack.cards],
  );
  return stackInfo.cardIndex < cardStack.cards.length ? (
    <PlayingCard
      {...props}
      cardStack={cardStack}
      stackInfo={stackInfo}
      position={position}
      isPreviousSiblingBeingDragged={isPreviousSiblingBeingDragged}
    />
  ) : (
    cardStack.hasDropTarget && <PlayingCardDropTarget stackInfo={droptargetStackInfo} position={droptargetPosition} />
  );
}
