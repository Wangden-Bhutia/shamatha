

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type StageProgressionState = {
  currentStage: number;
};

type StageProgressionContextValue = {
  state: StageProgressionState;
  setCurrentStage: (stage: number) => void;
  resetProgression: () => void;
};


const defaultState: StageProgressionState = {
  currentStage: 1,
};

const StageProgressionContext =
  createContext<StageProgressionContextValue | null>(
    null
  );

export function StageProgressionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] =
    useState<StageProgressionState>(
      defaultState
    );


  const setCurrentStage = (stage: number) => {
    setState((previous) => ({
      ...previous,
      currentStage: stage,
    }));
  };

  const resetProgression = () => {
    setState(defaultState);
  };

  const value = useMemo(
    () => ({
      state,
      setCurrentStage,
      resetProgression,
    }),
    [state]
  );

  return (
    <StageProgressionContext.Provider value={value}>
      {children}
    </StageProgressionContext.Provider>
  );
}

export function useStageProgression() {
  const context = useContext(
    StageProgressionContext
  );

  if (!context) {
    throw new Error(
      "useStageProgression must be used inside StageProgressionProvider"
    );
  }

  return context;
}