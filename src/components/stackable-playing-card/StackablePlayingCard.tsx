import { CARD_DIMS_CLASS, LAYOUT_CONSTANTS } from '@/data/constants';
import { OPlayingCardStackMoveBehavior } from '@/data/types';
import { cn } from '@/lib/utils';
import { PlayingCardsHooks } from '@/utils/game-context';
import { StackablePlayingCardHolder } from './StackablePlayingCardHolder';
import type { PlayingCardProps } from './types';

export function StackablePlayingCard({ data, view, index, isPreviousSiblingBeingDragged }: PlayingCardProps) {
  const { draggableRef, isBeingDragged, currentPosition } = PlayingCardsHooks.useDraggable(
    { stackId: data.meta.id, cardIndex: index },
    view.position,
  );

  // TODO: These could be moved into the hook?
  const isDraggable = data.meta.moveBehavior !== OPlayingCardStackMoveBehavior.MoveOnlyTop || index === data.cards.length - 1;
  const isInDraggedState =
    (data.meta.moveBehavior === OPlayingCardStackMoveBehavior.MoveAllNextSiblings && isPreviousSiblingBeingDragged) || isBeingDragged;
  const positionForSiblingLayout =
    data.meta.moveBehavior === OPlayingCardStackMoveBehavior.MoveAllNextSiblings ? currentPosition : view.position;
  const nextSiblingView = {
    ...view,
    position: {
      x: positionForSiblingLayout.x + view.stackedCardOffsetX,
      y: positionForSiblingLayout.y + view.stackedCardOffsetY,
    },
  };

  return (
    <>
      <div
        ref={draggableRef}
        className="absolute size-fit"
        style={{
          transform: `translateX(${currentPosition.x}px) translateY(${currentPosition.y}px)`,
          zIndex: isInDraggedState ? index + LAYOUT_CONSTANTS.DRAG_Z_INDEX_OFFSET : index,
          pointerEvents: !isDraggable || isInDraggedState ? 'none' : 'auto',
        }}
      >
        <img src={data.cards[index].cardImg} className={cn('', CARD_DIMS_CLASS)} draggable={false} />
      </div>
      <StackablePlayingCardHolder data={data} view={nextSiblingView} index={index + 1} isPreviousSiblingBeingDragged={isInDraggedState} />
    </>
  );
}
