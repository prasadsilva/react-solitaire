import { ThemeToggle } from '@/components/theme';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { formatSecondsToTimeString } from '@/utils';
import { useMemo } from 'react';
import { SolitaireHooks } from '../context/solitaire-hooks';
import SolitaireBestTimesPopup from './popups/SolitaireBestTimesPopup';
import SolitaireInfoPopup from './popups/SolitaireInfoPopup';

type SolitaireGameTitleBarProps = {
  startNewGame: () => void;
};
function SolitaireGameTitleBar({ startNewGame }: SolitaireGameTitleBarProps) {
  const debugModeEnabled = useMemo(() => import.meta.env.DEV, []);
  const { _debugSetGameOver, _debugClearBestTimes } = SolitaireHooks.useGameState();
  const { elapsedSeconds } = SolitaireHooks.useElapsedTime();

  return (
    <div
      id="title-bar"
      className="w-full h-fit bg-neutral-200 dark:bg-neutral-700 shadow-sm shadow-gray-500 dark:shadow-gray-800 flex flex-row justify-center"
    >
      <div id="title-bar-content" className="w-[820px] flex flex-row gap-2 p-2 items-center">
        <SolitaireInfoPopup />
        <div className="flex-2">React Solitaire</div>
        <div className="text-primary opacity-30">{formatSecondsToTimeString(elapsedSeconds)}</div>
        {debugModeEnabled && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Debug</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={_debugSetGameOver}>Trigger game over</DropdownMenuItem>
              <DropdownMenuItem onClick={_debugClearBestTimes}>Clear best times</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <SolitaireBestTimesPopup />
        <Button onClick={startNewGame} variant="outline">
          New Game
        </Button>
        <ThemeToggle className="w-9 h-9" />
      </div>
    </div>
  );
}

export default SolitaireGameTitleBar;
