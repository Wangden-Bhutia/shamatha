import React, { createContext, useContext, useEffect, useState } from "react";

export type AttentionState = {
  isIdle: boolean;
  attentionScore: number;
  lastActive: number;
};

const AttentionEngineContext = createContext<AttentionState | undefined>(undefined);

export const AttentionEngineProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isIdle, setIsIdle] = useState(false);
  const [attentionScore, setAttentionScore] = useState(1);
  const [lastActive, setLastActive] = useState(Date.now());

  useEffect(() => {
    let idleTimer: any;

    const updateActivity = () => {
      const now = Date.now();
      setLastActive(now);
      setIsIdle(false);

      // increase attention score slightly on interaction (cap at 1)
      setAttentionScore((prev) => Math.min(1, prev + 0.05));

      clearTimeout(idleTimer);

      idleTimer = setTimeout(() => {
        setIsIdle(true);
        setAttentionScore((prev) => Math.max(0.2, prev - 0.1));
      }, 4000);
    };

    const events = ["mousemove", "keydown", "scroll", "touchstart"];

    events.forEach((event) =>
      window.addEventListener(event, updateActivity)
    );

    // initialize idle timer
    updateActivity();

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, updateActivity)
      );
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <AttentionEngineContext.Provider
      value={{ isIdle, attentionScore, lastActive }}
    >
      {children}
    </AttentionEngineContext.Provider>
  );
};

export const useAttentionEngine = (): AttentionState => {
  const context = useContext(AttentionEngineContext);

  if (!context) {
    throw new Error("useAttentionEngine must be used within AttentionEngineProvider");
  }

  return context;
};
