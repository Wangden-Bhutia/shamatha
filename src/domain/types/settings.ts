

export type MeditationSettings = {
  sessionDurationMinutes: number;
  ambientSoundEnabled: boolean;
  intervalBellEnabled: boolean;
  intervalBellMinutes: number;
  autoStartNextSession: boolean;
};

export const defaultMeditationSettings: MeditationSettings = {
  sessionDurationMinutes: 10,
  ambientSoundEnabled: false,
  intervalBellEnabled: false,
  intervalBellMinutes: 5,
  autoStartNextSession: false,
};