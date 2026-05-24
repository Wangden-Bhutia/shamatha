import { GlassCard } from "./GlassCard";
import { ContemplativeButton } from "./ContemplativeButton";


type MeditationTimerCardProps = {
  formattedTime: string;
  isRunning: boolean;
  onStartPause: () => void;
  onReset: () => void;
};

export function MeditationTimerCard({
  formattedTime,
  isRunning,
  onStartPause,
  onReset,
}: MeditationTimerCardProps) {
  return (
    <GlassCard
      style={{
        marginBottom: "20px",
        padding: "16px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          marginTop: 0,
          marginBottom: "10px",
          color: "#BFA86A",
          fontSize: "14px",
          letterSpacing: "0.08em",
        }}
      >
        MEDITATION TIMER
      </p>

      <div
        style={{
          fontSize: "42px",
          marginBottom: "16px",
          color: "white",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {formattedTime}
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <ContemplativeButton
          variant="primary"
          onClick={onStartPause}
        >
          {isRunning ? "Pause" : "Start"}
        </ContemplativeButton>

        <ContemplativeButton
          onClick={onReset}
        >
          Reset
        </ContemplativeButton>
      </div>
    </GlassCard>
  );
}