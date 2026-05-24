import { useMeditationInsights } from "../application/useMeditationInsights";
import { GlassCard } from "./GlassCard";
import { SectionHeading } from "./SectionHeading";
import { MetricCard } from "./MetricCard";
import { MetricGrid } from "./MetricGrid";
import { EmptyState } from "./EmptyState";

export function MeditationInsightsPanel() {
  const {
    insights,
  } = useMeditationInsights();

  if (insights.totalSessions === 0) {
    return (
      <EmptyState
        icon="🧘"
        title="No Meditation Data Yet"
        description="Complete a few meditation sessions to unlock practice analytics and contemplative insights."
      />
    );
  }

  return (
    <GlassCard
      style={{
        marginBottom: "20px",
      }}
    >
      <SectionHeading
        eyebrow="Meditation Insights"
        title="Practice Analytics"
        style={{
          marginBottom: "12px",
        }}
      />

      <p
        style={{
          color: "rgba(255,255,255,0.78)",
          lineHeight: 1.7,
          marginBottom: "20px",
        }}
      >
        {insights.insightSummary}
      </p>

      <MetricGrid minItemWidth={160}>
        <MetricCard
          label="Total Sessions"
          value={insights.totalSessions}
        />

        <MetricCard
          label="Total Minutes"
          value={insights.totalMinutes}
        />

        <MetricCard
          label="Avg Session"
          value={`${insights.averageSessionMinutes}m`}
        />

        <MetricCard
          label="Longest Session"
          value={`${insights.longestSessionMinutes}m`}
        />

        <MetricCard
          label="Consistency"
          value={`${insights.weeklyConsistencyScore}%`}
        />

        <MetricCard
          label="Preferred Time"
          value={insights.preferredPracticeTime}
        />
      </MetricGrid>
    </GlassCard>
  );
}