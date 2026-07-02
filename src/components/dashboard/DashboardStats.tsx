type DashboardStatsProps = {
  enrolledCourses: number;
  completedCourses: number;
  completedLessons: number;
  pendingLessons: number;
  progressPercentage: number;
};

export default function DashboardStats({
  enrolledCourses,
  completedCourses,
  completedLessons,
  pendingLessons,
  progressPercentage,
}: DashboardStatsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="border rounded-lg p-6 text-center">
          <p className="text-gray-400 text-sm">
            📚 Enrolled
          </p>

          <p className="text-4xl font-bold mt-2">
            {enrolledCourses}
          </p>
        </div>

        <div className="border rounded-lg p-6 text-center">
          <p className="text-gray-400 text-sm">
            ✅ Completed
          </p>

          <p className="text-4xl font-bold mt-2">
            {completedCourses}
          </p>
        </div>

        <div className="border rounded-lg p-6 text-center">
          <p className="text-gray-400 text-sm">
            🎯 Lessons
          </p>

          <p className="text-4xl font-bold mt-2">
            {completedLessons}
          </p>
        </div>

        <div className="border rounded-lg p-6 text-center">
          <p className="text-gray-400 text-sm">
            🔥 Active
          </p>

          <p className="text-4xl font-bold mt-2">
            {enrolledCourses - completedCourses}
          </p>
        </div>

        <div className="border rounded-lg p-6 text-center">
          <p className="text-gray-400 text-sm">
            ⏳ Pending
          </p>

          <p className="text-4xl font-bold mt-2">
            {pendingLessons}
          </p>
        </div>

        <div className="border rounded-lg p-6 text-center">
          <p className="text-gray-400 text-sm">
            📈 Progress
          </p>

          <p className="text-4xl font-bold mt-2">
            {progressPercentage}%
          </p>
        </div>
      </div>

      <div className="w-full bg-gray-300 rounded-full h-4 mt-3">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{
            width: `${progressPercentage}%`,
          }}
        />
      </div>
    </>
  );
}