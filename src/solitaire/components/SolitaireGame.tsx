import { ThemeProvider, ThemeToggle } from '@/components/theme';
import { Button } from '@/components/ui/button';
import { SolitaireCanvas } from '@/solitaire/components/SolitaireCanvas';
import { useCallback, useState } from 'react';
import { createNewPlayingCardsContextValue, PlayingCardsContext } from '../../contexts/playing-cards/playing-cards-context';
import { createNewSolitaireContextValue, SolitaireContext } from '../../contexts/solitaire/solitaire-context';

function SolitaireGame() {
  const [solitaireGame, setSolitaireGame] = useState(createNewSolitaireContextValue());
  const startNewGame = useCallback(() => {
    setSolitaireGame(createNewSolitaireContextValue());
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="absolute w-screen h-screen bg-background flex flex-col">
        <div className="w-full h-fit bg-neutral-200 dark:bg-neutral-700 flex flex-row gap-2 p-2">
          <div className="flex-2">React Solitaire</div>
          <Button onClick={startNewGame}>New Game</Button>
          <ThemeToggle />
        </div>
        <div className="flex-2">
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
