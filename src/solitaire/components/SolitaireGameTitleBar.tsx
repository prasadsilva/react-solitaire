import { ThemeToggle } from '@/components/theme';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useMemo } from 'react';
import { SolitaireHooks } from '../context/solitaire-context';
import SolitaireInfoPopup from './popups/SolitaireInfoPopup';

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
        <SolitaireInfoPopup />
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
