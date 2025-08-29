import { CARD_DIMS_CLASS, LAYOUT_CONSTANTS } from '@/data/constants';
import { cn } from '@/lib/utils';
import type { PlayingCardProps } from './types';

export function StackableDraggedPlayingCards({ data, view, index }: Omit<PlayingCardProps, 'dataIndex'>) {
  const cardPositions = [view.position];
  let startPositionX = view.position.x;
  let startPositionY = view.position.y;
  for (let idx = index + 1; idx < data.cards.length; idx++) {
    const offsetIdx = idx - index;
    cardPositions.push({
      x: startPositionX + offsetIdx * view.stackedCardOffsetX,
      y: startPositionY + offsetIdx * view.stackedCardOffsetY,
    });
  }
  return cardPositions.map((position, draggedIdx) => (
    <div
      key={`dragged-card-${draggedIdx}`}
      className="absolute size-fit"
      style={{
        transform: `translateX(${position.x}px) translateY(${position.y}px)`,
        zIndex: index + LAYOUT_CONSTANTS.DRAG_Z_INDEX_OFFSET,
        pointerEvents: 'none',
      }}
    >
      <img src={data.cards[index + draggedIdx].cardImg} className={cn('', CARD_DIMS_CLASS)} draggable={false} />
    </div>
  ));
}
