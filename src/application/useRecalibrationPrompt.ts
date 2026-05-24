

import { useEffect, useState } from "react";
import { useStageProgression } from "./useStageProgression";

export const useRecalibrationPrompt = () => {
  const {
    shouldSuggestRecalibration,
    dismissRecalibration,
    sessionCount,
  } = useStageProgression();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (shouldSuggestRecalibration) {
      setIsVisible(true);
    }
  }, [shouldSuggestRecalibration]);

  const acceptRecalibration = () => {
    setIsVisible(false);
    dismissRecalibration();
    // future hook: navigate to assessment flow
  };

  const declineRecalibration = () => {
    setIsVisible(false);
    dismissRecalibration();
  };

  return {
    isVisible,
    totalSessions: sessionCount,
    acceptRecalibration,
    declineRecalibration,
  };
};