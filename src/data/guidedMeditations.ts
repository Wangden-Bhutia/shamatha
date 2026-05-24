

import type {
  GuidedMeditation,
} from "../domain/types/guidance";

export const guidedMeditations: GuidedMeditation[] = [
  {
    id: "foundational-shamatha",
    title: "Foundational Shamatha",
    description:
      "A structured foundational concentration practice using breath awareness and calm stabilization.",
    totalDurationMinutes: 15,
    phases: [
      {
        id: "intro",
        title: "Settling",
        type: "intro",
        durationMinutes: 2,
        instruction:
          "Sit comfortably. Allow the body to settle naturally. Let attention soften into the present moment.",
      },
      {
        id: "breath-awareness",
        title: "Breath Awareness",
        type: "breathing",
        durationMinutes: 5,
        instruction:
          "Rest attention gently on the breath. When distracted, calmly return to breathing.",
      },
      {
        id: "single-point-focus",
        title: "Single-Pointed Focus",
        type: "focus",
        durationMinutes: 6,
        instruction:
          "Sustain attention steadily on the meditation object without strain.",
      },
      {
        id: "closing",
        title: "Closing Awareness",
        type: "closing",
        durationMinutes: 2,
        instruction:
          "Expand awareness gently to the surroundings before ending the session.",
      },
    ],
  },
  {
    id: "body-awareness-reset",
    title: "Body Awareness Reset",
    description:
      "A grounding meditation focused on embodied awareness and tension release.",
    totalDurationMinutes: 12,
    phases: [
      {
        id: "body-scan-intro",
        title: "Arrival",
        type: "intro",
        durationMinutes: 2,
        instruction:
          "Take a stable posture and allow breathing to slow naturally.",
      },
      {
        id: "body-scan",
        title: "Body Scan",
        type: "body-scan",
        durationMinutes: 7,
        instruction:
          "Move attention slowly through the body and observe sensations without reaction.",
      },
      {
        id: "closing-rest",
        title: "Resting Awareness",
        type: "closing",
        durationMinutes: 3,
        instruction:
          "Rest quietly in open awareness and allow the session to conclude naturally.",
      },
    ],
  },
];