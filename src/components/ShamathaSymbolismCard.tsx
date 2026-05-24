import { GlassCard } from "./GlassCard";
import { SectionHeading } from "./SectionHeading";
import { InsightListItem } from "./InsightListItem";
import { VerticalStack } from "./VerticalStack";


const SYMBOLISM_STAGES = [
  {
    title: "Wild Elephant",
    meaning:
      "Represents the untamed mind distracted by agitation and mental wandering.",
    color: "#9A9A9A",
  },
  {
    title: "Monkey",
    meaning:
      "Symbolizes distraction, impulsivity, and restless attention.",
    color: "#C48A3A",
  },
  {
    title: "Rabbit",
    meaning:
      "Represents subtle dullness and fading clarity during concentration.",
    color: "#B8B0A3",
  },
  {
    title: "Dark to White Elephant",
    meaning:
      "The gradual whitening symbolizes increasing stabilization and purification of attention.",
    color: "#E8E3D8",
  },
  {
    title: "Flame",
    meaning:
      "Represents effort and disciplined mindfulness gradually becoming effortless.",
    color: "#E7A64B",
  },
  {
    title: "Flying Monk",
    meaning:
      "Represents joy, pliancy, and mastery emerging from stabilized attention.",
    color: "#A8D6FF",
  },
];

export function ShamathaSymbolismCard() {
  return (
    <GlassCard
      padding="18px"
      style={{
        marginBottom: "20px",
      }}
    >
      <SectionHeading
        eyebrow="Symbolic Progression"
        title="The Symbolism of Shamatha Training"
        style={{
          marginBottom: "16px",
        }}
      />

      <VerticalStack>
        {SYMBOLISM_STAGES.map((item) => (
          <InsightListItem
            key={item.title}
            title={item.title}
            description={item.meaning}
            icon={
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "999px",
                  background: item.color,
                  marginTop: "4px",
                }}
              />
            }
          />
        ))}
      </VerticalStack>
    </GlassCard>
  );
}