import CardBack from '@/assets/1B.svg';
import CardOutline from '@/assets/outline.svg?react';
import { CARD_DIMS_CLASS } from '@/data/constants';
import type { PlayingCanvasPosition } from '@/data/types';
import type { Immutable } from '@/lib';
import { cn } from '@/lib/utils';
import { SolitaireContextHooks } from '@/utils/solitaire-context';
import type { ComponentProps } from 'react';

export type DrawPileVisibleCardsProps = Immutable<{
  count: number;
}>;
function DrawPileVisibleCards({ count }: DrawPileVisibleCardsProps) {
  return (
    <div className={cn('absolute size-fit', CARD_DIMS_CLASS)} style={{ left: 3, top: 3 }}>
      <img src={CardBack} className={CARD_DIMS_CLASS} draggable={false} />
      <DrawPileVisibleCardsHolder count={count - 1} />
    </div>
  );
}

function DrawPileVisibleCardsHolder({ count }: DrawPileVisibleCardsProps) {
  return count > 0 && <DrawPileVisibleCards count={count} />;
}

function DrawPileVisibleCardsView({ count }: DrawPileVisibleCardsProps) {
  return <DrawPileVisibleCardsHolder count={Math.min(3, count)} />;
}

export type DrawPilePileProps = Immutable<{
  position: PlayingCanvasPosition;
}> &
  ComponentProps<'div'>;

export function DrawPile({ position, ...props }: DrawPilePileProps) {
  const { drawPileCount } = SolitaireContextHooks.useDrawPile();

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
      {drawPileCount > 0 ? (
        <DrawPileVisibleCardsView count={drawPileCount} />
      ) : (
        <CardOutline className={cn('stroke-gray-700 dark:stroke-gray-300', CARD_DIMS_CLASS)} />
      )}
    </div>
  );
}
