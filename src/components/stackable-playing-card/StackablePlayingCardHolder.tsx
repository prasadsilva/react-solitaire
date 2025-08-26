import { StackablePlayingCardDropTarget } from '@/components/stackable-playing-card/StackablePlayingCardDropTarget';
import { OPlayingCardStackDropBehavior, type PlayingCanvasPosition, type PlayingCardStackInfo } from '@/data/types';
import { useMemo } from 'react';
import { StackablePlayingCard } from './StackablePlayingCard';
import type { PlayingCardProps } from './types';

export function StackablePlayingCardHolder({ data, view, index, isPreviousSiblingBeingDragged, ...props }: PlayingCardProps) {
  const droptargetStackInfo = useMemo<PlayingCardStackInfo>(() => ({ stackId: data.meta.id, cardIndex: data.cards.length }), [data.cards]);
  const droptargetPosition = useMemo<PlayingCanvasPosition>(
    () => ({
      x: view.position.x + data.cards.length * view.stackedCardOffsetX,
      y: view.position.y + data.cards.length * view.stackedCardOffsetY,
    }),
    [view.position, data.cards],
  );

  return index < data.cards.length ? (
    <StackablePlayingCard {...props} data={data} view={view} index={index} isPreviousSiblingBeingDragged={isPreviousSiblingBeingDragged} />
  ) : (
    data.meta.dropBehavior === OPlayingCardStackDropBehavior.AcceptsAny && (
      <StackablePlayingCardDropTarget stackInfo={droptargetStackInfo} position={droptargetPosition} />
    )
  );
}
