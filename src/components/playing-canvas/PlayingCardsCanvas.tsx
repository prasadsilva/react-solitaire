import { StackablePlayingCardsStack } from '@/components/stackable-playing-card';
import type { Immutable } from '@/lib';
import { PlayingCardsHooks } from '@/utils/game-context';
import { type ComponentProps } from 'react';

export type PlayingCardsCanvasProps = Immutable<{}> & ComponentProps<'div'>;
export function PlayingCardsCanvas({}: PlayingCardsCanvasProps) {
  const { canvasRef, isCanvasAvailable } = PlayingCardsHooks.useCanvas();
  const { cardStacks } = PlayingCardsHooks.useModel();

  return (
    <div ref={canvasRef} className="relative">
      {isCanvasAvailable &&
        cardStacks.map((cardStack, idx) => <StackablePlayingCardsStack key={`card-stack-${idx}`} cardStack={cardStack} stackIndex={idx} />)}
    </div>
  );
}
