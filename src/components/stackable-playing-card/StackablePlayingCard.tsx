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
  const isDraggable = useMemo(
    () => cardStack.behavior !== OPlayingCardStackBehavior.MoveOnlyTop || stackInfo.cardIndex === cardStack.cards.length - 1,
    [],
  );
  const isInDraggedState = useMemo(
    () => (cardStack.behavior === OPlayingCardStackBehavior.MoveAllNextSiblings && isPreviousSiblingBeingDragged) || isBeingDragged,
    [isPreviousSiblingBeingDragged, isBeingDragged],
  );
  const positionForSiblingLayout = cardStack.behavior === OPlayingCardStackBehavior.MoveAllNextSiblings ? currentPosition : position;
  const nextSiblingPosition = useMemo<PlayingCanvasPosition>(
    () => ({
      x: positionForSiblingLayout.x + cardStack.stackedCardOffsetX,
      y: positionForSiblingLayout.y + cardStack.stackedCardOffsetY,
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
          pointerEvents: !isDraggable || isInDraggedState ? 'none' : 'auto',
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
