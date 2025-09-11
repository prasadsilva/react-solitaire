import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { type HistoryItem } from '@/solitaire/context/game-history';
import { SolitaireHooks } from '@/solitaire/context/solitaire-hooks';
import { formatSecondsToTimeString } from '@/utils';
import { TableProperties } from 'lucide-react';

function SolitaireBestTimesPopup() {
  const { bestTimes } = SolitaireHooks.useGameState();

  const itemsToRender: (HistoryItem | null)[] = [];
  for (let idx = 0; idx < 10; idx++) {
    if (bestTimes[idx]) {
      itemsToRender.push(bestTimes[idx]);
    } else {
      itemsToRender.push(null);
    }
  }

  const dateTimeFormatter = new Intl.DateTimeFormat();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon_sm" className="w-9 h-9">
          <TableProperties />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your Best Times</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ul>
          {itemsToRender.map((item, idx) => (
            <li key={`best-time-${idx}`}>
              <div className="flex flex-row gap-3">
                <div>{idx + 1}.</div>
                {item ? (
                  <>
                    <div>{formatSecondsToTimeString(item.secondsElapsed)}</div>
                    <div>{dateTimeFormatter.format(item.date)}</div>
                  </>
                ) : (
                  <div>No time</div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

export default SolitaireBestTimesPopup;
