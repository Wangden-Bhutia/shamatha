import type { PracticeSession } from "../domain/types/domain";

const PRACTICE_HISTORY_KEY =
  "shamatha.practice.history";

export function loadPracticeHistory(): PracticeSession[] {
  try {
    const raw = localStorage.getItem(
      PRACTICE_HISTORY_KEY,
    );

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((session) => ({
      ...session,
      reflection:
        typeof session.reflection === "string"
          ? session.reflection
          : "",
      mood:
        session.mood ??
        "steady",
    }));
  } catch {
    return [];
  }
}

export function savePracticeHistory(
  sessions: PracticeSession[],
) {
  try {
    localStorage.setItem(
      PRACTICE_HISTORY_KEY,
      JSON.stringify(
  sessions.map((session) => ({
    ...session,
    reflection:
      typeof session.reflection === "string"
        ? session.reflection.trim()
        : "",
    mood:
      session.mood ?? "steady",
  })),
)
    );
  } catch {
    // silent contemplative failure recovery
  }
}