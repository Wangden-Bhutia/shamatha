

import { useMeditationSettings } from "../application/useMeditationSettings";
import { GlassCard } from "./GlassCard";
import { ContemplativeButton } from "./ContemplativeButton";
import { ContemplativeInput } from "./ContemplativeInput";

export function MeditationSettingsPanel() {
  const {
    settings,
    updateSettings,
  } = useMeditationSettings();

  return (
    <GlassCard
      style={{
        marginBottom: "20px",
        padding: "16px",
      }}
    >
      <h3 style={{ marginTop: 0 }}>
        Meditation Settings
      </h3>

      <div style={{ marginBottom: "16px" }}>
        <ContemplativeInput
          label="Session Duration (minutes)"
          type="number"
          min={1}
          max={180}
          value={settings.sessionDurationMinutes}
          onChange={(event) =>
            updateSettings({
              sessionDurationMinutes: Number(event.target.value),
            })
          }
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.82)",
          }}
        >
          Interval Bell
        </span>

        <ContemplativeButton
          variant={
            settings.intervalBellEnabled
              ? "primary"
              : "ghost"
          }
          onClick={() =>
            updateSettings({
              intervalBellEnabled:
                !settings.intervalBellEnabled,
            })
          }
        >
          {settings.intervalBellEnabled
            ? "Enabled"
            : "Disabled"}
        </ContemplativeButton>
      </div>
    </GlassCard>
  );
}