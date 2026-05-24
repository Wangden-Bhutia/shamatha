import { contemplativeTheme } from "../theme/contemplativeTheme";
import { VerticalStack } from "./VerticalStack";

export type PracticeHistoryEntry = {
  date: string;
  durationMinutes: number;
  practiceType: string;
  reflection?: string;
  mood?: "restless" | "steady" | "dull" | "clear";
};

type PracticeHistoryTimelineProps = {
  sessions: PracticeHistoryEntry[];
};

function formatSessionDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Unknown session";
  }

  return parsedDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatMoodLabel(
  mood:
    | "restless"
    | "steady"
    | "dull"
    | "clear",
) {
  switch (mood) {
    case "clear":
      return "Clear";
    case "steady":
      return "Steady";
    case "restless":
      return "Restless";
    case "dull":
      return "Dull";
    default:
      return "Observed";
  }
}

function getLatestSessions(
  sessions: PracticeHistoryEntry[],
) {
  return [...sessions]
    .sort(
      (first, second) =>
        new Date(second.date).getTime() -
        new Date(first.date).getTime(),
    )
    .slice(0, 6);
}

export function PracticeHistoryTimeline({
  sessions,
}: PracticeHistoryTimelineProps) {
  const safeSessions = sessions.filter(
    (session) =>
      typeof session.date === "string" &&
      typeof session.durationMinutes === "number" &&
      typeof session.practiceType === "string" &&
      (session.reflection === undefined ||
        typeof session.reflection === "string")
  );
  const recentSessions =
    getLatestSessions(safeSessions);

  return (
    <VerticalStack gap={contemplativeTheme.spacing.lg}>
        {safeSessions.length === 0 ? (
          <div
  style={{
    padding: contemplativeTheme.spacing.xl,
    borderRadius:
      contemplativeTheme.radius.xl,
    background:
      "linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(255,255,255,0.012))",
    border:
      "1px solid rgba(255,255,255,0.05)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap:
      contemplativeTheme.spacing.md,
  }}
>
  <div
    style={{
      fontSize: "2rem",
      opacity: 0.42,
    }}
  >
    ◌
  </div>

  <div
    style={{
      color:
        contemplativeTheme.colors
          .textPrimary,
      fontSize:
        contemplativeTheme.typography.bodyMedium.fontSize,
      letterSpacing: "0.02em",
    }}
  >
    Your contemplative continuity will
    gradually emerge here.
  </div>

  <div
    style={{
      color:
        contemplativeTheme.colors
          .textSecondary,
      lineHeight: 1.8,
      opacity: 0.72,
      maxWidth: "520px",
      fontSize:
        contemplativeTheme.typography.bodySmall.fontSize,
    }}
  >
    Each completed session contributes to
    a calmer long-term rhythm of practice —
    gently forming a record of continuity,
    reflection, and attentional development.
  </div>
</div>
        ) : (
          <VerticalStack gap="0">
            {recentSessions.map((session, index) => (
              <div
                key={`${session.date}-${index}`}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "14px",
                  padding:
                    index === 0
                      ? "0 0 18px"
                      : "18px 0",
                  borderBottom:
                    index === recentSessions.length - 1
                      ? "none"
                      : "1px solid rgba(255,255,255,0.03)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      color:
                        contemplativeTheme.colors.textPrimary,
                      fontSize:
                        contemplativeTheme.typography.bodyMedium.fontSize,
                      fontWeight: 400,
                      lineHeight: 1.6,
                      opacity: 0.92,
                    }}
                  >
                    {session.practiceType}
                  </div>

                  <div
                    style={{
                      color:
                        contemplativeTheme.colors.textSecondary,
                      fontSize: "0.84rem",
                      opacity: 0.68,
                      lineHeight: 1.7,
                    }}
                  >
                    {Math.max(
                      1,
                      Math.floor(session.durationMinutes)
                    )} minutes
                    {session.mood
                      ? ` · ${formatMoodLabel(session.mood).toLowerCase()}`
                      : ""}
                    {` · ${formatSessionDate(session.date)}`}
                  </div>

                  {session.reflection && (
                    <div
                      style={{
                        marginTop: "2px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        opacity: 0.42,
                        fontSize: "0.84rem",
                        lineHeight: 1.6,
                        color:
                          contemplativeTheme.colors
                            .textMuted,
                      }}
                    >
                      <span>
                        A reflection was kept.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </VerticalStack>
        )}
      </VerticalStack>
  );
}
