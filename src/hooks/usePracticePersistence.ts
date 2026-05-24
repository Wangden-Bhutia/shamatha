import type { PracticeSession } from "../domain/types/domain";

export type PracticeHistoryEntry = {
  date: string;
  durationMinutes: number;
  practiceType: string;
  reflection?: string;
};

const ACTIVE_SESSION_STORAGE_KEY =
  "shamatha-active-session";

const PRACTICE_HISTORY_STORAGE_KEY =
  "shamatha-practice-history";

const MAX_SESSION_DURATION_MINUTES = 180;
const MAX_RECOVERY_SESSION_AGE_HOURS = 12;
const MAX_HISTORY_ENTRIES = 50;

function safeJsonParse<T>(
  value: string | null,
  fallback: T,
): T {
  if (!value) {
    return fallback;
  }

  try {
    const parsedData = JSON.parse(
      value,
    ) as T;

    if (
      parsedData === null ||
      typeof parsedData !== "object"
    ) {
      return fallback;
    }

    return parsedData;
  } catch {
    return fallback;
  }
}

function isValidPracticeSession(
  value: unknown,
): value is PracticeSession {
  if (!value || typeof value !== "object") {
    return false;
  }

  const session = value as Record<
    string,
    unknown
  >;

  return (
    typeof session.id === "string" &&
    typeof session.moduleId === "string" &&
    typeof session.startedAt === "string"
  );
}

function isValidPracticeHistoryEntry(
  value: unknown,
): value is PracticeHistoryEntry {
  if (!value || typeof value !== "object") {
    return false;
  }

  const entry = value as Record<
    string,
    unknown
  >;

  return (
    typeof entry.date === "string" &&
    typeof entry.durationMinutes ===
      "number" &&
    typeof entry.practiceType === "string"
  );
}

function isSessionExpired(
  session: PracticeSession,
) {
  const startedAt = new Date(
    session.startedAt,
  ).getTime();

  if (Number.isNaN(startedAt)) {
    return true;
  }

  const elapsedHours =
    (Date.now() - startedAt) /
    (1000 * 60 * 60);

  return (
    elapsedHours >
    MAX_RECOVERY_SESSION_AGE_HOURS
  );
}

function normalizePracticeSession(
  session: PracticeSession,
) {
  const rawDuration =
    typeof (
      session as PracticeSession & {
        durationMinutes?: unknown;
      }
    ).durationMinutes === "number"
      ? (
          session as PracticeSession & {
            durationMinutes: number;
          }
        ).durationMinutes
      : 10;

  const rawRemainingSeconds =
    typeof (
      session as PracticeSession & {
        remainingSeconds?: unknown;
      }
    ).remainingSeconds === "number"
      ? (
          session as PracticeSession & {
            remainingSeconds: number;
          }
        ).remainingSeconds
      : rawDuration * 60;

  const normalizedDuration = Math.min(
    Math.max(rawDuration, 1),
    MAX_SESSION_DURATION_MINUTES,
  );

  const normalizedRemainingSeconds = Math.min(
    Math.max(rawRemainingSeconds, 0),
    normalizedDuration * 60,
  );

  return {
    ...session,
    durationMinutes: normalizedDuration,
    remainingSeconds:
      normalizedRemainingSeconds,
  };
}

export function loadPersistedActiveSession() {
  const parsed = safeJsonParse<unknown>(
    localStorage.getItem(
      ACTIVE_SESSION_STORAGE_KEY,
    ),
    null,
  );

  if (!isValidPracticeSession(parsed)) {
    clearPersistedActiveSession();
    return null;
  }

  if (isSessionExpired(parsed)) {
    clearPersistedActiveSession();
    return null;
  }

  const normalizedSession =
    normalizePracticeSession(parsed);

  persistActiveSession(normalizedSession);

  return normalizedSession;
}

export function persistActiveSession(
  session: PracticeSession,
) {
  const normalizedSession =
    normalizePracticeSession(session);
  localStorage.setItem(
    ACTIVE_SESSION_STORAGE_KEY,
    JSON.stringify(normalizedSession),
  );
}

export function clearPersistedActiveSession() {
  localStorage.removeItem(
    ACTIVE_SESSION_STORAGE_KEY,
  );
}

export function loadPracticeHistory() {
  const parsed = safeJsonParse<unknown>(
    localStorage.getItem(
      PRACTICE_HISTORY_STORAGE_KEY,
    ),
    [],
  );

  if (!Array.isArray(parsed)) {
    persistPracticeHistory([]);
    return [];
  }

  const normalizedHistory = parsed.filter(
    isValidPracticeHistoryEntry,
  );

  const trimmedHistory =
  normalizedHistory.slice(
    0,
    MAX_HISTORY_ENTRIES,
  );

  if (
    normalizedHistory.length !== parsed.length
  ) {
    persistPracticeHistory(
      trimmedHistory,
    );
  }

  return trimmedHistory;
}

export function clearPracticeHistory() {
  localStorage.removeItem(
    PRACTICE_HISTORY_STORAGE_KEY,
  );
}

export function persistPracticeHistory(
  history: PracticeHistoryEntry[],
) {
  localStorage.setItem(
    PRACTICE_HISTORY_STORAGE_KEY,
    JSON.stringify(history),
  );
}