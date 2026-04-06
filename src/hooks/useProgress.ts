import { useState, useEffect, useRef } from "react";

type ProgressData = {
  sessions: number;
  totalMinutes: number;
  sessionDates: string[];
};

export function useProgress() {
  const [data, setData] = useState<ProgressData>({
    sessions: 0,
    totalMinutes: 0,
    sessionDates: [],
  });

  const isFirstRender = useRef(true);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("shamatha-progress");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("shamatha-progress", JSON.stringify(data));
  }, [data]);

  const addSession = (minutes: number) => {
    const today = new Date().toISOString().split("T")[0];

    setData((prev) => ({
      sessions: prev.sessions + 1,
      totalMinutes: prev.totalMinutes + minutes,
      sessionDates: [...prev.sessionDates, today],
    }));
  };

  const getLast7DaysCount = () => {
    const today = new Date();

    const uniqueDays = new Set(
      data.sessionDates.filter((date) => {
        const d = new Date(date);
        const diff =
          (today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
        return diff <= 7;
      })
    );

    return uniqueDays.size;
  };

  return {
    sessions: data.sessions,
    totalMinutes: data.totalMinutes,
    addSession,
    getLast7DaysCount,
  };
}