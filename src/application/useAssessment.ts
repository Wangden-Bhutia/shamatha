import { calculateAssessmentResult } from "../domain/services/assessmentService";

export function useAssessment(answers: number[]) {
  const result = calculateAssessmentResult(answers);

  return {
    result,
    level: result.level,
    recommendation: result.recommendation,
    score: result.score,
  };
}
