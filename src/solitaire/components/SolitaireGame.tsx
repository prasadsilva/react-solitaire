import { ThemeProvider, ThemeToggle } from '@/components/theme';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { createNewPlayingCardsContextValue, PlayingCardsContext } from '@/playing-cards/context/playing-cards-context';
import { SolitaireCanvas } from '@/solitaire/components/SolitaireCanvas';
import { createNewSolitaireContextValue, SolitaireContext } from '@/solitaire/context/solitaire-context';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Info } from 'lucide-react';
import { useCallback, useState, type ComponentProps } from 'react';

function InfoToggle(props: ComponentProps<typeof Button>) {
  return (
    <Button {...props} variant="outline" size="icon_sm">
      <Info />
    </Button>
  );
}

function SolitaireGame() {
  const [solitaireGame, setSolitaireGame] = useState(createNewSolitaireContextValue());
  const startNewGame = useCallback(() => {
    setSolitaireGame(createNewSolitaireContextValue());
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Dialog>
        <div id="viewport" className="absolute w-screen h-screen min-w-[820px] bg-background flex flex-col">
          <div id="title-bar" className="w-full h-fit bg-neutral-200 dark:bg-neutral-700 shadow-sm shadow-gray-500 dark:shadow-gray-800">
            <div id="title-bar-content" className="max-w-[820px] flex flex-row gap-2 p-2 items-center">
              <DialogTrigger asChild>
                <InfoToggle className="w-9 h-9" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>React Solitaire</DialogTitle>
                  <DialogDescription>An exploration in creating a Solitaire game using React.</DialogDescription>
                </DialogHeader>
                <span>
                  Playing card SVGs provided by{' '}
                  <a href="https://www.me.uk/cards/" target="_blank" className="underline">
                    Adrian Kennard (RevK®)
                  </a>
                  .
                </span>
              </DialogContent>
              <div className="flex-2">React Solitaire</div>
              <Button onClick={startNewGame} variant="outline">
                New Game
              </Button>
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
      </Dialog>
    </ThemeProvider>
  );
}

export default SolitaireGame;
