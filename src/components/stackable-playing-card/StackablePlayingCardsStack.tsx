import CardOutline from '@/assets/outline.svg?react';
import { cn } from '@/lib/utils';
import { CARD_DIMS_CLASS } from '@/utils/constants';
import { StackablePlayingCardHolder } from './StackablePlayingCardHolder';
import type { PlayingCardsStackProps } from './types';

export function StackablePlayingCardsStack({ cardStack, stackIndex, ...props }: PlayingCardsStackProps) {
  return (
    <>
      <div
        {...props}
        className={`absolute size-fit`}
        style={{
          left: `${cardStack.position.x}px`,
          top: `${cardStack.position.y}px`,
          pointerEvents: 'none',
        }}
      >
        <CardOutline className={cn('stroke-gray-700 dark:stroke-gray-300', CARD_DIMS_CLASS)} />
      </div>
      <StackablePlayingCardHolder cardStack={cardStack} stackInfo={{ stackIndex, cardIndex: 0 }} position={cardStack.position} />
    </>
  );
}
