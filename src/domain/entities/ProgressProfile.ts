import type { ProgressProfile } from "../types/domain";
import type { StoredProgress } from "../../repositories/progressRepository";

export function createProgressProfile(): ProgressProfile {
  return {
    currentStageId: "stage-1",
    completedModules: [],
  };
}

export function createProfileFromStoredProgress(
  stored: StoredProgress,
): ProgressProfile {
  return {
    currentStageId: "stage-1",
    completedModules: stored.sessionDates,
  };
}

export function completeModule(
  profile: ProgressProfile,
  moduleId: string,
): ProgressProfile {
  if (profile.completedModules.includes(moduleId)) {
    return profile;
  }

  return {
    ...profile,
    completedModules: [
      ...profile.completedModules,
      moduleId,
    ],
  };
}