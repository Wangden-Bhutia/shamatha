import type {
  PracticeSession,
} from "../types/domain";
const getCurrentPracticePeriod = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 4 && currentHour < 7) {
    return "dawn";
  }

  if (currentHour >= 7 && currentHour < 12) {
    return "morning";
  }

  if (currentHour >= 12 && currentHour < 17) {
    return "afternoon";
  }

  if (
    currentHour >= 17 &&
    currentHour < 21
  ) {
    return "evening";
  }

  return "night";
};
export type MeditationRecommendation = {
  recommendedDurationMinutes: number;
  recommendedPracticeType: string;
  rationale: string;
};

const evaluateRecoveryIntensity = (
  instabilityScore: number,
  volatilityScore: number,
) => {
  if (instabilityScore >= 55) {
    return volatilityScore >= 45 ? 3 : 2;
  }

  if (instabilityScore >= 35) {
    return 2;
  }

  if (instabilityScore >= 20) {
    return 1;
  }

  return 0;
};

const applyRecoveryDurationLimit = (
  duration: number,
  recoveryIntensity: number,
) => {
  if (recoveryIntensity >= 3) {
    return Math.min(duration, 6);
  }

  if (recoveryIntensity === 2) {
    return Math.min(duration, 8);
  }

  if (recoveryIntensity === 1) {
    return Math.min(duration, 12);
  }

  return duration;
};

const appendVolatilityRationale = (
  rationaleFragments: string[],
  volatilityScore: number,
) => {
  if (volatilityScore >= 55) {
    rationaleFragments.push(
      "Reducing volatility in practice rhythm may currently be more beneficial than increasing intensity or duration.",
    );
  }

  if (volatilityScore >= 40) {
    rationaleFragments.push(
      "Your recent practice spacing appears irregular. Smaller calmer sessions may help restore sustainable rhythm.",
    );
  }
};

const classifyPracticeWindow = (
  hour: number,
) => {
  if (hour >= 4 && hour < 11) {
    return "morning";
  }

  if (hour >= 11 && hour < 17) {
    return "afternoon";
  }

  return "evening";
};

const deduplicateRationaleFragments = (
  fragments: string[],
) => {
  return [...new Set(fragments.map(
    (fragment) => fragment.trim(),
  ))];
};

const compressRationale = (
  fragments: string[],
  limit = 4,
) => {
  return deduplicateRationaleFragments(
    fragments,
  )
    .slice(0, limit)
    .join(" ");
};

const normalizeRecommendationDuration = (
  duration: number,
) => {
  return Math.min(
    Math.max(Math.round(duration), 5),
    30,
  );
};

const appendUniqueRationale = (
  rationaleFragments: string[],
  fragment: string,
) => {
  if (!rationaleFragments.includes(fragment)) {
    rationaleFragments.push(fragment);
  }
};

const softenRecommendationTone = (
  rationale: string,
) => {
  return rationale
    .replace(
      /should emphasize/gi,
      "may benefit from emphasizing",
    )
    .replace(
      /should prioritize/gi,
      "may gently prioritize",
    )
    .replace(
      /is more valuable than/gi,
      "can sometimes be more supportive than",
    )
    .replace(
      /is more beneficial than/gi,
      "may currently be more supportive than",
    );
};

