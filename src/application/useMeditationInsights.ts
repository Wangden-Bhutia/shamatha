

import { useMemo } from "react";
import { usePracticeSession } from "./usePracticeSession";
import {
  generateMeditationInsights,
} from "../domain/services/meditationInsightsService";

export function useMeditationInsights() {
  const {
    sessions,
  } = usePracticeSession();

  const insights = useMemo(() => {
    return generateMeditationInsights(sessions);
  }, [sessions]);

  return {
    insights,
  };
}