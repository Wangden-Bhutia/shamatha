import { useMemo } from "react";
import { usePracticeSession } from "./usePracticeSession";

const SESSIONS_TO_ADVANCE = 5;
const RECALIBRATION_WINDOW_MIN = 8;
const RECALIBRATION_WINDOW_MAX = 12;

export const useStageProgression = () => {
  const {
    analytics,
    completeSession,
  } = usePracticeSession();

  const sessionCount =
    analytics.completedSessions;

  const currentStage =
    Math.max(
      1,
      Math.floor(
        sessionCount /
          SESSIONS_TO_ADVANCE
      ) + 1
    );

  const shouldSuggestRecalibration =
    sessionCount >=
      RECALIBRATION_WINDOW_MIN &&
    sessionCount <=
      RECALIBRATION_WINDOW_MAX;


  return useMemo(
    () => ({
      currentStage,
      sessionCount,
      sessionsToAdvance:
        SESSIONS_TO_ADVANCE,
      recordSessionComplete: completeSession,
      progress:
        sessionCount /
        SESSIONS_TO_ADVANCE,
      shouldSuggestRecalibration,
      dismissRecalibration: () => undefined,
    }),
    [
      currentStage,
      sessionCount,
      completeSession,
      shouldSuggestRecalibration,
    ]
  );
};