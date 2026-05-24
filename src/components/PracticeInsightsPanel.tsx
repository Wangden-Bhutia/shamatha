import { contemplativeTheme } from "../theme/contemplativeTheme";
import { usePracticeInsights } from "../hooks/usePracticeInsights";
import { VerticalStack } from "./VerticalStack";
import ContemplativeText from "./ContemplativeText";

export function PracticeInsightsPanel() {
  const { insights } = usePracticeInsights();

  const contemplativeMilestones = [
    "Practice is beginning to settle.",
    "A rhythm is quietly emerging.",
    "Attention is gradually deepening.",
    "Longer practice finds quiet maturity.",
  ];
  const hasInsights = insights.length > 0;
  const displayedInsights = insights.slice(
    0,
    4,
  );
  return (
    <VerticalStack gap={contemplativeTheme.spacing.lg}>
      <ContemplativeText>
        Progress rarely follows a straight line. What appears 
        here are quiet patterns, not measures of achievement.
      </ContemplativeText>

        <VerticalStack gap={contemplativeTheme.spacing.md}>
          {hasInsights && insights.length < 3 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap:
                  contemplativeTheme.spacing.sm,
              }}
            >
              {contemplativeMilestones.map(
                (milestone, index) => (
                  <div
                    key={`${milestone}-${index}`}
                    style={{
                      padding: "14px 0",
                      borderRadius:
                        contemplativeTheme.radius.lg,
                      borderBottom:
                        "1px solid rgba(255,255,255,0.05)",
                      color:
                        contemplativeTheme.colors
                          .textSecondary,
                      fontSize:
                        contemplativeTheme.typography.bodySmall.fontSize,
                      lineHeight: 1.7,
                      opacity: 0.76,
                    }}
                  >
                    {milestone}
                  </div>
                ),
              )}
            </div>
          )}
          {!hasInsights && (
            <div
              style={{
                padding:
                  contemplativeTheme.spacing.xl,
                borderRadius:
                  contemplativeTheme.radius.xl,
                background:
                  "rgba(255,255,255,0.015)",
                border:
                  "1px solid rgba(255,255,255,0.04)",
                color:
                  contemplativeTheme.colors
                    .textSecondary,
                lineHeight: 1.8,
                opacity: 0.72,
                textAlign: "center",
              }}
            >
              Patterns emerge gradually 
              through continued practice.
            </div>
          )}
          {displayedInsights.map(
            (insight, index) => (
              <div
                key={`${insight.title}-${index}`}
                style={{
                  padding:
                    "18px 0",
                  borderRadius:
                    contemplativeTheme.radius.xl,
                  borderTop:
                    index === 0
                      ? "1px solid rgba(255,255,255,0.05)"
                      : "none",
                  borderBottom:
                    "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  gap:
                    contemplativeTheme.spacing.sm,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "space-between",
                    gap:
                      contemplativeTheme.spacing.sm,
                  }}
                >
                  <div
                    style={{
                      color:
                        contemplativeTheme.colors.goldPrimary,
                      fontSize:
                        contemplativeTheme.typography.bodyMedium.fontSize,
                      fontWeight: 500,
                      letterSpacing: "0.03em",
                      lineHeight: 1.5,
                    }}
                  >
                    {insight.title}
                  </div>
                </div>

                <div
                  style={{
                    color:
                      contemplativeTheme.colors.textSecondary,
                    lineHeight: 1.8,
                    opacity: 0.82,
                    fontSize:
                      contemplativeTheme.typography.bodySmall.fontSize,
                  }}
                >
                  {insight.description}
                </div>
              </div>
            ),
          )}
        </VerticalStack>
      </VerticalStack>
  );
}
