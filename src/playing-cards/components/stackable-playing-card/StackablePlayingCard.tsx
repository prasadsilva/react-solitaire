import { PlayingCardsHooks } from '@/contexts/playing-cards/playing-cards-context';
import { OPlayingCardStackMoveBehavior } from '@/contexts/playing-cards/types';
import { CARD_DIMS_CLASS, LAYOUT_CONSTANTS } from '@/contexts/solitaire/constants';
import CardBack from '@/playing-cards/assets/1B.svg';
import { cn } from '@/utils';
import { useMemo } from 'react';
import { StackableDraggedPlayingCards } from './StackableDraggedPlayingCards';
import { StackablePlayingCardHolder } from './StackablePlayingCardHolder';
import type { StackablePlayingCardProps } from './types';

export function StackablePlayingCard({ data, view, index, dataIndex, hidden }: StackablePlayingCardProps) {
  const { draggableRef, isBeingDragged, currentPosition } = PlayingCardsHooks.useDraggable(
    { stackId: data.meta.id, cardIndex: dataIndex },
    view.position,
  );

  const card = data.cards[index];
  const showingFace = card.showingFace;

  // TODO: These could be moved into the hook?
  const isDraggable =
    showingFace &&
    data.meta.moveBehavior !== OPlayingCardStackMoveBehavior.Immovable &&
    (data.meta.moveBehavior !== OPlayingCardStackMoveBehavior.MoveOnlyTop || index === data.cards.length - 1);
  const nextSiblingStaticView = useMemo(
    () => ({
      ...view,
      position: {
        x: view.position.x + view.stackedCardOffsetX * (showingFace ? 1 : 0.5),
        y: view.position.y + view.stackedCardOffsetY * (showingFace ? 1 : 0.5),
      },
    }),
    [view.position, showingFace],
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
        <img src={card.showingFace ? card.meta.cardImg : CardBack} className={cn('', CARD_DIMS_CLASS)} draggable={false} />
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
