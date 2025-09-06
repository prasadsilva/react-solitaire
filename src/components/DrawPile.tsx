import CardBack from '@/assets/1B.svg';
import CardOutline from '@/assets/outline.svg?react';
import type { PlayingCanvasPosition } from '@/contexts/playing-cards/types';
import { CARD_DIMS_CLASS } from '@/contexts/solitaire/constants';
import { SolitaireHooks } from '@/contexts/solitaire/solitaire-context';
import type { Immutable } from '@/lib';
import { cn } from '@/lib/utils';
import { useCallback, useMemo, type ComponentProps } from 'react';

const MAX_VISIBLE_CARDS = 3;
const DRAW_PILE_CARDS_OFFSET_X = 3;
const DRAW_PILE_CARDS_OFFSET_Y = 3;

export type DrawPileCardProps = Immutable<{
  index: number;
}> &
  ComponentProps<'div'>;

export function DrawPileCard({ index }: DrawPileCardProps) {
  const { doDrawCards } = SolitaireHooks.useStock();

  const handleCardClick = useCallback(
    (e: React.MouseEvent) => {
      doDrawCards();
      e.stopPropagation();
    },
    [doDrawCards],
  );

  return (
    <div
      className={cn('absolute size-fit', CARD_DIMS_CLASS)}
      style={{ left: index * DRAW_PILE_CARDS_OFFSET_X, top: index * DRAW_PILE_CARDS_OFFSET_Y }}
      onClick={handleCardClick}
    >
      <img src={CardBack} className={CARD_DIMS_CLASS} draggable={false} />
    </div>
  );
}

export type DrawPileVisibleCardsViewProps = Immutable<{
  count: number;
}>;

export function DrawPileVisibleCardsView({ count }: DrawPileVisibleCardsViewProps) {
  const cards = useMemo(() => Array(Math.min(MAX_VISIBLE_CARDS, count)).fill(0), [count]);

  return cards.map((_, index) => <DrawPileCard key={`draw_pile_card_${index}`} index={index} />);
}

export type DrawPilePileProps = Immutable<{
  position: PlayingCanvasPosition;
}> &
  ComponentProps<'div'>;

export function DrawPile({ position, ...props }: DrawPilePileProps) {
  const { drawPileCount, doResetDrawPile } = SolitaireHooks.useStock();

  return (
    <div
      {...props}
      className={`absolute size-fit`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {drawPileCount > 0 ? (
        <DrawPileVisibleCardsView count={drawPileCount} />
      ) : (
        <CardOutline className={cn('stroke-gray-700 dark:stroke-gray-300', CARD_DIMS_CLASS)} onClick={doResetDrawPile} />
      )}
    </div>
  );
}
