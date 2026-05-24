import { useEffect, useMemo, useState } from "react";
import { useStageProgression } from "./useStageProgression";

const ASSESSMENT_STAGE_KEY = "recommendedStage";
const ASSESSMENT_UPDATED_EVENT =
  "shamatha-assessment-updated";

function loadAssessmentStage() {
  const storedStage = Number(
    localStorage.getItem(ASSESSMENT_STAGE_KEY),
  );

  if (
    Number.isInteger(storedStage) &&
    storedStage >= 1 &&
    storedStage <= 9
  ) {
    return storedStage;
  }

  return null;
}

/**
 * Step 6: Stage Assessment Flow (foundation layer)
 *
 * This is a lightweight decision engine that will later evolve
 * into full adaptive stage recalibration logic.
 */
export const useStageAssessmentFlow = () => {
  const {
    currentStage,
    sessionCount,
  } = useStageProgression();
  const [assessmentStage, setAssessmentStage] =
    useState<number | null>(loadAssessmentStage);

  useEffect(() => {
    const syncAssessmentStage = () => {
      setAssessmentStage(loadAssessmentStage());
    };

    window.addEventListener(
      "storage",
      syncAssessmentStage,
    );
    window.addEventListener(
      ASSESSMENT_UPDATED_EVENT,
      syncAssessmentStage,
    );

    return () => {
      window.removeEventListener(
        "storage",
        syncAssessmentStage,
      );
      window.removeEventListener(
        ASSESSMENT_UPDATED_EVENT,
        syncAssessmentStage,
      );
    };
  }, []);

  const totalSessions = sessionCount;

  /**
   * Simple heuristic model (v1):
   * - Early stage: slower progression
   * - Higher sessions suggest readiness for review
   */
  const suggestedStage = useMemo(() => {
    if (assessmentStage !== null) return assessmentStage;

    if (totalSessions < 5) return currentStage;

    if (totalSessions >= 8 && currentStage < 9) {
      // gentle upward bias (not forcing change)
      return currentStage + 1;
    }

    return currentStage;
  }, [assessmentStage, currentStage, totalSessions]);

  const stabilitySignal = useMemo(() => {
    if (totalSessions < 5) return "establishing";
    if (totalSessions < 12) return "stabilizing";
    return "maturing";
  }, [totalSessions]);

  const confidence = useMemo(() => {
    // soft confidence heuristic (not deterministic)
    const base = Math.min(totalSessions / 12, 1);
    return Number(base.toFixed(2));
  }, [totalSessions]);

  const requiresAlignmentReview = useMemo(() => {
    // Alignment suggestion logic (soft heuristic)
    return totalSessions >= 8 && confidence < 0.6;
  }, [totalSessions, confidence]);

  const getAssessment = () => {
    return {
      currentStage,
      suggestedStage,
      stabilitySignal,
      confidence,
      requiresReview: totalSessions >= 8,
      requiresAlignmentReview,
    };
  };

  return {
    currentStage,
    totalSessions,
    suggestedStage,
    stabilitySignal,
    confidence,
    requiresAlignmentReview,
    getAssessment,
  };
};
