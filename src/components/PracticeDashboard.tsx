import { usePracticeSession } from "../application/usePracticeSession";
import { GlassCard } from "./GlassCard";
import { SectionHeading } from "./SectionHeading";
import { MetricCard } from "./MetricCard";
import { MetricGrid } from "./MetricGrid";
import { InsightListItem } from "./InsightListItem";
import { EmptyState } from "./EmptyState";
import { PageSection } from "./PageSection";
import { VerticalStack } from "./VerticalStack";

export function PracticeDashboard() {
  const {
    sessions,
    analytics,
  } = usePracticeSession();

  if (sessions.length === 0) {
    return (
      <EmptyState
        icon="🪷"
        title="No Practice Sessions Yet"
        description="Complete meditation sessions to build contemplative analytics and progression history."
      />
    );
  }

  return (
    <GlassCard
      padding="16px"
      style={{
        marginBottom: "20px",
      }}
    >
      <PageSection gap={18}>
        <SectionHeading
          eyebrow="Practice Analytics"
          title="Meditation Dashboard"
          subtitle={analytics.summary}
          style={{ marginBottom: 0 }}
        />

        <MetricGrid>
          <MetricCard
            label="Total Minutes"
            value={analytics.totalMinutes}
          />

          <MetricCard
            label="Completed Sessions"
            value={analytics.completedSessions}
          />

          <MetricCard
            label="Current Streak"
            value={`${analytics.currentStreak} days`}
          />
        </MetricGrid>

        <div>
          <SectionHeading
            eyebrow="Recent Practice"
            title="Latest Sessions"
            style={{ marginBottom: "12px" }}
          />

          <VerticalStack gap={10}>
            {sessions
              .slice(-5)
              .reverse()
              .map((session) => (
                <InsightListItem
                  key={session.id}
                  title={session.moduleId}
                  description={`${session.durationMinutes ?? 0} minutes completed`}
                />
              ))}
          </VerticalStack>
        </div>
      </PageSection>
    </GlassCard>
  );
}