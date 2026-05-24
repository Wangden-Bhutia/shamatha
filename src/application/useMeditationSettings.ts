

import { useEffect, useState } from "react";
import type { MeditationSettings } from "../domain/types/settings";
import {
  loadSettings,
  saveSettings,
} from "../repositories/settingsRepository";

export function useMeditationSettings() {
  const [settings, setSettings] = useState<MeditationSettings>(
    loadSettings(),
  );

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  function updateSettings(
    updates: Partial<MeditationSettings>,
  ) {
    setSettings((previous) => ({
      ...previous,
      ...updates,
    }));
  }

  return {
    settings,
    updateSettings,
  };
}