export interface AssessmentResult {
  score: number;
  level: "beginner" | "intermediate" | "advanced";
  recommendation: string;
}

export function calculateAssessmentResult(
  answers: number[],
): AssessmentResult {
  const score = answers.reduce((sum, value) => sum + value, 0);

  if (score <= 8) {
    return {
      score,
      level: "beginner",
      recommendation:
        "Strengthen stability of attention and consistency of practice.",
    };
  }

  if (score <= 15) {
    return {
      score,
      level: "intermediate",
      recommendation:
        "Develop continuity of attention and reduce subtle distraction.",
    };
  }

  return {
    score,
    level: "advanced",
    recommendation:
      "Deepen unification of attention and refine peripheral awareness.",
  };
}

export function buildExplanation(
  answers: number[],
): string[] {
  const notes: string[] = [];

  if (answers[0] <= 1) {
    notes.push(
      "Attention is still unstable and frequently pulled away from the object.",
    );
  }

  if (answers[1] >= 2) {
    notes.push(
      "Awareness of distraction is beginning to strengthen.",
    );
  }

  if (answers[3] >= 2) {
    notes.push(
      "Effort is becoming more balanced and less forceful.",
    );
  }

  if (notes.length === 0) {
    notes.push(
      "Your attention appears to be developing continuity and stability.",
    );
  }

  return notes;
}

export function buildAction(
  level: "beginner" | "intermediate" | "advanced",
): string {
  switch (level) {
    case "beginner":
      return "Prioritize short, consistent sessions and rapid recognition of distraction.";

    case "intermediate":
      return "Work on extending continuity of attention without increasing tension.";

    case "advanced":
      return "Refine subtle dullness and deepen stable peripheral awareness.";
  }
}
