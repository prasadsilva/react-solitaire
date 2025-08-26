import { StackablePlayingCardDropTarget } from '@/components/stackable-playing-card/StackablePlayingCardDropTarget';
import { OPlayingCardStackDropBehavior } from '@/data/types';
import { StackablePlayingCard } from './StackablePlayingCard';
import type { PlayingCardProps } from './types';

export function StackablePlayingCardHolder({ data, view, index, isPreviousSiblingBeingDragged }: PlayingCardProps) {
  const hasValidCard = index < data.cards.length;
  if (hasValidCard) {
    return <StackablePlayingCard data={data} view={view} index={index} isPreviousSiblingBeingDragged={isPreviousSiblingBeingDragged} />;
  }

  if (!isPreviousSiblingBeingDragged && data.meta.dropBehavior === OPlayingCardStackDropBehavior.AcceptsAny) {
    const droptargetStackInfo = { stackId: data.meta.id, cardIndex: data.cards.length };
    const droptargetPosition = {
      x: view.position.x + data.cards.length * view.stackedCardOffsetX,
      y: view.position.y + data.cards.length * view.stackedCardOffsetY,
    };
    return <StackablePlayingCardDropTarget stackInfo={droptargetStackInfo} position={droptargetPosition} />;
  }
}
