import ContemplativeText from "./ContemplativeText";

interface PracticeContinuityCardProps {
  currentStreak: number;
}

export function PracticeContinuityCard({
  currentStreak,
}: PracticeContinuityCardProps) {
  const continuityLabel =
    currentStreak >= 14
      ? "Settling More Deeply"
      : currentStreak >= 7
        ? "Finding a Gentle Rhythm"
        : currentStreak >= 3
          ? "Returning More Often"
          : "Just Beginning";

  const continuityReflection =
    currentStreak >= 14
      ? "The mind is beginning to settle into a quieter continuity of practice."
      : currentStreak >= 7
        ? "A quieter rhythm is slowly beginning to emerge through repetition."
        : currentStreak >= 3
          ? "The practice is beginning to find its own natural rhythm."
          : "Every practice begins simply by returning again.";

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            paddingBottom: "14px",
            borderBottom:
              "1px solid rgba(255,255,255,0.03)",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "1rem",
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              {continuityLabel}
            </div>
          </div>

          <div
            style={{
              textAlign: "right",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                color: "rgba(231,215,162,0.72)",
                lineHeight: 1,
                fontWeight: 400,
              }}
            >
              {currentStreak}
            </div>

            <div
              style={{
                fontSize: "0.72rem",
                opacity: 0.34,
                marginTop: "4px",
                letterSpacing: "0.03em",
                textTransform: "lowercase",
              }}
            >
              days
            </div>
          </div>
        </div>

        <ContemplativeText
          style={{
            lineHeight: 1.9,
            opacity: 0.82,
            fontSize: "0.94rem",
          }}
        >
          {continuityReflection}
        </ContemplativeText>
      </div>
    </div>
  );
}
