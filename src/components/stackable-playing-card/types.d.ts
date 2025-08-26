import type { PlayingCardStackData, PlayingCardStackView } from '@/data/types';

export type PlayingCardProps = {
  data: PlayingCardStackData;
  view: PlayingCardStackView;
  index: number;
  hidden?: boolean;
};

export type PlayingCardsStackProps = {
  data: PlayingCardStackData;
  view: PlayingCardStackView;
};
