import Link from "next/link";
import { courses } from "@/data/courses";

type RecommendedCoursesProps = {
  enrolledCourses: string[];
};

export default function RecommendedCourses({
  enrolledCourses,
}: RecommendedCoursesProps) {
  const recommendedCourses = courses
    .filter(
      (course) =>
        !enrolledCourses.includes(course.slug)
    )
    .slice(0, 2);

  return (
    <>
      <h2 className="text-2xl font-bold mt-8">
        Recommended For You
      </h2>

      {recommendedCourses.length === 0 && (
        <p className="mt-2">
          You've enrolled in all courses.
        </p>
      )}

      {recommendedCourses.map((course) => (
        <Link
          key={course.slug}
          href={`/courses/${course.slug}`}
        >
          <div className="border rounded-lg p-4 mt-4">
            <h3 className="font-semibold">
              {course.title}
            </h3>

            <p className="mt-2">
              Instructor: {course.instructor}
            </p>
          </div>
        </Link>
      ))}
    </>
  );
}