export type HistoryItem = {
  date: number;
  secondsElapsed: number;
};

export function registerNewHistoryTime(elapsedSeconds: number) {
  // TODO
  console.log(`registering new history time - ${elapsedSeconds}`);
}

export function getBestTimes(): HistoryItem[] {
  const savedData = localStorage.getItem('bestTimes');
  if (!savedData) {
    return [];
  }
  const savedState = JSON.parse(savedData);
  if (savedState instanceof Array) {
    return savedData as unknown as HistoryItem[];
  }
  return [];
}

export function clearBestTimes() {
  localStorage.removeItem('bestTimes');
}
