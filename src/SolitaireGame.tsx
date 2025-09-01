import { SolitaireCanvas } from '@/components/solitaire-game/SolitaireCanvas';
import { ThemeProvider, ThemeToggle } from '@/components/theme';
import { Button } from '@/components/ui/button';
import { createNewPlayingCardsContextValue, PlayingCardsContext } from './contexts/playing-cards/playing-cards-context';
import { createNewSolitaireContextValue, SolitaireContext } from './contexts/solitaire/solitaire-context';

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
          <PlayingCardsContext value={createNewPlayingCardsContextValue()}>
            <SolitaireContext value={createNewSolitaireContextValue()}>
              <SolitaireCanvas />
            </SolitaireContext>
          </PlayingCardsContext>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default SolitaireGame;
