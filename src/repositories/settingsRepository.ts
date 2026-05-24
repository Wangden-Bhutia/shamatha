

import {
  defaultMeditationSettings,
  type MeditationSettings,
} from "../domain/types/settings";

const SETTINGS_STORAGE_KEY = "shamatha-settings";

export function loadSettings(): MeditationSettings {
  const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);

  if (!raw) {
    return defaultMeditationSettings;
  }

  try {
    return {
      ...defaultMeditationSettings,
      ...(JSON.parse(raw) as MeditationSettings),
    };
  } catch {
    return defaultMeditationSettings;
  }
}

export function saveSettings(
  settings: MeditationSettings,
): void {
  localStorage.setItem(
    SETTINGS_STORAGE_KEY,
    JSON.stringify(settings),
  );
}