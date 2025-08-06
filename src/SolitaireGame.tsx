import { ThemeProvider, ThemeToggle } from '@/components/theme';
import { Button } from '@/components/ui/button';

function SolitaireGame() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="absolute w-screen h-screen bg-background">
        <div className="absolute w-full h-fit bg-neutral-200 dark:bg-neutral-700 flex flex-row gap-2 p-2">
          <div className="flex-2">React Solitaire</div>
          <Button>New Game</Button>
          <ThemeToggle />
        </div>
        <div className="text-3xl font-bold underline">React solitaire</div>
      </div>
    </ThemeProvider>
  );
}

export default SolitaireGame;
