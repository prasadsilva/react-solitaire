import { StackablePlayingCardDropTarget } from '@/components/stackable-playing-card/StackablePlayingCardDropTarget';
import { OPlayingCardStackDropBehavior } from '@/data/types';
import { StackablePlayingCard } from './StackablePlayingCard';
import type { PlayingCardProps } from './types';

export function StackablePlayingCardHolder({ data, view, index, dataIndex, hidden }: PlayingCardProps) {
  const hasValidCard = index < data.cards.length;
  if (hasValidCard) {
    return <StackablePlayingCard data={data} view={view} index={index} dataIndex={dataIndex} hidden={hidden} />;
  }

  if (data.meta.dropBehavior === OPlayingCardStackDropBehavior.AcceptsAny) {
    const droptargetStackInfo = { stackId: data.meta.id, cardIndex: data.cards.length };
    return <StackablePlayingCardDropTarget stackInfo={droptargetStackInfo} position={view.position} />;
  }
}
