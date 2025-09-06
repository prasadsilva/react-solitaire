import CardOutline from '@/playing-cards/assets/outline.svg?react';
import { CARD_DIMS_CLASS } from '@/solitaire/context/constants';
import { cn } from '@/utils';
import { StackablePlayingCardHolder } from './StackablePlayingCardHolder';
import type { StackablePlayingCardsStackProps } from './types';

export function StackablePlayingCards({ data, view, firstCardDataIndex }: StackablePlayingCardsStackProps) {
  return (
    <>
      <div
        className={`absolute size-fit`}
        style={{
          left: `${view.position.x}px`,
          top: `${view.position.y}px`,
          pointerEvents: 'none',
        }}
      >
        <CardOutline className={cn('stroke-gray-700 dark:stroke-gray-300', CARD_DIMS_CLASS)} />
      </div>
      <StackablePlayingCardHolder data={data} view={view} index={0} dataIndex={firstCardDataIndex} />
    </>
  );
}
