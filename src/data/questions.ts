export type Question = {
  id: number;
  text: string;
  options: string[];
};

export const questions: Question[] = [
  {
    id: 1,
    text: "When you begin watching the breath, what usually happens within a few seconds?",
    options: [
      "My mind immediately runs away into thoughts",
      "I can stay briefly, then I lose it",
      "I stay, but keep drifting off and coming back",
      "I can stay with it most of the time",
      "I stay with it effortlessly without losing it"
    ]
  },
  {
    id: 2,
    text: "How quickly do you notice distraction?",
    options: [
      "Long after I’m lost",
      "After some time",
      "Fairly quickly",
      "Almost immediately",
      "Rarely distracted"
    ]
  },
  {
    id: 3,
    text: "What usually pulls your attention away from the breath?",
    options: [
      "My mind runs into thoughts constantly",
      "I keep losing the breath again and again",
      "I drift subtly without realizing at first",
      "My mind becomes dull or slightly sleepy",
      "Nothing really pulls it away — it stays stable"
    ]
  },
  {
    id: 4,
    text: "What does your effort feel like while staying with the breath?",
    options: [
      "I’m forcing myself to stay and it feels strained",
      "I’m trying to hold attention and keep it from slipping",
      "There is some effort, but it feels balanced",
      "Very little effort — it mostly stays on its own",
      "No effort at all — attention rests naturally"
    ]
  },
  {
    id: 5,
    text: "When you stay with the breath, how does the continuity actually feel?",
    options: [
      "It keeps breaking almost immediately",
      "It stays for a moment, then breaks again",
      "It comes and goes in a repeating loop",
      "It stays mostly continuous with minor slips",
      "It feels unbroken and steady throughout"
    ]
  }
];