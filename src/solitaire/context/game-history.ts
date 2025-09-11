export type HistoryItem = {
  date: number;
  secondsElapsed: number;
};

const bestTimesKey = 'bestTimes';

export function registerNewHistoryTime(elapsedSeconds: number) {
  const bestTimes = getBestTimes();
  let historyInsertionIdx = 0;
  for (let idx = 0; idx < bestTimes.length; idx++) {
    if (bestTimes[idx].secondsElapsed < elapsedSeconds) {
      historyInsertionIdx++;
    } else {
      break;
    }
  }

  bestTimes.splice(historyInsertionIdx, 0, { date: Date.now(), secondsElapsed: elapsedSeconds });
  if (bestTimes.length > 10) {
    bestTimes.pop();
  }

  localStorage.setItem(bestTimesKey, JSON.stringify(bestTimes));
}

export function getBestTimes(): HistoryItem[] {
  const savedData = localStorage.getItem(bestTimesKey);
  if (!savedData) {
    return [];
  }
  const savedState = JSON.parse(savedData);
  if (savedState instanceof Array) {
    return savedState as HistoryItem[];
  }
  return [];
}

export function clearBestTimes() {
  localStorage.removeItem(bestTimesKey);
}
