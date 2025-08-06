export type PlayingCardProps = Immutable<{
  cardStack: PlayingCardStackData;
  stackInfo: PlayingCardStackInfo;
  position: PlayingCanvasPosition;
  isPreviousSiblingBeingDragged?: boolean;
}> &
  ComponentProps<'div'>;
