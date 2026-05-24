import { useState } from "react";
import {
  completePracticeSession,
  startPracticeSession,
} from "../domain/entities/PracticeSession";
import {
  appendSession,
  loadSessions,
} from "../repositories/sessionRepository";
import {
  getCompletedSessionCount,
  getCurrentStreak,
  getRecentPracticeSummary,
  getTotalMeditationMinutes,
} from "../domain/services/sessionAnalyticsService";

export function usePracticeSession() {
  const [sessions, setSessions] =
    useState(loadSessions());
  function beginSession(moduleId: string) {
    return startPracticeSession(moduleId);
  }

  function finishSession(
    moduleId: string,
    durationMinutes: number,
  ) {
    const started = startPracticeSession(moduleId);

    const completed = completePracticeSession(
      started,
      durationMinutes,
    );

    appendSession(completed);
    setSessions(loadSessions());

    return completed;
  }


  const analytics = {
    totalMinutes:
      getTotalMeditationMinutes(sessions),
    completedSessions:
      getCompletedSessionCount(sessions),
    currentStreak:
      getCurrentStreak(sessions),
    summary:
      getRecentPracticeSummary(sessions),
  };

  return {
    sessions,
    analytics,
    beginSession,
    finishSession,
    completeSession: (
      moduleId: string,
      durationMinutes: number,
    ) => {
      beginSession(moduleId);

      return finishSession(
        moduleId,
        durationMinutes,
      );
    },
    resetSessions: () => undefined,
  };
}