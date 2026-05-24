

import { modules } from "../data/modules";
import { loadProgress } from "../repositories/progressRepository";
import {
  createProfileFromStoredProgress,
} from "../domain/entities/ProgressProfile";
import {
  getCurrentStage,
  getNextRecommendedModule,
} from "../domain/services/progressionService";
import { stages } from "../data/stages";

export function useProgression() {
  const storedProgress = loadProgress();

  const profile = createProfileFromStoredProgress(
    storedProgress,
  );

  const currentStage = getCurrentStage(
    stages,
    profile,
  );

  const recommendedModule = getNextRecommendedModule(
    modules,
    profile,
  );

  return {
    profile,
    currentStage,
    recommendedModule,
  };
}