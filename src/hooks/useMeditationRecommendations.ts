

import { useMemo } from "react";
import { useProgress } from "./useProgress";

export type MeditationRecommendation = {
  recommendedPracticeType: string;
  recommendedDurationMinutes: number;
  rationale: string;
};

function buildRecommendation(
  sessions: number,
  streak: number,
  totalMinutes: number
): MeditationRecommendation {
  if (sessions <= 2) {
    return {
      recommendedPracticeType: "Breath Awareness",
      recommendedDurationMinutes: 10,
      rationale:
        "Short, consistent sessions help establish stability without creating unnecessary pressure or striving.",
    };
  }

  if (streak >= 7 && totalMinutes >= 120) {
    return {
      recommendedPracticeType: "Sustained Attention",
      recommendedDurationMinutes: 20,
      rationale:
        "Your recent continuity suggests increasing stability. Slightly longer sessions may support deeper attentional settling.",
    };
  }

  if (streak >= 3) {
    return {
      recommendedPracticeType: "Breath Continuity",
      recommendedDurationMinutes: 15,
      rationale:
        "Recent consistency suggests reinforcing continuity gently before increasing intensity or complexity.",
    };
  }

  if (totalMinutes >= 300) {
    return {
      recommendedPracticeType: "Whole Body Breathing",
      recommendedDurationMinutes: 20,
      rationale:
        "Your accumulated practice time suggests growing familiarity with sustained attention and embodied awareness.",
    };
  }

  return {
    recommendedPracticeType: "Breath Awareness",
    recommendedDurationMinutes: 10,
    rationale:
      "Returning to simple breath awareness supports steadiness, grounding, and continuity of practice.",
    };
}

export function useMeditationRecommendations() {
  const {
    sessions,
    currentStreak,
    totalMinutes,
  } = useProgress();

  const recommendation = useMemo(() => {
    return buildRecommendation(
      sessions,
      currentStreak,
      totalMinutes
    );
  }, [sessions, currentStreak, totalMinutes]);

  return {
    recommendation,
  };
}