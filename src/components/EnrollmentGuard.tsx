"use client";

import { useEffect, useState } from "react";

export default function EnrollmentGuard({
  courseSlug,
  children,
}: {
  courseSlug: string;
  children: React.ReactNode;
}) {
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

  if (!isEnrolled) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">
          Access Denied
        </h1>

        <p className="mt-4">
          You must enroll in this course first.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}