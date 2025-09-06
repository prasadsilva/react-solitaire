import CardDropTarget from '@/assets/droptarget.svg?react';
import { PlayingCardsHooks } from '@/contexts/playing-cards/playing-cards-context';
import type { PlayingCanvasPosition, PlayingCardStackInfo } from '@/contexts/playing-cards/types';
import { CARD_DIMS_CLASS } from '@/contexts/solitaire/constants';
import type { Immutable } from '@/lib';
import { cn } from '@/lib/utils';
import { type ComponentProps } from 'react';

export type PlayingCardDropTargetProps = Immutable<{
  stackInfo: PlayingCardStackInfo;
  position: PlayingCanvasPosition;
}> &
  ComponentProps<'div'>;
export function StackablePlayingCardDropTarget({ stackInfo, position, ...props }: PlayingCardDropTargetProps) {
  const { dropTargetRef, isActivated, isDragOver } = PlayingCardsHooks.useDropTarget(stackInfo);

  return (
    <div
      {...props}
      ref={dropTargetRef}
      className={`absolute size-fit`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: stackInfo.cardIndex,
        opacity: isActivated && isDragOver ? 1 : 0,
        pointerEvents: isActivated ? 'auto' : 'none',
      }}
    >
      <CardDropTarget className={cn('fill-gray-300 stroke-gray-900 opacity-30 dark:opacity-50', CARD_DIMS_CLASS)} />
    </div>
  );
}
