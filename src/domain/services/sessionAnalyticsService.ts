

import type { PracticeSession } from "../types/domain";

export function getTotalMeditationMinutes(
  sessions: PracticeSession[],
): number {
  return sessions.reduce(
    (total, session) => total + (session.durationMinutes ?? 0),
    0,
  );
}

export function getCompletedSessionCount(
  sessions: PracticeSession[],
): number {
  return sessions.filter(
    (session) => Boolean(session.completedAt),
  ).length;
}

export function getCurrentStreak(
  sessions: PracticeSession[],
): number {
  const completedDates = sessions
    .filter((session) => session.completedAt)
    .map((session) =>
      new Date(session.completedAt as string)
        .toISOString()
        .split("T")[0],
    );

  const uniqueDates = [...new Set(completedDates)]
    .sort()
    .reverse();

  if (uniqueDates.length === 0) {
    return 0;
  }

  let streak = 1;

  for (let i = 0; i < uniqueDates.length - 1; i++) {
    const current = new Date(uniqueDates[i]);
    const next = new Date(uniqueDates[i + 1]);

    const diffMs = current.getTime() - next.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      streak += 1;
    } else {
      break;
    }
  }

  return streak;
}

export function getRecentPracticeSummary(
  sessions: PracticeSession[],
): string {
  const totalMinutes = getTotalMeditationMinutes(sessions);
  const totalSessions = getCompletedSessionCount(sessions);
  const streak = getCurrentStreak(sessions);

  return `${totalSessions} sessions · ${totalMinutes} min total · ${streak} day streak`;
}