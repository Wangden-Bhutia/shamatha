import {
  useEffect,
  useRef,
  useState,
} from "react";

export function useMeditationTimer(
  initialMinutes = 10,
  onComplete?: () => void,
  intervalBellMinutes?: number,
) {
  const [remainingSeconds, setRemainingSeconds] = useState(
    initialMinutes * 60,
  );

  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const previousInitialMinutesRef = useRef(initialMinutes);
  const lastBellSecondRef = useRef<number | null>(null);

  useEffect(() => {
    if (
      previousInitialMinutesRef.current !== initialMinutes &&
      !isRunning
    ) {
      setRemainingSeconds(initialMinutes * 60);
      previousInitialMinutesRef.current = initialMinutes;
    }
  }, [
    initialMinutes,
    isRunning,
  ]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setRemainingSeconds((previous) => {
        if (
          intervalBellMinutes &&
          previous > 1 &&
          previous % (intervalBellMinutes * 60) === 0 &&
          lastBellSecondRef.current !== previous
        ) {
          lastBellSecondRef.current = previous;

          try {
            const bell = new Audio("/bell.mp3");
            bell.play();
          } catch {
            // ignore audio failures
          }
        }
        if (previous <= 1) {
          stopTimer();

          if (onComplete) {
            onComplete();
          }

          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  function startTimer() {
    setIsRunning(true);
  }

  function pauseTimer() {
    setIsRunning(false);
  }

  function resetTimer(minutes = initialMinutes) {
    setIsRunning(false);
    setRemainingSeconds(minutes * 60);
  }

  function stopTimer() {
    setIsRunning(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return {
    remainingSeconds,
    formattedTime,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    stopTimer,
  };
}