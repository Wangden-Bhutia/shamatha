import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getCompletedModuleCount,
} from "../domain/services/progressionService";
import {
  loadProgress,
  saveProgress,
  type StoredProgress,
} from "../repositories/progressRepository";

const DEFAULT_PROGRESS: StoredProgress = {
  sessions: 0,
  totalMinutes: 0,
  sessionDates: [],
};

const CONTEMPLATIVE_MILESTONES = [
  {
    threshold: 1,
    title: "Beginning the Path",
    description:
      "A first deliberate step into contemplative continuity.",
  },
  {
    threshold: 7,
    title: "Establishing Rhythm",
    description:
      "Practice is beginning to settle into lived repetition.",
  },
  {
    threshold: 14,
    title: "Deepening Stability",
    description:
      "Attention is gradually learning steadiness and return.",
  },
  {
    threshold: 30,
    title: "Continuity of Practice",
    description:
      "Meditation is becoming part of the structure of daily life.",
  },
];

function sanitizeProgress(progress: StoredProgress): StoredProgress {
  const safeSessions = Number.isFinite(progress.sessions)
    ? Math.max(0, Math.floor(progress.sessions))
    : 0;

  const safeTotalMinutes = Number.isFinite(progress.totalMinutes)
    ? Math.max(0, Math.floor(progress.totalMinutes))
    : 0;

  const safeSessionDates = Array.isArray(progress.sessionDates)
    ? progress.sessionDates.filter(
        (date) =>
          typeof date === "string" &&
          !Number.isNaN(new Date(date).getTime())
      )
    : [];

  return {
    sessions: safeSessions,
    totalMinutes: safeTotalMinutes,
    sessionDates: safeSessionDates,
  };
}

export function useProgress() {
  const [data, setData] = useState<StoredProgress>(DEFAULT_PROGRESS);

  const isFirstRender = useRef(true);

  useEffect(() => {
    try {
      const loaded = loadProgress();
      setData(sanitizeProgress(loaded));
    } catch {
      setData(DEFAULT_PROGRESS);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    saveProgress(data);
  }, [data]);

  const addSession = useCallback((minutes: number) => {
    const safeMinutes = Math.max(1, Math.round(minutes));
    const today = new Date().toISOString().split("T")[0];

    setData((prev) => ({
      sessions: prev.sessions + 1,
      totalMinutes: prev.totalMinutes + safeMinutes,
      sessionDates: [...prev.sessionDates, today],
    }));
  }, []);

  const last7DaysCount = useMemo(() => {
    const today = new Date();

    const uniqueDays = new Set(
      data.sessionDates.filter((date) => {
        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
          return false;
        }

        const diff =
          (today.getTime() - parsedDate.getTime()) /
          (1000 * 60 * 60 * 24);

        return diff >= 0 && diff <= 7;
      })
    );

    return uniqueDays.size;
  }, [data.sessionDates]);

  const currentStreak = useMemo(() => {
    const uniqueDates = Array.from(
      new Set(data.sessionDates)
    )
      .map((date) => new Date(date))
      .filter(
        (date) => !Number.isNaN(date.getTime())
      )
      .sort((a, b) => b.getTime() - a.getTime());

    if (uniqueDates.length === 0) {
      return 0;
    }

    let streak = 0;
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < uniqueDates.length; i += 1) {
      const comparisonDate = new Date(today);

      comparisonDate.setDate(today.getDate() - i);

      const sessionDate = new Date(uniqueDates[i]);

      sessionDate.setHours(0, 0, 0, 0);

      const diff =
        comparisonDate.getTime() -
        sessionDate.getTime();

      if (diff === 0) {
        streak += 1;
      } else {
        break;
      }
    }

    return streak;
  }, [data.sessionDates]);

  const currentMilestone = useMemo(() => {
    const achievedMilestones =
      CONTEMPLATIVE_MILESTONES.filter(
        (milestone) =>
          data.sessions >= milestone.threshold
      );

    if (achievedMilestones.length === 0) {
      return null;
    }

    return achievedMilestones[
      achievedMilestones.length - 1
    ];
  }, [data.sessions]);

  const completedModuleCount = getCompletedModuleCount({
    currentStageId: "stage-1",
    completedModules: data.sessionDates,
  });

  return {
    sessions: data.sessions,
    totalMinutes: data.totalMinutes,
    currentStreak,
    currentMilestone,
    completedModuleCount,
    addSession,
    getLast7DaysCount: () => last7DaysCount,
  };
}
