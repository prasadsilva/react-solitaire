import CardBack from '@/assets/1B.svg';
import { CARD_DIMS_CLASS, LAYOUT_CONSTANTS } from '@/contexts/solitaire/constants';
import { cn } from '@/lib/utils';
import type { StackablePlayingCardProps } from './types';

// NOTE: Dragged playing cards are expected to be showing face (including siblings)
export function StackableDraggedPlayingCards({ data, view, index }: Omit<StackablePlayingCardProps, 'dataIndex'>) {
  const card = data.cards[index];

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
      <img src={card.showingFace ? card.meta.cardImg : CardBack} className={cn('', CARD_DIMS_CLASS)} draggable={false} />
    </div>
  ));
}
