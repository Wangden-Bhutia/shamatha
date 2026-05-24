import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { stageGuidedPrograms } from "../domain/stages/stageGuidedPrograms";
import {
  clearGuidedMeditationState,
  loadGuidedMeditationState,
  saveGuidedMeditationState,
} from "../repositories/guidedMeditationRepository";
import type {
  GuidancePlaybackState,
  GuidedMeditation,
} from "../domain/types/guidance";

export function useGuidedMeditation(
  meditationId = "foundational-shamatha",
) {
  const currentStage =
    Number(
      localStorage.getItem(
        "current-shamatha-stage"
      )
    ) || 1;

  const meditation = useMemo(() => {
    return (
      stageGuidedPrograms[
        currentStage as keyof typeof stageGuidedPrograms
      ] ?? stageGuidedPrograms[1]
    );
  }, [currentStage]);

  const [playbackState, setPlaybackState] =
    useState<GuidancePlaybackState>(() => {
      return (
        loadGuidedMeditationState() ?? {
          meditationId,
          currentPhaseIndex: 0,
          isPlaying: false,
        }
      );
    });

  const currentPhase =
    meditation.phases[
      playbackState.currentPhaseIndex
    ];

  useEffect(() => {
    saveGuidedMeditationState(playbackState);
  }, [playbackState]);

  useEffect(() => {
    if (!playbackState.isPlaying) {
      return;
    }

    const durationMs =
      currentPhase.durationMinutes * 60 * 1000;

    const timeout = window.setTimeout(() => {
      nextPhase();
    }, durationMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [
    playbackState.isPlaying,
    playbackState.currentPhaseIndex,
    currentPhase.durationMinutes,
  ]);

  function startMeditation() {
    setPlaybackState((previous) => ({
      ...previous,
      isPlaying: true,
      startedAt:
        previous.startedAt ??
        new Date().toISOString(),
    }));
  }

  function pauseMeditation() {
    setPlaybackState((previous) => ({
      ...previous,
      isPlaying: false,
    }));
  }

  function nextPhase() {
    setPlaybackState((previous) => {
      const nextIndex =
        previous.currentPhaseIndex + 1;

      const isComplete =
        nextIndex >= meditation.phases.length;

      if (isComplete) {
        clearGuidedMeditationState();
        return {
          ...previous,
          isPlaying: false,
          completedAt: new Date().toISOString(),
        };
      }

      return {
        ...previous,
        currentPhaseIndex: nextIndex,
      };
    });
  }

  function previousPhase() {
    setPlaybackState((previous) => ({
      ...previous,
      currentPhaseIndex: Math.max(
        0,
        previous.currentPhaseIndex - 1,
      ),
    }));
  }

  function resetMeditation() {
    setPlaybackState({
      meditationId,
      currentPhaseIndex: 0,
      isPlaying: false,
    });
  }

  return {
    meditation,
    currentPhase,
    playbackState,
    startMeditation,
    pauseMeditation,
    nextPhase,
    previousPhase,
    resetMeditation,
  };
}