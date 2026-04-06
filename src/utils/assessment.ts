


export function calculateStage(answers: number[]): number {
  if (answers.length === 0) return 1;

  const sum = answers.reduce((acc, val) => acc + val, 0);
  const avg = sum / answers.length;

  if (avg < 1.8) return 1;
  if (avg < 2.5) return 2;
  if (avg < 3.2) return 3;
  if (avg < 3.8) return 4;
  if (avg < 4.2) return 5;
  if (avg < 4.6) return 6;
  if (avg < 4.8) return 7;
  if (avg < 5) return 8;

  return 9;
}