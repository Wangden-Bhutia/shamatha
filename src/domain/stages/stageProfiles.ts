export type StageProfile = {
  stage: number;
  title: string;
  dominantChallenge: string;
  trainingGoal: string;
  guidanceTone: string;
  meditationObject: string;
  encouragement: string;
};

export const stageProfiles: Record<number, StageProfile> = {
  1: {
    stage: 1,
    title: "Directed Attention",
    dominantChallenge:
      "Attention struggles to remain intentionally on the meditation object.",
    trainingGoal:
      "Gently return attention to the breath again and again.",
    guidanceTone:
      "Gentle, grounding, reassuring.",
    meditationObject:
      "Natural breath at the nostrils.",
    encouragement:
      "Beginning again gently is already the practice.",
  },

  2: {
    stage: 2,
    title: "Continuous Attention",
    dominantChallenge:
      "The meditation object is repeatedly forgotten entirely.",
    trainingGoal:
      "Notice wandering softly and return without pressure.",
    guidanceTone:
      "Patient, soft, non-judging.",
    meditationObject:
      "Natural breath at the nostrils.",
    encouragement:
      "Remembering to return is itself progress.",
  },

  3: {
    stage: 3,
    title: "Resurgent Attention",
    dominantChallenge:
      "Distraction is noticed more quickly, but attention still drifts frequently.",
    trainingGoal:
      "Stay with the breath a little longer each time.",
    guidanceTone:
      "Steady, encouraging, calm.",
    meditationObject:
      "Natural breath with relaxed continuity.",
    encouragement:
      "Short moments of continuity gradually become stability.",
  },

  4: {
    stage: 4,
    title: "Close Attention",
    dominantChallenge:
      "Gross distraction weakens, but subtle instability and dullness remain.",
    trainingGoal:
      "Let attention become calmer, clearer, and more continuous.",
    guidanceTone:
      "Balanced, quiet, calm.",
    meditationObject:
      "Breath with sustained attentional continuity.",
    encouragement:
      "Stability deepens through relaxed consistency, not force.",
  },

  5: {
    stage: 5,
    title: "Taming",
    dominantChallenge:
      "Subtle dullness begins to replace gross distraction.",
    trainingGoal:
      "Allow clarity to brighten without forcing the mind.",
    guidanceTone:
      "Clear, light, gently energizing.",
    meditationObject:
      "Vivid breath awareness.",
    encouragement:
      "Clarity grows through balance, not strain.",
  },

  6: {
    stage: 6,
    title: "Pacifying",
    dominantChallenge:
      "Subtle agitation and low-grade distraction continue beneath stability.",
    trainingGoal:
      "Notice subtle movement gently and return to stillness.",
    guidanceTone:
      "Spacious, composed, quiet.",
    meditationObject:
      "Stable breath awareness with peripheral calm.",
    encouragement:
      "The mind is learning stillness at deeper levels.",
  },

  7: {
    stage: 7,
    title: "Fully Pacifying",
    dominantChallenge:
      "Very subtle dullness and excitation still occasionally arise.",
    trainingGoal:
      "Remain balanced without unnecessary effort.",
    guidanceTone:
      "Light, spacious, effortless.",
    meditationObject:
      "Effortlessly sustained breath awareness.",
    encouragement:
      "The practice now matures through subtle refinement.",
  },

  8: {
    stage: 8,
    title: "Single-Pointing",
    dominantChallenge:
      "Effort remains faintly present within otherwise stable concentration.",
    trainingGoal:
      "Let concentration settle naturally on its own.",
    guidanceTone:
      "Quiet, spacious, deeply settled.",
    meditationObject:
      "Unified and stable attention.",
    encouragement:
      "The mind now rests with increasing naturalness.",
  },

  9: {
    stage: 9,
    title: "Balanced Placement",
    dominantChallenge:
      "Maintaining effortless equipoise over extended duration.",
    trainingGoal:
      "Rest naturally in quiet and effortless awareness.",
    guidanceTone:
      "Open, quiet, effortless.",
    meditationObject:
      "Effortless unified awareness.",
    encouragement:
      "Attention now rests in deep balance and ease.",
  },
};

export function getStageProfile(stage: number): StageProfile {
  return stageProfiles[stage] ?? stageProfiles[1];
}