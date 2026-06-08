const features = [
  {
    title: "Courses",
    description: "Manage and learn from structured courses.",
    icon: "📚",
  },
  {
    title: "Progress Tracking",
    description: "Track lesson completion and learning progress.",
    icon: "📈",
  },
  {
    title: "AI Assistant",
    description: "Ask questions and get instant explanations.",
    icon: "🤖",
  },
  {
    title: "Certificates",
    description: "Earn certificates after course completion.",
    icon: "🏆",
  },
];

import FeatureCard from "@/components/FeatureCard";

export default function FeaturesSection() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-center mb-10">
        Features
      </h2>

      <div className="grid md:grid-cols-4 gap-6 px-10">
       {features.map((feature) => (
  <FeatureCard
    key={feature.title}
    title={feature.title}
    description={feature.description}
    icon={feature.icon}
  />
))}
      </div>
    </section>
  );
}