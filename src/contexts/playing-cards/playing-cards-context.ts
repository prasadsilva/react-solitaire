import { type PlayingCanvasPosition, type PlayingCardStackInfo } from '@/contexts/playing-cards/types';
import type { Immutable } from '@/lib';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DragManager } from './dragmanager';

export interface PlayingCardsContextListener {
  onValidDrop: (card: PlayingCardStackInfo, slot: PlayingCardStackInfo) => void;
  onInvalidDrop: (card: PlayingCardStackInfo) => void;
}

class PlayingCardsContextData {
  private contextListeners: Set<PlayingCardsContextListener>;
  private dragManager: DragManager<PlayingCardStackInfo>;

  public constructor() {
    this.contextListeners = new Set();
    this.dragManager = new DragManager((card, slot) => this.tryHandleDrop(card, slot));
  }

  public cleanup() {
    // Clean up canvas reference and any listeners
    this.dragManager.setCanvasElement(null);
  }

  public getCanvasElement() {
    return this.dragManager.getCanvasElement();
  }

  public setCanvasElement(canvas: HTMLElement | null) {
    this.dragManager.setCanvasElement(canvas);
  }

  public setActiveDragHandler(
    dragData: PlayingCardStackInfo,
    dragStartClientX: number,
    dragStartClientY: number,
    onDragMove: (canvasDeltaX: number, canvasDeltaY: number) => void,
    onDragEnd: () => void,
  ) {
    this.dragManager.setActiveDragHandler(dragData, dragStartClientX, dragStartClientY, onDragMove, onDragEnd);
  }
  public addDragStateChangeListener(callback: (stackInfo: PlayingCardStackInfo | null) => void) {
    this.dragManager.addDragStateChangeListener(callback);
  }
  public removeDragStateChangeListener(callback: (stackInfo: PlayingCardStackInfo | null) => void) {
    this.dragManager.removeDragStateChangeListener(callback);
  }

  public registerDropTarget(element: HTMLElement, stackInfo: PlayingCardStackInfo, onEnter?: () => void, onLeave?: () => void) {
    this.dragManager.registerDropTarget(element, stackInfo, onEnter, onLeave);
  }

  public unregisterDropTarget(element: HTMLElement) {
    this.dragManager.unregisterDropTarget(element);
  }

  private tryHandleDrop(cardStackInfo: PlayingCardStackInfo, slotStackInfo: PlayingCardStackInfo | null) {
    if (slotStackInfo) {
      this.notifyValidDrop(cardStackInfo, slotStackInfo);
    } else {
      this.notifyInvalidDrop(cardStackInfo);
    }
  }

  private notifyValidDrop(cardStackInfo: PlayingCardStackInfo, slotStackInfo: PlayingCardStackInfo) {
    this.contextListeners.forEach((callback) => callback.onValidDrop(cardStackInfo, slotStackInfo));
  }
  private notifyInvalidDrop(cardStackInfo: PlayingCardStackInfo) {
    this.contextListeners.forEach((callback) => callback.onInvalidDrop(cardStackInfo));
  }

  public addChangeListener(callback: PlayingCardsContextListener) {
    this.contextListeners.add(callback);
  }
  public removeChangeListener(callback: PlayingCardsContextListener) {
    this.contextListeners.delete(callback);
  }

  // private moveBetweenStacks(sourceStackInfo: PlayingCardStackInfo, targetStackInfo: PlayingCardStackInfo) {
  //   const sourceStackIdx = sourceStackInfo.stackIndex;
  //   if (sourceStackIdx === -1) {
  //     console.warn('Unable to move card. Source stack is invalid');
  //     return;
  //   }
  //   const targetStackIdx = targetStackInfo.stackIndex;
  //   if (targetStackIdx === -1) {
  //     console.warn('Unable to move card. Target stack is invalid');
  //     return;
  //   }

  //   // Note: We need to perform a deep replication of the data for downstream components to detect the exact change
  //   //       It would be better to use an immutable data library here
  //   const cardStacksCopy = [...this.cardStacks];

