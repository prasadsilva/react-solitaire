import CardOutline from '@/assets/outline.svg?react';
import { CARD_DIMS_CLASS } from '@/data/constants';
import { cn } from '@/lib/utils';
import { StackablePlayingCardHolder } from './StackablePlayingCardHolder';
import type { PlayingCardsStackProps } from './types';

export function StackablePlayingCardsStack({ data, view, ...props }: PlayingCardsStackProps) {
  return (
    <>
      <div
        {...props}
        className={`absolute size-fit`}
        style={{
          left: `${view.position.x}px`,
          top: `${view.position.y}px`,
          pointerEvents: 'none',
        }}
      >
        <CardOutline className={cn('stroke-gray-700 dark:stroke-gray-300', CARD_DIMS_CLASS)} />
      </div>
      <StackablePlayingCardHolder data={data} view={view} index={0} />
    </>
  );
}
