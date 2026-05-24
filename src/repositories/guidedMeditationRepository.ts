

import type {
  GuidancePlaybackState,
} from "../domain/types/guidance";

const STORAGE_KEY = "guided-meditation-playback";

export function saveGuidedMeditationState(
  state: GuidancePlaybackState,
): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state),
  );
}

export function loadGuidedMeditationState(): GuidancePlaybackState | null {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as GuidancePlaybackState;
  } catch {
    return null;
  }
}

export function clearGuidedMeditationState(): void {
  localStorage.removeItem(STORAGE_KEY);
}