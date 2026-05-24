import { useMemo } from "react";
import { usePracticeSession } from "./usePracticeSession";
import {
  generateMeditationRecommendation,
} from "../domain/services/recommendationService";

export function useMeditationRecommendations() {
  const {
    sessions,
  } = usePracticeSession();

  const recommendation = useMemo(() => {
    return generateMeditationRecommendation(
      sessions,
    );
  }, [sessions]);

  return {
    recommendation,
  };
}
