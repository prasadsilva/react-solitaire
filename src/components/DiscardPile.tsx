import CardOutline from '@/assets/outline.svg?react';
import { CARD_DIMS_CLASS } from '@/data/constants';
import type { PlayingCanvasPosition } from '@/data/types';
import type { Immutable } from '@/lib';
import { cn } from '@/lib/utils';
import { SolitaireContextHooks } from '@/utils/solitaire-context';
import { type ComponentProps } from 'react';

// export type CardProps = Immutable<{
//   card: PlayingCardDescriptor;
// }> &
//   ComponentProps<'div'>;

// export function Card({ card }: CardProps) {
//   return (
//     <div
//       className="absolute size-fit"
//       style={{
//         transform: `translateX(${currentPosition.x}px) translateY(${currentPosition.y}px)`,
//         zIndex: isInDraggedState ? stackInfo.cardIndex + LAYOUT_CONSTANTS.DRAG_Z_INDEX_OFFSET : stackInfo.cardIndex,
//         pointerEvents: isInDraggedState ? 'none' : 'auto',
//       }}
//     >
//       <img src={card.cardImg} className={cn('', CARD_DIMS_CLASS)} draggable={false} />
//     </div>
//   );
// }

export type DiscardPileVisibleCardsViewProps = Immutable<{}>;

export function DiscardPileVisibleCardsView({}: DiscardPileVisibleCardsViewProps) {
  //   const { topCard, nextCard } = SolitaireContextHooks.useDiscardPile();

  return null;
  //   return <StackablePlayingCardsStack />;
}

export type DiscardPilePileProps = Immutable<{
  position: PlayingCanvasPosition;
}> &
  ComponentProps<'div'>;

export function DiscardPile({ position, ...props }: DiscardPilePileProps) {
  const { discardPileCount } = SolitaireContextHooks.useDiscardPile();

  return (
    <div
      {...props}
      className={`absolute size-fit`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {discardPileCount > 0 ? (
        <DiscardPileVisibleCardsView />
      ) : (
        <CardOutline className={cn('stroke-gray-700 dark:stroke-gray-300', CARD_DIMS_CLASS)} />
      )}
    </div>
  );
}
