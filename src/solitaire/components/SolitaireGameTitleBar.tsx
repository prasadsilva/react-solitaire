import { ThemeToggle } from '@/components/theme';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Info } from 'lucide-react';
import { useMemo } from 'react';
import { SolitaireHooks } from '../context/solitaire-context';

type SolitaireGameTitleBarProps = {
  startNewGame: () => void;
};
function SolitaireGameTitleBar({ startNewGame }: SolitaireGameTitleBarProps) {
  const debugModeEnabled = useMemo(() => import.meta.env.DEV, []);
  const { _debugSetGameOver } = SolitaireHooks.useGameState();

  return (
    <div
      id="title-bar"
      className="w-full h-fit bg-neutral-200 dark:bg-neutral-700 shadow-sm shadow-gray-500 dark:shadow-gray-800 flex flex-row justify-center"
    >
      <div id="title-bar-content" className="w-[820px] flex flex-row gap-2 p-2 items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon_sm">
              <Info />
            </Button>
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
        </Dialog>
        <div className="flex-2">React Solitaire</div>
        {debugModeEnabled && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Debug</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={_debugSetGameOver}>Trigger game over</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Button onClick={startNewGame} variant="outline">
          New Game
        </Button>
        <ThemeToggle className="w-9 h-9" />
      </div>
    </div>
  );
}

export default SolitaireGameTitleBar;
