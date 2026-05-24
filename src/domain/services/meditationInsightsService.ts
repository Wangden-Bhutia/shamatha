import type {
  PracticeSession,
} from "../types/domain";

export type MeditationInsights = {
  totalSessions: number;
  totalMinutes: number;
  averageSessionMinutes: number;
  longestSessionMinutes: number;
  weeklyConsistencyScore: number;
  preferredPracticeTime: string;
  insightSummary: string;
};

const deduplicateInsightFragments = (
  fragments: string[],
) => {
  return [...new Set(
    fragments.map((fragment) =>
      fragment.trim(),
    ),
  )];
};

const compressInsightFragments = (
  fragments: string[],
  limit = 3,
) => {
  return deduplicateInsightFragments(
    fragments,
  ).slice(0, limit);
};

const appendUniqueInsight = (
  fragments: string[],
  fragment: string,
) => {
  if (!fragments.includes(fragment)) {
    fragments.push(fragment);
  }
};

const normalizeInsightSummary = (
  summary: string,
) => {
  return summary
    .replace(/\s+/g, " ")
    .replace(/\.\./g, ".")
    .trim();
};

export function generateMeditationInsights(
  sessions: PracticeSession[],
): MeditationInsights {
  const summaryOpenings = [
    "Your recent contemplative rhythm reflects",
    "A gradual continuity of practice is beginning to emerge through",
    "Recent meditation sessions suggest",
    "Your current practice pattern reflects",
  ];

  const continuityPhrases = [
    "a slowly stabilizing attentional rhythm",
    "developing contemplative continuity",
    "an evolving relationship with attentional steadiness",
    "growing familiarity with sustained awareness",
  ];

  const contemplativeClosings = [
    "Attentional stability often deepens gradually through repeated return.",
    "Small consistent sessions frequently cultivate steadier awareness over time.",
    "The cultivation of steadiness usually unfolds progressively rather than suddenly.",
    "Gentle continuity often supports deeper contemplative stability than intensity.",
  ];

  const completedSessions = sessions.filter(
    (session) =>
      Boolean(session.completedAt),
  );

  const totalSessions = completedSessions.length;

  const safeSessions = completedSessions.filter(
    (session) =>
      Number.isFinite(session.durationMinutes),
  );

  const totalMinutes = safeSessions.reduce(
    (sum, session) => {
      return sum + (session.durationMinutes ?? 0);
    },
    0,
  );

  const recentDurations = safeSessions
    .slice(-5)
    .map(
      (session) =>
        session.durationMinutes ?? 0,
    );

  const averageRecentDuration =
    recentDurations.length > 0
      ? Math.round(
          recentDurations.reduce(
            (sum, value) => sum + value,
            0,
          ) / recentDurations.length,
        )
      : 0;

  const unstablePracticeRhythm =
    recentDurations.length >= 3 &&
    Math.max(...recentDurations) -
      Math.min(...recentDurations) >
      20;

  const reflections = completedSessions
    .map((session) =>
      session.reflection?.toLowerCase() ?? "",
    )
    .filter((reflection) => reflection.length > 0);

  const recentReflections = reflections.slice(-5);

  const olderReflections = reflections.slice(
    0,
    Math.max(0, reflections.length - 5),
  );

  const calmReflectionCount = reflections.filter(
    (reflection) =>
      reflection.includes("calm") ||
      reflection.includes("steady") ||
      reflection.includes("clear") ||
      reflection.includes("quiet"),
  ).length;

  const restlessReflectionCount = reflections.filter(
    (reflection) =>
      reflection.includes("restless") ||
      reflection.includes("distracted") ||
      reflection.includes("agitated") ||
      reflection.includes("wandering"),
  ).length;

  const dullReflectionCount = reflections.filter(
    (reflection) =>
      reflection.includes("dull") ||
      reflection.includes("sleepy") ||
      reflection.includes("foggy") ||
      reflection.includes("heavy"),
  ).length;

  const motivatedReflectionCount = reflections.filter(
    (reflection) =>
      reflection.includes("focused") ||
      reflection.includes("motivated") ||
      reflection.includes("energized") ||
      reflection.includes("engaged"),
  ).length;

  const fragmentedReflectionCount = reflections.filter(
    (reflection) =>
      reflection.includes("fragmented") ||
      reflection.includes("scattered") ||
      reflection.includes("overwhelmed") ||
      reflection.includes("chaotic"),
  ).length;

  const recentCalmCount = recentReflections.filter(
    (reflection) =>
      reflection.includes("calm") ||
      reflection.includes("steady") ||
      reflection.includes("clear") ||
      reflection.includes("quiet"),
  ).length;

  const recentRestlessCount =
    recentReflections.filter(
      (reflection) =>
        reflection.includes("restless") ||
        reflection.includes("distracted") ||
        reflection.includes("agitated") ||
        reflection.includes("wandering"),
    ).length;

  const olderCalmCount = olderReflections.filter(
    (reflection) =>
      reflection.includes("calm") ||
      reflection.includes("steady") ||
      reflection.includes("clear") ||
      reflection.includes("quiet"),
  ).length;

  const olderRestlessCount =
    olderReflections.filter(
      (reflection) =>
        reflection.includes("restless") ||
        reflection.includes("distracted") ||
        reflection.includes("agitated") ||
        reflection.includes("wandering"),
    ).length;

  let dominantReflectionTone = "calm";

  const toneCounts = {
    calm: calmReflectionCount,
    restless: restlessReflectionCount,
    dull: dullReflectionCount,
    motivated: motivatedReflectionCount,
    fragmented: fragmentedReflectionCount,
  };

  dominantReflectionTone = Object.entries(
    toneCounts,
  ).reduce((dominant, current) => {
    return current[1] > dominant[1]
      ? current
      : dominant;
  })[0];

  const emotionalTrajectoryStabilizing =
    recentCalmCount > recentRestlessCount &&
    recentCalmCount >= olderCalmCount;

  const emotionalTrajectoryRecovering =
    recentRestlessCount > 0 &&
    recentRestlessCount < olderRestlessCount;

  const emotionalTrajectoryWorsening =
    recentRestlessCount > olderRestlessCount &&
    recentRestlessCount >= 3;

  const averageSessionMinutes =
    totalSessions > 0
      ? Math.round(
          totalMinutes /
            Math.max(safeSessions.length, 1),
        )
      : 0;

  const longestSessionMinutes = Math.max(
    ...completedSessions.map(
      (session) => session.durationMinutes ?? 0,
    ),
    0,
  );

  const sessionsLast7Days = completedSessions.filter(
    (session) => {
      const completedAt = new Date(
        session.completedAt ?? session.startedAt,
      );

      const now = new Date();

      const diffMs =
        now.getTime() - completedAt.getTime();

      return diffMs <= 7 * 24 * 60 * 60 * 1000;
    },
  );

  const weeklyConsistencyScore = Math.min(
    100,
    Math.round((sessionsLast7Days.length / 7) * 100),
  );

  const insightSeed =
    totalSessions +
    weeklyConsistencyScore +
    averageSessionMinutes +
    calmReflectionCount * 2 +
    restlessReflectionCount * 3 +
    dullReflectionCount * 4 +
    motivatedReflectionCount * 5 +
    fragmentedReflectionCount * 6;

  const selectedOpening =
    summaryOpenings[
      insightSeed % summaryOpenings.length
    ];

  const selectedContinuityPhrase =
    continuityPhrases[
      (insightSeed + averageSessionMinutes) %
        continuityPhrases.length
    ];

  const selectedClosing =
    contemplativeClosings[
      (insightSeed + weeklyConsistencyScore) %
        contemplativeClosings.length
    ];

  const hours = completedSessions.map((session) => {
    return new Date(session.startedAt).getHours();
  });

  const morningCount = hours.filter(
    (hour) => hour >= 5 && hour < 12,
  ).length;

  const afternoonCount = hours.filter(
    (hour) => hour >= 12 && hour < 18,
  ).length;

  const eveningCount = hours.filter(
    (hour) => hour >= 18 || hour < 5,
  ).length;

  let preferredPracticeTime = "Morning";

  if (
    afternoonCount > morningCount &&
    afternoonCount > eveningCount
  ) {
    preferredPracticeTime = "Afternoon";
  }

  if (
    eveningCount > morningCount &&
    eveningCount > afternoonCount
  ) {
    preferredPracticeTime = "Evening";
  }

  const adaptiveInsightFragments: string[] = [];
  const emotionalComplexityHigh =
    restlessReflectionCount +
      fragmentedReflectionCount +
      dullReflectionCount >=
    6;
  let insightSummary =
    totalSessions === 0
      ? "Complete your first meditation session to begin generating contemplative insights."
      : `${selectedOpening} ${selectedContinuityPhrase}. You have completed ${totalSessions} meditation sessions with an average duration of ${averageSessionMinutes} minutes. Your recent consistency score is ${weeklyConsistencyScore}% and your most common practice period is ${preferredPracticeTime.toLowerCase()}.`;

  if (unstablePracticeRhythm) {
    appendUniqueInsight(
      adaptiveInsightFragments,
      "Your recent practice rhythm has been somewhat uneven. A gentler consistency may help attention stabilize more naturally.",
    );
    if (averageRecentDuration <= 10) {
      appendUniqueInsight(
        adaptiveInsightFragments,
        "Shorter more repeatable sessions may currently support steadier contemplative continuity than intensity expansion.",
      );
    }
  }
  if (averageRecentDuration >= 25) {
    appendUniqueInsight(
      adaptiveInsightFragments,
      "Your recent sessions suggest growing capacity for sustained attentional continuity.",
    );
  }

  if (
    calmReflectionCount > 0 &&
    calmReflectionCount >=
      restlessReflectionCount
  ) {
    appendUniqueInsight(
      adaptiveInsightFragments,
      "Your reflections increasingly suggest moments of steadiness and clarity emerging within practice.",
    );
  }

  if (
    restlessReflectionCount >= 3 &&
    restlessReflectionCount >
      calmReflectionCount
  ) {
    appendUniqueInsight(
      adaptiveInsightFragments,
      "Recent reflections suggest recurring restlessness. Shorter gentler sessions may help stabilize continuity.",
    );
  }

  if (emotionalTrajectoryStabilizing) {
    appendUniqueInsight(
      adaptiveInsightFragments,
      "Your recent reflections suggest attentional steadiness may be gradually stabilizing over time.",
    );
  }

  if (emotionalTrajectoryRecovering) {
    appendUniqueInsight(
      adaptiveInsightFragments,
      "Recent reflections suggest gradual recovery from earlier periods of distraction or agitation.",
    );
    if (weeklyConsistencyScore >= 40) {
      appendUniqueInsight(
        adaptiveInsightFragments,
        "Continued gentle consistency may help stabilize the gradual recovery reflected in your recent sessions.",
      );
    }
  }

  if (emotionalTrajectoryWorsening) {
    appendUniqueInsight(
      adaptiveInsightFragments,
      "Your recent reflections suggest increasing cognitive agitation. Gentler continuity may currently be more beneficial than intensity.",
    );
    if (emotionalComplexityHigh) {
      appendUniqueInsight(
        adaptiveInsightFragments,
        "Periods of increased cognitive fragmentation are often better approached with softer continuity and reduced internal pressure.",
      );
    }
  }

  const compressedInsights =
    compressInsightFragments(
      adaptiveInsightFragments,
      emotionalComplexityHigh ? 4 : 3,
    );

  const stabilizedInsights =
    compressInsightFragments(
      compressedInsights,
      emotionalComplexityHigh ? 4 : 3,
    );

  if (
    totalSessions >= 20 &&
    weeklyConsistencyScore >= 60
  ) {
    appendUniqueInsight(
      stabilizedInsights,
      "Your overall practice continuity suggests meditation may be gradually becoming integrated into your broader daily rhythm.",
    );
  }
  if (stabilizedInsights.length > 0) {
    insightSummary += ` ${stabilizedInsights.join(" ")}`;
  }

  if (totalSessions > 0) {
    insightSummary += ` ${selectedClosing}`;
  }

  insightSummary = normalizeInsightSummary(
    insightSummary,
  );

  return {
    totalSessions,
    totalMinutes,
    averageSessionMinutes,
    longestSessionMinutes,
    weeklyConsistencyScore,
    preferredPracticeTime,
    insightSummary,
  };
}