

export type GuidancePhaseType =
  | "intro"
  | "breathing"
  | "focus"
  | "body-scan"
  | "open-awareness"
  | "closing";

export type GuidancePhase = {
  id: string;
  title: string;
  type: GuidancePhaseType;
  durationMinutes: number;
  instruction: string;
};

export type GuidedMeditation = {
  id: string;
  title: string;
  description: string;
  totalDurationMinutes: number;
  phases: GuidancePhase[];
};

export type GuidancePlaybackState = {
  meditationId: string;
  currentPhaseIndex: number;
  isPlaying: boolean;
  startedAt?: string;
  completedAt?: string;
};