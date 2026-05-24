import { useMeditationRecommendations } from "../application/useMeditationRecommendations";
import { GlassCard } from "./GlassCard";
import { SectionHeading } from "./SectionHeading";
import { MetricCard } from "./MetricCard";
import { MetricGrid } from "./MetricGrid";
import { InsightListItem } from "./InsightListItem";
import { VerticalStack } from "./VerticalStack";
import { contemplativeTheme } from "../theme/contemplativeTheme";

const FALLBACK_RECOMMENDATION = {
  recommendedPracticeType: "Breath Awareness",
  recommendedDurationMinutes: 10,
  rationale:
    "A gentle return to simple breath awareness helps re-establish continuity, stability, and contemplative grounding.",
};

export function MeditationRecommendationPanel() {
  const {
    recommendation,
  } = useMeditationRecommendations();

  const safeRecommendation = {
    recommendedPracticeType:
      recommendation?.recommendedPracticeType ||
      FALLBACK_RECOMMENDATION.recommendedPracticeType,

    recommendedDurationMinutes:
      typeof recommendation?.recommendedDurationMinutes ===
      "number"
        ? recommendation.recommendedDurationMinutes
        : FALLBACK_RECOMMENDATION.recommendedDurationMinutes,

    rationale:
      recommendation?.rationale ||
      FALLBACK_RECOMMENDATION.rationale,
  };

  return (
    <GlassCard
      padding="18px"
      style={{
        marginBottom: "20px",
        opacity: 0.9,
      }}
    >
      <VerticalStack gap={18}>
        <SectionHeading
          eyebrow="Gentle Suggestion"
          title="Suggested Practice Direction"
          style={{
            marginBottom: 0,
          }}
        />
        <div
          style={{
            padding: "14px 16px",
            borderRadius: "14px",
            background:
              "rgba(255,255,255,0.03)",
            border:
              "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.68)",
              lineHeight: 1.75,
              fontSize: "0.95rem",
            }}
          >
            These contemplative recommendations adapt gradually according to your recent rhythm, consistency, attentional stability, and reflective continuity.
          </p>
        </div>

        <MetricGrid>
          <MetricCard
            label="Suggested Duration"
            value={`${safeRecommendation.recommendedDurationMinutes} min`}
          />

          <MetricCard
            label="Suggested Focus"
            value={safeRecommendation.recommendedPracticeType}
          />
        </MetricGrid>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 14px",
            borderRadius: "14px",
            background:
              "rgba(231,215,162,0.05)",
            border:
              "1px solid rgba(231,215,162,0.08)",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "999px",
              background:
              contemplativeTheme.colors.textPrimary,
              flexShrink: 0,
            }}
          />

          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.72)",
              fontSize: "0.92rem",
              lineHeight: 1.6,
            }}
          >
            Recommendation intensity softens automatically during periods of inconsistency or contemplative fatigue.
          </p>
        </div>

        <InsightListItem
          title="Why This May Help"
          description={safeRecommendation.rationale}
          style={{
            background:
              "rgba(255,255,255,0.025)",
            borderRadius: "14px",
            padding: "14px",
          }}
        />
      </VerticalStack>
    </GlassCard>
  );
}
