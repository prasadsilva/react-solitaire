import { OPlayingCardStackDropBehavior } from '@/contexts/playing-cards/types';
import { StackablePlayingCardDropTarget } from '@/playing-cards/components/stackable-playing-card/StackablePlayingCardDropTarget';
import { StackablePlayingCard } from './StackablePlayingCard';
import type { StackablePlayingCardProps } from './types';

export function StackablePlayingCardHolder({ data, view, index, dataIndex, hidden }: StackablePlayingCardProps) {
  const hasValidCard = index < data.cards.length;
  if (hasValidCard) {
    return <StackablePlayingCard data={data} view={view} index={index} dataIndex={dataIndex} hidden={hidden} />;
  }

  if (data.meta.dropBehavior === OPlayingCardStackDropBehavior.AcceptsAny) {
    const droptargetStackInfo = { stackId: data.meta.id, cardIndex: dataIndex };
    return <StackablePlayingCardDropTarget stackInfo={droptargetStackInfo} position={view.position} />;
  }
}
