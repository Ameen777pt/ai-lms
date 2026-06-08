type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
};

export default function FeatureCard({
  title,
  description,
  icon,
}: FeatureCardProps) {
  return (
    <div className="border p-6 rounded-lg">

      <div className="text-4xl mb-3">
        {icon}
      </div>

      <h3 className="font-bold mb-2">
        {title}
      </h3>

      <p>{description}</p>
    </div>
  );
}