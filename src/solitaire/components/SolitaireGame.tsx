import { ThemeProvider, ThemeToggle } from '@/components/theme';
import { Button } from '@/components/ui/button';
import { createNewPlayingCardsContextValue, PlayingCardsContext } from '@/playing-cards/context/playing-cards-context';
import { SolitaireCanvas } from '@/solitaire/components/SolitaireCanvas';
import { createNewSolitaireContextValue, SolitaireContext } from '@/solitaire/context/solitaire-context';
import { useCallback, useState } from 'react';

function SolitaireGame() {
  const [solitaireGame, setSolitaireGame] = useState(createNewSolitaireContextValue());
  const startNewGame = useCallback(() => {
    setSolitaireGame(createNewSolitaireContextValue());
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div id="viewport" className="absolute w-screen h-screen min-w-[820px] bg-background flex flex-col">
        <div id="title-bar" className="w-full h-fit bg-neutral-200 dark:bg-neutral-700 shadow-sm shadow-gray-500 dark:shadow-gray-800">
          <div id="title-bar-content" className="max-w-[820px] flex flex-row gap-2 p-2 items-center">
            <div className="flex-2">React Solitaire</div>
            <Button onClick={startNewGame}>New Game</Button>
            <ThemeToggle className="w-9 h-9" />
          </div>
        </div>
        <div id="canvas-area" className="flex-2">
          <PlayingCardsContext value={createNewPlayingCardsContextValue()}>
            <SolitaireContext value={solitaireGame}>
              <SolitaireCanvas />
            </SolitaireContext>
          </PlayingCardsContext>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default SolitaireGame;
