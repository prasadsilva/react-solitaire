export type PlayingCardProps = Immutable<{
  cardStack: PlayingCardStackData;
  stackInfo: PlayingCardStackInfo;
  position: PlayingCanvasPosition;
  isPreviousSiblingBeingDragged?: boolean;
}> &
  ComponentProps<'div'>;

export type PlayingCardsStackProps = Immutable<{
  cardStack: PlayingCardStackData;
  stackIndex: number;
}> &
  ComponentProps<'div'>;
