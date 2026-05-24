
import ContemplativeText from "./ContemplativeText";

interface PracticeMilestoneCardProps {
  currentMilestone: string;
  currentStreak: number;
}

export function PracticeMilestoneCard({
  currentMilestone,
  currentStreak,
}: PracticeMilestoneCardProps) {
  const milestoneReflection =
    currentStreak >= 30
      ? "Sustained practice is gradually deepening."
      : currentStreak >= 14
        ? "The practice is settling deeper into quiet continuity."
        : currentStreak >= 7
          ? "Gentle consistency is beginning to gather quiet depth."
          : "Practice finds its way through gentle, quiet returning.";

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <div
          style={{
            paddingTop: "18px",
            borderTop:
              "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              fontSize: "1.15rem",
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.5,
            }}
          >
            {currentMilestone}
          </div>
        </div>

        <ContemplativeText>
          {milestoneReflection}
        </ContemplativeText>
      </div>
    </div>
  );
}
