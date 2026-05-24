

import { useMemo } from "react";
import { useProgress } from "./useProgress";


export type PracticeInsight = {
  title: string;
  description: string;
};

function buildContinuityInsight(
  streak: number
): PracticeInsight | null {
  if (streak >= 21) {
    return {
      title: "Deepening Stability",
      description:
        "Longer continuity often reflects gradually strengthening familiarity with sustained attentional steadiness.",
    };
  }

  if (streak >= 7) {
    return {
      title: "Rhythm Stabilizing",
      description:
        "Repeated return to practice appears to be establishing a more stable contemplative rhythm.",
    };
  }

  if (streak >= 3) {
    return {
      title: "Continuity Emerging",
      description:
        "Recent consistency suggests attention is beginning to stabilize through repeated return.",
    };
  }

  return null;
}

function buildPracticeVolumeInsight(
  sessions: number,
  totalMinutes: number
): PracticeInsight | null {
  if (totalMinutes >= 300) {
    return {
      title: "Accumulated Familiarity",
      description:
        "Extended cumulative practice time often supports greater familiarity with stillness, distraction, and gradual return.",
    };
  }

  if (totalMinutes >= 120) {
    return {
      title: "Accumulating Stillness",
      description:
        "Longer cumulative practice time often supports greater familiarity with sustained attention and calm observation.",
    };
  }

  if (sessions >= 10) {
    return {
      title: "Practice Becoming Structured",
      description:
        "Meditation appears to be gradually integrating into the rhythm of ordinary daily life.",
    };
  }

  return null;
}

function buildInsights(
  sessions: number,
  streak: number,
  totalMinutes: number
): PracticeInsight[] {
  const insights: PracticeInsight[] = [];

  if (sessions === 0) {
    insights.push({
      title: "Beginning Slowly",
      description:
        "Early meditation practice develops through gentle repetition rather than intensity or pressure.",
    });
    return insights;
  }

  const continuityInsight =
    buildContinuityInsight(streak);

  if (continuityInsight) {
    insights.push(continuityInsight);
  }

  const practiceVolumeInsight =
    buildPracticeVolumeInsight(
      sessions,
      totalMinutes
    );

  if (practiceVolumeInsight) {
    insights.push(practiceVolumeInsight);
  }

  if (
    streak === 0 &&
    sessions > 0
  ) {
    insights.push({
      title: "Returning After Interruption",
      description:
        "Periods of interruption are a normal part of contemplative training. Gentle resumption often matters more than intensity.",
    });
  }

  if (insights.length === 0) {
    insights.push({
      title: "Returning Gently",
      description:
        "Steady continuity matters more than intensity. Even brief sessions help maintain contemplative familiarity.",
    });
  }

  return insights.slice(0, 3);
}

export function usePracticeInsights() {
  const {
    sessions,
    currentStreak,
    totalMinutes,
  } = useProgress();

  const insights = useMemo(() => {
    return buildInsights(
      sessions,
      currentStreak,
      totalMinutes
    );
  }, [sessions, currentStreak, totalMinutes]);

  return {
    insights,
  };
}