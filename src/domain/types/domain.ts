export interface Stage {
  id: string;
  title: string;
  description: string;
  order: number;
  modules: string[];
}

export interface Module {
  id: number;
  title: string;
  description: string;
  stageId?: string;
  estimatedMinutes?: number;

  // Legacy contemplative learning structure
  what?: string;
  how?: string[];
  feel?: string;
  mistake?: string;
  instruction?: string;
  imbalance?: string;
  level?: string;
  symbolicLine?: string;
}

export interface AssessmentQuestion {
  id: number;
  text: string;
  category: string;
  options?: string[];
}

export interface Assessment {
  id: string;
  title: string;
  questions: AssessmentQuestion[];
}

export interface PracticeSession {
  id: string;
  moduleId: string;
  startedAt: string;
  completedAt?: string;
  durationMinutes?: number;
  reflection?: string;
mood?: "restless" | "steady" | "dull" | "clear";

  // Transitional compatibility
  completed?: boolean;
}

export interface ProgressProfile {
  currentStageId: string;
  completedModules: string[];
}