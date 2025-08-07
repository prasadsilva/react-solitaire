import CardBack from '@/assets/1B.svg';
import CardOutline from '@/assets/outline.svg?react';
import { CARD_DIMS_CLASS } from '@/data/constants';
import type { PlayingCanvasPosition } from '@/data/types';
import type { Immutable } from '@/lib';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export type PlayingCardsPileProps = Immutable<{
  position: PlayingCanvasPosition;
  count: number;
  showingFace: boolean;
}> &
  ComponentProps<'div'>;

export function PlayingCardsPile({ position, count, showingFace, ...props }: PlayingCardsPileProps) {
  return (
    <div
      {...props}
      className={`absolute size-fit`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        pointerEvents: 'none',
      }}
    >
      {count > 0 ? (
        <img src={CardBack} className={cn('', CARD_DIMS_CLASS)} draggable={false} />
      ) : (
        <CardOutline className={cn('stroke-gray-700 dark:stroke-gray-300', CARD_DIMS_CLASS)} />
      )}
    </div>
  );
}
