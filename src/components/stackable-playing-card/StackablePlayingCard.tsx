import { CARD_DIMS_CLASS, LAYOUT_CONSTANTS } from '@/data/constants';
import { OPlayingCardStackMoveBehavior } from '@/data/types';
import { cn } from '@/lib/utils';
import { PlayingCardsHooks } from '@/utils/game-context';
import { useMemo } from 'react';
import { StackableDraggedPlayingCards } from './StackableDraggedPlayingCards';
import { StackablePlayingCardHolder } from './StackablePlayingCardHolder';
import type { PlayingCardProps } from './types';

export function StackablePlayingCard({ data, view, index, dataIndex, hidden }: PlayingCardProps) {
  const { draggableRef, isBeingDragged, currentPosition } = PlayingCardsHooks.useDraggable(
    { stackId: data.meta.id, cardIndex: dataIndex },
    view.position,
  );
  // console.log(`card.dataIndex[${data.meta.id}]: ${dataIndex}`);

  // TODO: These could be moved into the hook?
  const isDraggable = data.meta.moveBehavior !== OPlayingCardStackMoveBehavior.MoveOnlyTop || index === data.cards.length - 1;
  const nextSiblingStaticView = useMemo(
    () => ({
      ...view,
      position: {
        x: view.position.x + view.stackedCardOffsetX,
        y: view.position.y + view.stackedCardOffsetY,
      },
    }),
    [view.position],
  );
  const nextSiblingDragView = {
    ...view,
    position: {
      x: currentPosition.x + view.stackedCardOffsetX,
      y: currentPosition.y + view.stackedCardOffsetY,
    },
  };

  return (
    <>
      <div
        ref={draggableRef}
        className="absolute size-fit"
        style={{
          transform: `translateX(${currentPosition.x}px) translateY(${currentPosition.y}px)`,
          zIndex: isBeingDragged ? index + LAYOUT_CONSTANTS.DRAG_Z_INDEX_OFFSET : index,
          pointerEvents: hidden || !isDraggable || isBeingDragged ? 'none' : 'auto',
          opacity: hidden ? 0 : 1,
        }}
      >
        <img src={data.cards[index].cardImg} className={cn('', CARD_DIMS_CLASS)} draggable={false} />
      </div>
      {/* Hide the in-place siblings when dragging and show a static stack instead for performance reasons */}
      <StackablePlayingCardHolder
        data={data}
        view={nextSiblingStaticView}
        index={index + 1}
        dataIndex={dataIndex + 1}
        hidden={hidden || isBeingDragged}
      />
      {isBeingDragged && index < data.cards.length - 1 && (
        <StackableDraggedPlayingCards data={data} view={nextSiblingDragView} index={index + 1} />
      )}
    </>
  );
}
