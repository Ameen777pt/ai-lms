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
  async function checkEnrollment() {
    const email = localStorage.getItem("userEmail");

    if (!email) return;

    const response = await fetch(
      `/api/enrollments?email=${encodeURIComponent(email)}`
    );

    if (!response.ok) return;

    const enrollments = await response.json();

    setIsEnrolled(
      enrollments.some(
        (enrollment: {
          courseSlug: string;
        }) => enrollment.courseSlug === courseSlug
      )
    );
  }

  checkEnrollment();
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