import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const DEFAULT_DURATION_SECONDS = 600;
const MIN_DURATION_SECONDS = 60;
const MAX_DURATION_SECONDS = 60 * 60 * 4;

function normalizeDuration(value?: number) {
  if (!value || Number.isNaN(value)) {
    return DEFAULT_DURATION_SECONDS;
  }

  return Math.min(
    MAX_DURATION_SECONDS,
    Math.max(MIN_DURATION_SECONDS, Math.floor(value)),
  );
}

export function useMeditationTimer(
  initialDurationSeconds?: number,
) {
  const normalizedInitialDuration = useMemo(
    () => normalizeDuration(initialDurationSeconds),
    [initialDurationSeconds],
  );

  const intervalRef = useRef<number | null>(null);

  const [durationSeconds, setDurationSeconds] = useState(
    normalizedInitialDuration,
  );

  const [remainingSeconds, setRemainingSeconds] = useState(
    normalizedInitialDuration,
  );

  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const pause = useCallback(() => {
    clearTimerInterval();
    setIsRunning(false);
  }, [clearTimerInterval]);

  const reset = useCallback(() => {
    clearTimerInterval();
    setRemainingSeconds(durationSeconds);
    setCompleted(false);
    setIsRunning(false);
  }, [clearTimerInterval, durationSeconds]);

  const start = useCallback(() => {
    setCompleted(false);

    setIsRunning((currentRunning) => {
      if (currentRunning) {
        return currentRunning;
      }

      return true;
    });
  }, []);

  const setDuration = useCallback(
    (nextDurationSeconds: number) => {
      const normalizedDuration = normalizeDuration(
        nextDurationSeconds,
      );

      clearTimerInterval();

      setDurationSeconds(normalizedDuration);
      setRemainingSeconds(normalizedDuration);
      setCompleted(false);
      setIsRunning(false);
    },
    [clearTimerInterval],
  );

  useEffect(() => {
    if (!isRunning) {
      clearTimerInterval();
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setRemainingSeconds((currentSeconds) => {
        if (currentSeconds <= 1) {
          clearTimerInterval();
          setIsRunning(false);
          setCompleted(true);
          return 0;
        }

        return currentSeconds - 1;
      });
    }, 1000);

    return () => {
      clearTimerInterval();
    };
  }, [clearTimerInterval, isRunning]);

  useEffect(() => {
    return () => {
      clearTimerInterval();
    };
  }, [clearTimerInterval]);

  const progressPercent = useMemo(() => {
    if (durationSeconds <= 0) {
      return 0;
    }

    return (
      ((durationSeconds - remainingSeconds) /
        durationSeconds) *
      100
    );
  }, [durationSeconds, remainingSeconds]);

  return {
    durationSeconds,
    remainingSeconds,
    isRunning,
    completed,
    progressPercent,
    start,
    pause,
    reset,
    setDuration,
  };
}
