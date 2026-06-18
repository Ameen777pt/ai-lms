"use client";

import { useEffect } from "react";

export default function RecentlyViewedTracker({
  courseSlug,
}: {
  courseSlug: string;
}) {
  useEffect(() => {
    const viewedCourses =
      JSON.parse(
        localStorage.getItem(
          "recentlyViewed"
        ) || "[]"
      );

    const updatedCourses = [
      courseSlug,
      ...viewedCourses.filter(
        (slug: string) =>
          slug !== courseSlug
      ),
    ].slice(0, 5);

    localStorage.setItem(
      "recentlyViewed",
      JSON.stringify(updatedCourses)
    );
  }, [courseSlug]);

  return null;
}