import Link from "next/link";
import { courses } from "@/data/courses";

type RecentlyViewedListProps = {
  recentlyViewed: string[];
};

export default function RecentlyViewedList({
  recentlyViewed,
}: RecentlyViewedListProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mt-8">
        Recently Viewed
      </h2>

      {recentlyViewed.length === 0 && (
        <p className="mt-2">
          No recently viewed courses.
        </p>
      )}

      {recentlyViewed.map((slug) => {
        const course = courses.find(
          (course) => course.slug === slug
        );

        if (!course) return null;

        return (
          <Link
            href={`/courses/${course.slug}`}
            key={slug}
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
        );
      })}
    </>
  );
}