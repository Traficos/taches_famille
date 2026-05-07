import { useCallback, useEffect, useState } from 'react';
import { getTasksForChild, getLastCompletion, isTaskCompletedToday, isTaskScheduledToday } from '../api/tasks';

export type AnimalMood = 'idle' | 'happy' | 'sad' | 'evolving';

const SAD_AFTER_DAYS = 2;

export function useAnimalMood(profileId: number | undefined, refreshKey?: unknown): AnimalMood {
  const [mood, setMood] = useState<AnimalMood>('idle');

  const compute = useCallback(async () => {
    if (!profileId) return;

    const last = await getLastCompletion(profileId);
    if (!last) {
      setMood('sad');
      return;
    }

    const ageMs = Date.now() - new Date(last.completed_at).getTime();
    const ageDays = ageMs / (1000 * 60 * 60 * 24);
    if (ageDays >= SAD_AFTER_DAYS) {
      setMood('sad');
      return;
    }

    const tasks = (await getTasksForChild(profileId)).filter(isTaskScheduledToday);
    if (tasks.length === 0) {
      setMood('idle');
      return;
    }
    const statuses = await Promise.all(tasks.map(t => isTaskCompletedToday(t.id, profileId)));
    const allDone = statuses.every(Boolean);
    setMood(allDone ? 'happy' : 'idle');
  }, [profileId]);

  useEffect(() => {
    compute();
  }, [compute, refreshKey]);

  return mood;
}
