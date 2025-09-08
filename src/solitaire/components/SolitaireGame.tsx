import { ThemeProvider } from '@/components/theme';
import { createNewPlayingCardsContextValue, PlayingCardsContext } from '@/playing-cards/context/playing-cards-context';
import { SolitaireCanvas } from '@/solitaire/components/SolitaireCanvas';
import { createNewSolitaireContextValue, SolitaireContext } from '@/solitaire/context/solitaire-context';
import { useCallback, useState } from 'react';
import SolitaireGameOverPopup from './popups/SolitaireGameOverPopup';
import SolitaireGameTitleBar from './SolitaireGameTitleBar';

function SolitaireGame() {
  const [solitaireGame, setSolitaireGame] = useState(createNewSolitaireContextValue());
  const startNewGame = useCallback(() => {
    setSolitaireGame(createNewSolitaireContextValue());
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <PlayingCardsContext value={createNewPlayingCardsContextValue()}>
        <SolitaireContext value={solitaireGame}>
          <div id="viewport" className="absolute w-screen h-screen min-w-[820px] bg-background flex flex-col">
            <SolitaireGameOverPopup />
            <SolitaireGameTitleBar startNewGame={startNewGame} />
            <div id="canvas-container" className="flex-2 flex flex-row justify-center">
              <div id="canvas-area" className="w-[820px]">
                <SolitaireCanvas />
              </div>
            </div>
          </div>
        </SolitaireContext>
      </PlayingCardsContext>
    </ThemeProvider>
  );
}

export default SolitaireGame;