export function generateMeditationRecommendation(
  sessions: PracticeSession[],
): MeditationRecommendation {
  const practicePeriod =
    getCurrentPracticePeriod();

       const completedSessions = sessions.filter(
    (session) =>
      Boolean(session.completedAt),
  );

  const totalSessions = completedSessions.length;

  const safeSessions = completedSessions.filter(
    (session) =>
      Number.isFinite(session.durationMinutes),
  );

  const averageDuration =
    totalSessions > 0
      ? Math.round(
          safeSessions.reduce(
            (sum, session) => {
              return sum + (session.durationMinutes ?? 0);
            },
            0,
          ) / Math.max(safeSessions.length, 1),
        )
      : 10;

  const sessionsLast7Days = completedSessions.filter(
    (session) => {
      const completedAt = new Date(
        session.completedAt ?? session.startedAt,
      );

      const diffMs =
        Date.now() - completedAt.getTime();

      return diffMs <= 7 * 24 * 60 * 60 * 1000;
    },
  );

  const consistencyScore = sessionsLast7Days.length;

  const restlessSessions = completedSessions.filter(
    (session) => {
      const reflection =
        session.reflection?.toLowerCase() ?? "";

      return (
        reflection.includes("restless") ||
        reflection.includes("distracted") ||
        reflection.includes("agitated") ||
        reflection.includes("scattered")
      );
    },
  );

  const restlessReflectionRatio =
    totalSessions > 0
      ? restlessSessions.length / totalSessions
      : 0;
  const latestCompletedSession =
    completedSessions[
      completedSessions.length - 1
    ];

  const daysSinceLastPractice =
    latestCompletedSession
      ? Math.floor(
        (Date.now() -
          new Date(
            latestCompletedSession.completedAt ??
              latestCompletedSession.startedAt,
          ).getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : 999;
  const instabilityScore =
    Math.min(
      100,
      restlessReflectionRatio * 45 +
        Math.max(0, 7 - consistencyScore) * 6 +
        Math.min(daysSinceLastPractice, 10) * 5,
    );

  let practiceRhythmState = "new";

  if (consistencyScore >= 5) {
    practiceRhythmState = "consistent";
  } else if (consistencyScore >= 3) {
    practiceRhythmState = "stabilizing";
  } else if (totalSessions > 0) {
    practiceRhythmState = "unstable";
  }


  const practiceHours = completedSessions
    .map((session) => {
      const completedAt = new Date(
        session.completedAt ??
          session.startedAt,
      );

      return completedAt.getHours();
    })
    .filter((hour) =>
      Number.isFinite(hour),
    );

  // --- Practice rhythm volatility tracking ---
  const sortedSessions = [...completedSessions].sort(
    (a, b) => {
      const first = new Date(
        a.completedAt ?? a.startedAt,
      ).getTime();

      const second = new Date(
        b.completedAt ?? b.startedAt,
      ).getTime();

      return first - second;
    },
  );

  const sessionGapDays: number[] = [];

  for (let index = 1; index < sortedSessions.length; index += 1) {
    const previousSession = sortedSessions[index - 1];
    const currentSession = sortedSessions[index];

    const previousTime = new Date(
      previousSession.completedAt ??
        previousSession.startedAt,
    ).getTime();

    const currentTime = new Date(
      currentSession.completedAt ??
        currentSession.startedAt,
    ).getTime();

    const gapDays = Math.max(
      0,
      Math.round(
        (currentTime - previousTime) /
          (1000 * 60 * 60 * 24),
      ),
    );

    sessionGapDays.push(gapDays);
  }

  const averageGapDays =
    sessionGapDays.length > 0
      ? sessionGapDays.reduce(
          (sum, gap) => sum + gap,
          0,
        ) / sessionGapDays.length
      : 0;

  const volatilityScore =
    sessionGapDays.length > 0
      ? Math.min(
          100,
          sessionGapDays.reduce(
            (score, gap) => {
              return (
                score +
                Math.abs(gap - averageGapDays) *
                  8
              );
            },
            0,
          ),
        )
      : 0;

  const burstPracticeDetected =
    averageGapDays < 1 &&
    consistencyScore < 4;

  const averagePracticeHour =
    practiceHours.length > 0
      ? Math.round(
          practiceHours.reduce(
            (sum, hour) => sum + hour,
            0,
          ) / practiceHours.length,
        )
      : null;

  const practiceWindowCounts = {
    morning: 0,
    afternoon: 0,
    evening: 0,
  };

  practiceHours.forEach((hour) => {
    const window =
      classifyPracticeWindow(hour);

    practiceWindowCounts[window] += 1;
  });

  const preferredPracticePeriod =
    Object.entries(practiceWindowCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[1] > 0
      ? Object.entries(practiceWindowCounts).sort(
          (a, b) => b[1] - a[1],
        )[0][0]
      : null;

  const irregularPracticeTiming =
    Object.values(practiceWindowCounts).filter(
      (count) => count > 0,
    ).length >= 3;

  let recommendedDurationMinutes = 10;
  let recommendedPracticeType = "Breath Awareness";
  let recoveryMode = false;
  let recoveryIntensity = 0;
  const rationaleFragments: string[] = [];

  appendUniqueRationale(
    rationaleFragments,
    "A quieter rhythm practiced gently often helps the mind settle naturally.",
  );

  recoveryIntensity =
    evaluateRecoveryIntensity(
      instabilityScore,
      volatilityScore,
    );

  if (practiceRhythmState === "new") {
    appendUniqueRationale(
      rationaleFragments,
      "In the beginning, simply returning softly each day is already enough.",
    );
  }

  if (practiceRhythmState === "unstable") {
    appendUniqueRationale(
      rationaleFragments,
      "Returning quietly, even for a few minutes, begins restoring the rhythm again.",
    );
    appendUniqueRationale(
      rationaleFragments,
      "Patience slowly gathers scattered attention back into steadiness.",
    );
  }

  appendVolatilityRationale(
    rationaleFragments,
    volatilityScore,
  );

  if (practiceRhythmState === "stabilizing") {
    appendUniqueRationale(
      rationaleFragments,
      "Something in the practice is beginning to settle more quietly now.",
    );
  }

  if (practiceRhythmState === "consistent") {
    appendUniqueRationale(
      rationaleFragments,
      "The practice is beginning to move with a steadier breath of its own.",
    );
    if (
      preferredPracticePeriod &&
      preferredPracticePeriod ===
        practicePeriod
    ) {
      appendUniqueRationale(
        rationaleFragments,
        "This time of day aligns naturally with practice.",
      );
    }
  }

  let rationale = compressRationale(
    rationaleFragments,
    4,
  );

  if (preferredPracticePeriod === "morning") {
    appendUniqueRationale(
      rationaleFragments,
      "Morning often carries a natural quietness for sitting.",
    );
    if (practicePeriod === "morning") {
      recommendedDurationMinutes += 2;
    }
  }

  if (preferredPracticePeriod === "evening") {
    appendUniqueRationale(
      rationaleFragments,
      "Evening can help the mind soften and settle more naturally.",
    );
    if (practicePeriod === "evening") {
      recommendedDurationMinutes = Math.min(
        recommendedDurationMinutes + 1,
        24,
      );
    }
  }

  if (daysSinceLastPractice >= 5) {
    if (irregularPracticeTiming) {
      appendUniqueRationale(
        rationaleFragments,
        "Returning around the same time each day often helps the practice deepen quietly.",
      );

      recommendedDurationMinutes = Math.min(
        recommendedDurationMinutes,
        12,
      );
    }
    recoveryMode = true;
    if (volatilityScore >= 50) {
      recommendedDurationMinutes = 5;
    }
    recommendedDurationMinutes =
      recoveryIntensity >= 2 ? 6 : 8;

    recommendedPracticeType =
      "Gentle Breath Awareness";

    appendUniqueRationale(
      rationaleFragments,
      "After time away, a gentle return is often more nourishing than trying to regain momentum quickly.",
    );
  } else if (consistencyScore >= 5) {
    recommendedDurationMinutes = Math.max(
      averageDuration,
      20,
    );

    recommendedPracticeType = "Open Awareness";

    appendUniqueRationale(
      rationaleFragments,
      "As practice steadies, awareness often begins widening on its own.",
    );
  } else if (consistencyScore >= 3) {
    recommendedDurationMinutes = Math.max(
      averageDuration,
      15,
    );

    recommendedPracticeType = "Focused Shamatha";

    appendUniqueRationale(
      rationaleFragments,
      "The mind seems ready now for a slightly deeper and longer sitting.",
    );
  }

  if (
    restlessReflectionRatio >= 0.45 &&
    practiceRhythmState !== "consistent"
  ) {
    recoveryMode = true;
    recoveryIntensity = Math.max(
      recoveryIntensity,
      2,
    );
    if (volatilityScore >= 45) {
      recommendedDurationMinutes = 6;
    }
    recommendedDurationMinutes = Math.min(
      recommendedDurationMinutes,
      10,
    );

    recommendedPracticeType =
      "Gentle Stabilization Practice";

    appendUniqueRationale(
      rationaleFragments,
      "The mind may be asking for a softer and less demanding kind of attention right now.",
    );
  }

  if (burstPracticeDetected) {
    recommendedDurationMinutes = Math.min(
      recommendedDurationMinutes,
      8,
    );

    recommendedPracticeType =
      "Rhythm Stabilization Practice";

    appendUniqueRationale(
      rationaleFragments,
      "A simple steady rhythm often settles the mind more deeply than intensity.",
    );
  }

  if (
    recoveryMode &&
    daysSinceLastPractice >= 7
  ) {
    recommendedDurationMinutes = 8;

    recommendedPracticeType =
      "Continuity Rebuilding Practice";

    appendUniqueRationale(
      rationaleFragments,
      "There is no need to rush back into practice. Quiet return is enough.",
    );
  }

  recommendedDurationMinutes =
    applyRecoveryDurationLimit(
      recommendedDurationMinutes,
      recoveryIntensity,
    );

  if (recoveryIntensity >= 3) {
    appendUniqueRationale(
      rationaleFragments,
      "Very small and gentle sittings may help the mind feel safe returning again.",
    );
  }

  if (recoveryIntensity === 2) {
    appendUniqueRationale(
      rationaleFragments,
      "During unsettled periods, softer practice often restores balance more naturally.",
    );
  }

  rationale = compressRationale(
    rationaleFragments,
    recoveryMode ? 5 : 4,
  );

  let contextualRationale = rationale;

  if (practicePeriod === "dawn") {
    contextualRationale =
      "Early morning carries a natural stillness. " +
      rationale;
  }

  if (practicePeriod === "evening") {
    contextualRationale =
      "Evening invites the mind to soften a little. " +
      rationale;
  }

  if (practicePeriod === "night") {
    contextualRationale =
      "Night asks for gentleness. A small quiet sitting may be enough. " +
      rationale;
  }

  if (
    recoveryMode &&
    recommendedPracticeType ===
      "Gentle Re-Entry Practice"
  ) {
    appendUniqueRationale(
      rationaleFragments,
      "Recovery means patience and gentleness.",
    );
  }
  if (
    recoveryMode &&
    practicePeriod === "night"
  ) {
    recommendedDurationMinutes = Math.min(
      recommendedDurationMinutes,
      6,
    );

    contextualRationale +=
      " Even a few quiet minutes tonight may be enough.";
  }

  if (
    practiceRhythmState === "unstable" &&
    daysSinceLastPractice >= 3
  ) {
    recommendedDurationMinutes = Math.min(
      recommendedDurationMinutes,
      12,
    );

    recommendedPracticeType =
      "Gentle Re-Entry Practice";
  }

  recommendedDurationMinutes =
    normalizeRecommendationDuration(
      recommendedDurationMinutes,
    );

  if (
    recoveryMode &&
    recommendedDurationMinutes > 12
  ) {
    recommendedDurationMinutes = 12;
  }

  if (
    practiceRhythmState === "new" &&
    recommendedDurationMinutes > 15
  ) {
    recommendedDurationMinutes = 15;
  }

  contextualRationale = compressRationale(
    contextualRationale
      .split(".")
      .map((fragment) => fragment.trim())
      .filter(Boolean)
      .map((fragment) => `${fragment}.`),
    5,
  );

  return {
    recommendedDurationMinutes,
    recommendedPracticeType,
        rationale:
      softenRecommendationTone(
        contextualRationale,
      ),
  };
}