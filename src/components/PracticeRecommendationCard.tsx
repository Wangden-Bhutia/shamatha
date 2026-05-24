import ContemplativeCard from "./ContemplativeCard";
import ContemplativeText from "./ContemplativeText";

interface PracticeRecommendationCardProps {
  recommendedPracticeType?: string;
  rationale?: string;
  recommendedDurationMinutes?: number;
}

export function PracticeRecommendationCard({
  recommendedPracticeType,
  rationale,
  recommendedDurationMinutes,
}: PracticeRecommendationCardProps) {
  return (
    <ContemplativeCard
      padding="18px"
      style={{
        background:
          "linear-gradient(180deg, rgba(10,16,28,0.46), rgba(6,10,20,0.28))",
        border: "1px solid rgba(255,255,255,0.045)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              opacity: 0.34,
              marginBottom: "6px",
            }}
          >
            Suggested Sitting
          </div>

          <div
            style={{
              fontSize: "0.98rem",
              lineHeight: 1.45,
              color: "rgba(243,239,227,0.9)",
              fontWeight: 400,
            }}
          >
            {recommendedPracticeType ??
              "Balanced Practice"}
          </div>
        </div>

        <ContemplativeText
          style={{
            fontSize: "0.92rem",
            lineHeight: 1.72,
            color: "rgba(243,239,227,0.82)",
          }}
        >
          {rationale
            ?.split(".")
            .filter(Boolean)
            .slice(0, 2)
            .join(". ")}
          .
          <br />
          <br />
          {recommendedDurationMinutes ?? 20} minutes may be enough...
        </ContemplativeText>
      </div>
    </ContemplativeCard>
  );
}
