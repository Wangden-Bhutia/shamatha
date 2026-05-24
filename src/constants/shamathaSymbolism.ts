


export type ShamathaSymbolismCard = {
  title: string;
  emoji: string;
  description: string;
  glow: string;
};

export const symbolismCards: ShamathaSymbolismCard[] = [
  {
    title: "Elephant",
    emoji: "🐘",
    description:
      "The elephant represents the mind itself. At the beginning it is dark, heavy, and resistant, showing dullness and lack of clarity. As training deepens, it becomes lighter, reflecting increasing stability and brightness of awareness.",
    glow:
      "radial-gradient(circle at top, rgba(120,120,160,0.22), transparent 72%)",
  },
  {
    title: "Monkey",
    emoji: "🐒",
    description:
      "The monkey stands for restlessness. It pulls the elephant toward distraction, showing how easily attention is carried away by thoughts and impulses.",
    glow:
      "radial-gradient(circle at top, rgba(210,140,70,0.22), transparent 72%)",
  },
  {
    title: "Rabbit",
    emoji: "🐇",
    description:
      "The rabbit symbolizes subtle dullness — a quiet but obscuring lack of sharpness that remains even after gross distraction fades.",
    glow:
      "radial-gradient(circle at top, rgba(180,180,220,0.18), transparent 72%)",
  },
  {
    title: "Fire",
    emoji: "🔥",
    description:
      "The fire along the path represents effort. Early on it burns intensely, but as familiarity grows the effort becomes calmer and more refined.",
    glow:
      "radial-gradient(circle at top, rgba(255,120,40,0.24), transparent 72%)",
  },
  {
    title: "Monk, Rope, Hook",
    emoji: "🧘",
    description:
      "The monk represents the practitioner. The rope symbolizes mindfulness — holding attention steadily. The hook symbolizes introspective awareness that notices distraction and gently corrects it.",
    glow:
      "radial-gradient(circle at top, rgba(220,200,140,0.18), transparent 72%)",
  },
];

export const summaryCard: ShamathaSymbolismCard = {
  title: "Summary",
  emoji: "✨",
  description:
    "As the path unfolds, restlessness and dullness are gradually overcome. The monkey disappears, the elephant becomes fully clear, and the mind no longer chases but rides in steady lucid attention.",
  glow:
    "radial-gradient(circle at top, rgba(255,255,255,0.14), transparent 72%)",
};