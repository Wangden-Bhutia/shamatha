

import { useMeditationSettings } from "../application/useMeditationSettings";
import { useMeditationTimer } from "../application/useMeditationTimer";
import { usePracticeSession } from "../application/usePracticeSession";
import { AmbientAudioPanel } from "./AmbientAudioPanel";
import { MeditationInsightsPanel } from "./MeditationInsightsPanel";
import { MeditationRecommendationPanel } from "./MeditationRecommendationPanel";
import { MeditationSettingsPanel } from "./MeditationSettingsPanel";
import { MeditationTimerCard } from "./MeditationTimerCard";

export function MeditationEnvironment() {
  const {
    settings,
  } = useMeditationSettings();

  const {
    finishSession,
  } = usePracticeSession();

  const {
    formattedTime,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useMeditationTimer(
    settings.sessionDurationMinutes,
    () => {
      finishSession(
        "guided-shamatha",
        settings.sessionDurationMinutes,
      );
    },
    settings.intervalBellEnabled
      ? settings.intervalBellMinutes
      : undefined,
  );

  return (
    <>
      <MeditationTimerCard
        formattedTime={formattedTime}
        isRunning={isRunning}
        onStartPause={
          isRunning
            ? pauseTimer
            : startTimer
        }
        onReset={() => resetTimer()}
      />

      <MeditationSettingsPanel />

      <AmbientAudioPanel />

      <MeditationInsightsPanel />

      <MeditationRecommendationPanel />
    </>
  );
}
