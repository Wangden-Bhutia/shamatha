

import type {
  Module,
  ProgressProfile,
  Stage,
} from "../types/domain";

export function getCurrentStage(
  stages: Stage[],
  profile: ProgressProfile,
): Stage | undefined {
  return stages.find(
    (stage) => stage.id === profile.currentStageId,
  );
}

export function isModuleCompleted(
  moduleId: string,
  profile: ProgressProfile,
): boolean {
  return profile.completedModules.includes(moduleId);
}

export function getCompletedModuleCount(
  profile: ProgressProfile,
): number {
  return profile.completedModules.length;
}

export function getContemplativeMilestones(
  profile: ProgressProfile,
): string[] {
  const completedCount =
    profile.completedModules.length;

  const milestones: string[] = [];

  if (completedCount >= 1) {
    milestones.push(
      "Initial continuity of practice has begun to stabilize.",
    );
  }

  if (completedCount >= 3) {
    milestones.push(
      "Practice rhythm is becoming more established.",
    );
  }

  if (completedCount >= 5) {
    milestones.push(
      "Sustained attentional training capacity is deepening gradually.",
    );
  }

  if (completedCount >= 8) {
    milestones.push(
      "Longer-term contemplative continuity is beginning to mature.",
    );
  }

  return milestones;
}

export function getNextRecommendedModule(
  modules: Module[],
  profile: ProgressProfile,
): Module | undefined {
  return modules.find(
  (module) =>
    !profile.completedModules.includes(
      String(module.id),
    ),
);
}