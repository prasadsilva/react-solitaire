import { PlayingCardsCanvas } from '@/components/playing-canvas';
import { ThemeProvider, ThemeToggle } from '@/components/theme';
import { Button } from '@/components/ui/button';
import { initialCardStacks } from './utils/data';
import { createNewPlayingCardsContextValue, PlayingCardsContext } from './utils/game-context';

function SolitaireGame() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="absolute w-screen h-screen bg-background flex flex-col">
        <div className="w-full h-fit bg-neutral-200 dark:bg-neutral-700 flex flex-row gap-2 p-2">
          <div className="flex-2">React Solitaire</div>
          <Button>New Game</Button>
          <ThemeToggle />
        </div>
        <div className="flex-2">
          <PlayingCardsContext value={createNewPlayingCardsContextValue(initialCardStacks)}>
            <PlayingCardsCanvas />
          </PlayingCardsContext>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default SolitaireGame;
