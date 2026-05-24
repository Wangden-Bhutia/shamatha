

export interface StoredProgress {
  sessions: number;
  totalMinutes: number;
  sessionDates: string[];
}

const STORAGE_KEY = "shamatha-progress";

const DEFAULT_PROGRESS: StoredProgress = {
  sessions: 0,
  totalMinutes: 0,
  sessionDates: [],
};

function isValidProgressShape(value: unknown): value is StoredProgress {
  if (!value || typeof value !== "object") {
    return false;
  }

  const progress = value as StoredProgress;

  return (
    typeof progress.sessions === "number" &&
    typeof progress.totalMinutes === "number" &&
    Array.isArray(progress.sessionDates)
  );
}

function sanitizeProgress(progress: StoredProgress): StoredProgress {
  return {
    sessions: Number.isFinite(progress.sessions)
      ? Math.max(0, Math.floor(progress.sessions))
      : 0,

    totalMinutes: Number.isFinite(progress.totalMinutes)
      ? Math.max(0, Math.floor(progress.totalMinutes))
      : 0,

    sessionDates: progress.sessionDates.filter(
      (date) =>
        typeof date === "string" &&
        !Number.isNaN(new Date(date).getTime())
    ),
  };
}

export function loadProgress(): StoredProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return DEFAULT_PROGRESS;
    }

    const parsed: unknown = JSON.parse(raw);

    if (!isValidProgressShape(parsed)) {
      localStorage.removeItem(STORAGE_KEY);
      return DEFAULT_PROGRESS;
    }

    return sanitizeProgress(parsed);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(data: StoredProgress): void {
  try {
    const safeData = sanitizeProgress(data);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeData));
  } catch {
    // Prevent persistence failures from crashing meditation flow
  }
}