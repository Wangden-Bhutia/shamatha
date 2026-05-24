

import type { PracticeSession } from "../domain/types/domain";
import { loadProgress } from "./progressRepository";

const SESSION_STORAGE_KEY = "shamatha-sessions";

function buildProgressBackfill(
  existingCount: number,
): PracticeSession[] {
  const progress = loadProgress();
  const targetCount = Math.max(
    0,
    Math.floor(progress.sessions),
  );

  if (targetCount <= existingCount) {
    return [];
  }

  const missingCount = targetCount - existingCount;
  const averageMinutes =
    targetCount > 0
      ? Math.floor(progress.totalMinutes / targetCount)
      : 0;
  const extraMinutes =
    targetCount > 0
      ? progress.totalMinutes % targetCount
      : 0;

  return Array.from(
    { length: missingCount },
    (_, index) => {
      const progressIndex = existingCount + index;
      const completedAt =
        progress.sessionDates[progressIndex] ??
        progress.sessionDates[
          progress.sessionDates.length - 1
        ] ??
        new Date(0).toISOString();

      return {
        id: `legacy-progress-${progressIndex}`,
        moduleId: "legacy-progress",
        startedAt: completedAt,
        completedAt,
        durationMinutes:
          averageMinutes +
          (progressIndex < extraMinutes ? 1 : 0),
      };
    },
  );
}

export function loadSessions(): PracticeSession[] {
  const raw = localStorage.getItem(SESSION_STORAGE_KEY);

  if (!raw) {
    const backfilledSessions =
      buildProgressBackfill(0);

    if (backfilledSessions.length > 0) {
      saveSessions(backfilledSessions);
    }

    return backfilledSessions;
  }

  try {
    const sessions = JSON.parse(raw) as PracticeSession[];
    const backfilledSessions =
      buildProgressBackfill(sessions.length);
    const mergedSessions = [
      ...sessions,
      ...backfilledSessions,
    ];

    if (backfilledSessions.length > 0) {
      saveSessions(mergedSessions);
    }

    return mergedSessions;
  } catch {
    return [];
  }
}

export function saveSessions(
  sessions: PracticeSession[],
): void {
  localStorage.setItem(
    SESSION_STORAGE_KEY,
    JSON.stringify(sessions),
  );
}

export function appendSession(
  session: PracticeSession,
): void {
  const existing = loadSessions();

  saveSessions([
    ...existing,
    session,
  ]);
}
