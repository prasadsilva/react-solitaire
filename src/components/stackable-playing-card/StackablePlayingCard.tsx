import { CARD_DIMS_CLASS, LAYOUT_CONSTANTS } from '@/data/constants';
import { OPlayingCardStackBehavior, type PlayingCanvasPosition } from '@/data/types';
import { cn } from '@/lib/utils';
import { PlayingCardsHooks } from '@/utils/game-context';
import { useMemo } from 'react';
import { StackablePlayingCardHolder } from './StackablePlayingCardHolder';
import type { PlayingCardProps } from './types';

export function StackablePlayingCard({ cardStack, stackInfo, position, isPreviousSiblingBeingDragged, ...props }: PlayingCardProps) {
  const { draggableRef, isBeingDragged, currentPosition } = PlayingCardsHooks.useDraggable(stackInfo, position);

  // TODO: These could be moved into the hook?
  const isInDraggedState = useMemo(
    () => (cardStack.behavior === OPlayingCardStackBehavior.MoveAllNextSiblings && isPreviousSiblingBeingDragged) || isBeingDragged,
    [isPreviousSiblingBeingDragged, isBeingDragged],
  );
  const positionForSiblingLayout = cardStack.behavior === OPlayingCardStackBehavior.MoveAllNextSiblings ? currentPosition : position;
  const nextSiblingPosition = useMemo<PlayingCanvasPosition>(
    () => ({
      x: positionForSiblingLayout.x,
      y: positionForSiblingLayout.y + LAYOUT_CONSTANTS.STACKED_CARD_Y_OFFSET,
    }),
    [positionForSiblingLayout],
  );

  return (
    <>
      <div
        {...props}
        ref={draggableRef}
        className="absolute size-fit"
        style={{
          transform: `translateX(${currentPosition.x}px) translateY(${currentPosition.y}px)`,
          zIndex: isInDraggedState ? stackInfo.cardIndex + LAYOUT_CONSTANTS.DRAG_Z_INDEX_OFFSET : stackInfo.cardIndex,
          pointerEvents: isInDraggedState ? 'none' : 'auto',
        }}
      >
        <img src={cardStack.cards[stackInfo.cardIndex].cardImg} className={cn('', CARD_DIMS_CLASS)} draggable={false} />
      </div>
      <StackablePlayingCardHolder
        cardStack={cardStack}
        stackInfo={{ ...stackInfo, cardIndex: stackInfo.cardIndex + 1 }}
        position={nextSiblingPosition}
        isPreviousSiblingBeingDragged={isInDraggedState}
      />
    </>
  );
}
