import Link from "next/link";
import { courses } from "@/data/courses";

type MyCoursesProps = {
  enrolledCourses: string[];
  completedLessonIds: string[];
};

export default function MyCourses({
  enrolledCourses,
  completedLessonIds,
}: MyCoursesProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mt-8">
        Your Courses
      </h2>

      {enrolledCourses.length === 0 && (
        <div className="border rounded-lg p-6 mt-4">
          <p className="font-semibold">
            No enrolled courses yet.
          </p>

          <p className="mt-2">
            Enroll in a course to begin learning.
          </p>
        </div>
      )}

      {courses
        .filter((course) =>
          enrolledCourses.includes(course.slug)
        )
        .map((course) => {
          const completed = course.lessons.filter(
            (lesson) =>
              completedLessonIds.includes(
                `${course.slug}/${lesson.slug}`
              )
          ).length;

          const total = course.lessons.length;

          const progress = Math.round(
            (completed / total) * 100
          );

          return (
            <Link
              href={`/courses/${course.slug}`}
              key={course.slug}
            >
              <div className="border rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-lg">
                  {course.title}
                </h3>

                <p className="mt-2">
                  Progress: {progress}%
                </p>

                <div className="w-full bg-gray-400 h-4 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-blue-500 h-full"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <p>
                  Completed Lessons: {completed}/{total}
                </p>
              </div>
            </Link>
          );
        })}
    </>
  );
}