  //   switch (this.cardStacks[sourceStackInfo.stackIndex].behavior) {
  //     case OPlayingCardStackMoveBehavior.MoveAllNextSiblings: {
  //       // Remove card and next siblings below from source stack
  //       const sourceStackCopy = { ...this.cardStacks[sourceStackIdx] };
  //       const sourceStackCardsCopy = sourceStackCopy.cards.slice(0, sourceStackInfo.cardIndex);
  //       const cardsToMove = sourceStackCopy.cards.slice(sourceStackInfo.cardIndex);
  //       if (sourceStackCardsCopy.length === sourceStackCopy.cards.length) {
  //         console.warn('Something went wrong with card removal');
  //       }
  //       sourceStackCopy.cards = sourceStackCardsCopy;
  //       cardStacksCopy[sourceStackIdx] = sourceStackCopy;

  //       // Add card and next siblings to target stack
  //       const targetStackCopy = { ...this.cardStacks[targetStackIdx] };
  //       const targetStackCardsCopy = [...targetStackCopy.cards];
  //       targetStackCardsCopy.splice(targetStackInfo.cardIndex, 0, ...cardsToMove);
  //       targetStackCopy.cards = targetStackCardsCopy;
  //       cardStacksCopy[targetStackIdx] = targetStackCopy;

  //       break;
  //     }
  //     case OPlayingCardStackMoveBehavior.MoveIndividually: {
  //       // Remove only the one card from source stack
  //       const sourceStackCopy = { ...this.cardStacks[sourceStackIdx] };
  //       const sourceStackCardsCopy = [...sourceStackCopy.cards];
  //       const cardsToMove = sourceStackCardsCopy.splice(sourceStackInfo.cardIndex, 1);
  //       if (sourceStackCardsCopy.length === sourceStackCopy.cards.length) {
  //         console.warn('Something went wrong with card removal');
  //       }
  //       sourceStackCopy.cards = sourceStackCardsCopy;
  //       cardStacksCopy[sourceStackIdx] = sourceStackCopy;

  //       // Add the one card to the target stack
  //       const targetStackCopy = { ...this.cardStacks[targetStackIdx] };
  //       const targetStackCardsCopy = [...targetStackCopy.cards];
  //       targetStackCardsCopy.splice(targetStackInfo.cardIndex, 0, ...cardsToMove);
  //       targetStackCopy.cards = targetStackCardsCopy;
  //       cardStacksCopy[targetStackIdx] = targetStackCopy;

  //       break;
  //     }
  //   }

  //   this.cardStacks = cardStacksCopy;
  // }
}

export const createNewPlayingCardsContextValue = () => new PlayingCardsContextData();
export const PlayingCardsContext = createContext<InstanceType<typeof PlayingCardsContextData> | null>(null);

function useDragManager() {
  const playingCardsContext = useContext(PlayingCardsContext);
  if (!playingCardsContext) {
    throw new Error('useDragManager must be used within a PlayingCardsContext');
  }
  const [activeDragInfo, setActiveDragInfo] = useState<PlayingCardStackInfo | null>(null);

  const handleActiveDragChange = useCallback((stackInfo: PlayingCardStackInfo | null) => {
    setActiveDragInfo(stackInfo);
  }, []);

  useEffect(() => {
    playingCardsContext.addDragStateChangeListener(handleActiveDragChange);
    return () => playingCardsContext.removeDragStateChangeListener(handleActiveDragChange);
  }, [playingCardsContext]);

  const setActiveDrag = useCallback(
    (
      stackInfo: PlayingCardStackInfo,
      dragStartClientX: number,
      dragStartClientY: number,
      onDragMove: (canvasDeltaX: number, canvasDeltaY: number) => void,
      onDragEnd: () => void,
    ) => {
      playingCardsContext.setActiveDragHandler(stackInfo, dragStartClientX, dragStartClientY, onDragMove, onDragEnd);
    },
    [playingCardsContext],
  );

  const registerDropTarget = useCallback(
    (element: HTMLElement, stackInfo: PlayingCardStackInfo, onEnter?: () => void, onLeave?: () => void) => {
      playingCardsContext.registerDropTarget(element, stackInfo, onEnter, onLeave);
    },
    [playingCardsContext],
  );

  const unregisterDropTarget = useCallback(
    (element: HTMLElement) => {
      playingCardsContext.unregisterDropTarget(element);
    },
    [playingCardsContext],
  );

  return {
    activeDragInfo,
    setActiveDrag,
    registerDropTarget,
    unregisterDropTarget,
  };
}

