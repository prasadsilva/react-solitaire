import type { PlayingCardStackData, PlayingCardStackView } from '@/data/types';
import type { ComponentProps } from 'react';

export type PlayingCardProps = {
  data: PlayingCardStackData;
  view: PlayingCardStackView;
  index: number;
  isPreviousSiblingBeingDragged?: boolean;
} & ComponentProps<'div'>;

export type PlayingCardsStackProps = {
  data: PlayingCardStackData;
  view: PlayingCardStackView;
} & ComponentProps<'div'>;
