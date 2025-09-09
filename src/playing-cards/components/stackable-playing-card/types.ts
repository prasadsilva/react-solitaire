import type { PlayingCardStackData, PlayingCardStackView } from '@/playing-cards/context/types';
import type { Immutable } from '@/utils';

export type StackablePlayingCardProps = {
  data: Immutable<PlayingCardStackData>;
  view: PlayingCardStackView;
  index: number;
  dataIndex: number;
  hidden?: boolean;
};

export type StackablePlayingCardsStackProps = {
  data: Immutable<PlayingCardStackData>;
  view: PlayingCardStackView;
  firstCardDataIndex: number;
};