function useDropTarget(stackInfo: Immutable<PlayingCardStackInfo>) {
  const { activeDragInfo, registerDropTarget, unregisterDropTarget } = useDragManager();
  const [isDragOver, setIsDragOver] = useState(false);

  const isActivated = useMemo(() => {
    return activeDragInfo && activeDragInfo.stackId !== stackInfo.stackId;
  }, [activeDragInfo, stackInfo]);

  const handleDropTargetEnter = useCallback(() => {
    if (isActivated) {
      setIsDragOver(true);
    }
  }, [isActivated]);

  const handleDropTargetLeave = useCallback(() => {
    if (isActivated) {
      setIsDragOver(false);
    }
  }, [isActivated]);

  const dropTargetRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (element) {
        registerDropTarget(element, stackInfo, handleDropTargetEnter, handleDropTargetLeave);
        return () => {
          unregisterDropTarget(element);
        };
      }
    },
    [stackInfo, registerDropTarget, unregisterDropTarget, handleDropTargetEnter, handleDropTargetLeave],
  );

  useEffect(() => {
    if (!activeDragInfo) {
      setIsDragOver(false);
    }
  }, [activeDragInfo]);

  return {
    dropTargetRef,
    isActivated,
    isDragOver,
  };
}

function useDraggable(stackInfo: Immutable<PlayingCardStackInfo>, position: PlayingCanvasPosition) {
  const { setActiveDrag } = useDragManager();

  // Track internal position separtely to allow for uncontrolled positioning while being dragged
  const [currentPosition, setCurrentPosition] = useState({
    x: position.x,
    y: position.y,
  });
  const resetInternalPosition = useCallback(() => {
    setCurrentPosition(position);
  }, [position]);
  const handleDrag = useCallback((canvasDeltaX: number, canvasDeltaY: number) => {
    setCurrentPosition((prev) => {
      return {
        x: prev.x + canvasDeltaX,
        y: prev.y + canvasDeltaY,
      };
    });
  }, []);
  const handleEndDrag = useCallback(() => {
    setIsBeingDragged(false);
    resetInternalPosition();
  }, [resetInternalPosition]);

  const [isBeingDragged, setIsBeingDragged] = useState(false);

  const draggableRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        const handlePointerDown = (e: PointerEvent) => {
          // https://stackoverflow.com/a/70737325/2847817
          if (node.hasPointerCapture(e.pointerId)) {
            node.releasePointerCapture(e.pointerId);
          }
          setIsBeingDragged(true);
          console.log(`active drag: ${stackInfo.stackId}:${stackInfo.cardIndex}`);
          setActiveDrag(stackInfo, e.clientX, e.clientY, handleDrag, handleEndDrag);
          e.preventDefault();
          e.stopPropagation();
        };

        node.addEventListener('pointerdown', handlePointerDown);
        return () => {
          node.removeEventListener('pointerdown', handlePointerDown);
        };
      }
    },
    [stackInfo],
  );

  // Reset the internal position if param changes
  useEffect(() => {
    resetInternalPosition();
  }, [position]);

  return {
    draggableRef,
    isBeingDragged,
    currentPosition,
  };
}

function useCanvas() {
  const playingCardsContext = useContext(PlayingCardsContext);
  if (!playingCardsContext) {
    throw new Error('useCanvas must be used within a PlayingCardsContext');
  }
  const [isCanvasAvailable, setIsCanvasAvailable] = useState(false);
  const canvasRef = useCallback((node: HTMLDivElement | null) => {
    if (playingCardsContext.getCanvasElement() && node) {
      console.warn('Unable to register canvas element. A canvas is already registered.');
      return;
    }
    playingCardsContext.setCanvasElement(node);
    console.log('registered canvas');
    setIsCanvasAvailable(node !== null);
  }, []);

  return {
    canvasRef,
    isCanvasAvailable,
  };
}

export const PlayingCardsHooks = {
  useDropTarget,
  useDraggable,
  useCanvas,
};
