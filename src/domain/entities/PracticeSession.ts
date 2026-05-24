

import type { PracticeSession } from "../types/domain";

export function startPracticeSession(
  moduleId: string,
): PracticeSession {
  return {
    id: crypto.randomUUID(),
    moduleId,
    startedAt: new Date().toISOString(),
  };
}

export function completePracticeSession(
  session: PracticeSession,
  durationMinutes: number,
): PracticeSession {
  return {
    ...session,
    completedAt: new Date().toISOString(),
    durationMinutes,
  };
}

export function isCompletedSession(
  session: PracticeSession,
): boolean {
  return Boolean(session.completedAt);
}