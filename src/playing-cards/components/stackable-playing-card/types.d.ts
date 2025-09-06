import type { PlayingCardStackData, PlayingCardStackView } from '@/playing-cards/context/types';

export type StackablePlayingCardProps = {
  data: PlayingCardStackData;
  view: PlayingCardStackView;
  index: number;
  dataIndex: number;
  hidden?: boolean;
};

export type StackablePlayingCardsStackProps = {
  data: PlayingCardStackData;
  view: PlayingCardStackView;
  firstCardDataIndex: number;
};
