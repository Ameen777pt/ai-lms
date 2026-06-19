"use client";

import { useEffect, useState } from "react";

type Props = {
  courseSlug: string;
};

export default function EnrollButton({
  courseSlug,
}: Props) {
  const [isEnrolled, setIsEnrolled] =
    useState(false);

  useEffect(() => {
    const enrolledCourses = JSON.parse(
      localStorage.getItem("enrolledCourses") ||
        "[]"
    );

    setIsEnrolled(
      enrolledCourses.includes(courseSlug)
    );
  }, [courseSlug]);

  const handleEnroll = () => {
    const enrolledCourses = JSON.parse(
      localStorage.getItem("enrolledCourses") ||
        "[]"
    );

    if (
      !enrolledCourses.includes(courseSlug)
    ) {
      enrolledCourses.push(courseSlug);
      const notifications =
  JSON.parse(
    localStorage.getItem(
      "notifications"
    ) || "[]"
  );

notifications.unshift(
  `Enrolled in ${courseSlug}`
);
if (enrolledCourses.length === 1) {
  notifications.unshift(
    "🏅 Achievement Unlocked: First Enrollment"
  );
}

localStorage.setItem(
  "notifications",
  JSON.stringify(notifications)
);

      localStorage.setItem(
        "enrolledCourses",
        JSON.stringify(enrolledCourses)
      );

      setIsEnrolled(true);
    }
  };
  const handleUnenroll = () => {
  const enrolledCourses = JSON.parse(
    localStorage.getItem("enrolledCourses") ||
      "[]"
  );

  const updatedCourses =
    enrolledCourses.filter(
      (slug: string) =>
        slug !== courseSlug
    );

  localStorage.setItem(
    "enrolledCourses",
    JSON.stringify(updatedCourses)
  );

  setIsEnrolled(false);
};

  return (
    <button
  onClick={
    isEnrolled
      ? handleUnenroll
      : handleEnroll
  }
  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
>
  {isEnrolled
    ? "Unenroll Course"
    : "Enroll Course"}
</button>
  );
}