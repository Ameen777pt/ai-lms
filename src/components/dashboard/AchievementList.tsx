type AchievementListProps = {
  achievements: string[];
};

export default function AchievementList({
  achievements,
}: AchievementListProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mt-8">
        Achievements
      </h2>

      {achievements.length === 0 && (
        <p className="mt-2">
          No achievements unlocked yet.
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {achievements.map((achievement) => (
          <div
            key={achievement}
            className="border rounded-lg p-4"
          >
            {achievement}
          </div>
        ))}
      </div>
    </>
  );
}